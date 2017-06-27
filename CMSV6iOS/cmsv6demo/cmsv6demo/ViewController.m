//
//  ViewController.m
//  cmsv6demo
//
//  Created by Apple on 13-10-1.
//  Copyright (c) 2013年 Apple. All rights reserved.
//

#import "ViewController.h"
#include "ttxtype.h"
#include "netmediaapi.h"

//#import "ConfigView.h"
#import "DeviceSwitchView.h"

@interface ViewController ()

@property (nonatomic,strong) UIButton *device1;
@property (nonatomic,strong) UIButton *device2;

//@property (nonatomic,strong) UIView *configView;
@property (nonatomic,strong) DeviceSwitchView *deviceSwitchView;

@end

@implementation ViewController

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    self.title = @"博宇站视频监控";
    
    CGRect rcMain = [[UIScreen mainScreen] bounds];
    
    CGFloat gap = 5;
    CGFloat yOffSet = 20;
    int xPos = rcMain.origin.x + gap;
    videoImg = [[UIImageView alloc] initWithFrame:CGRectMake(xPos, rcMain.origin.y + yOffSet, rcMain.size.width - 2 * gap, 240)];
    [self.view addSubview:videoImg];
    
    int yPos = CGRectGetMaxY(videoImg.frame) + 5;
    videoRate = [[UILabel alloc] initWithFrame:CGRectMake(xPos, yPos, 200, 40)];
    [videoRate setText:@"Loading"];
    [videoRate setTextColor:[UIColor blueColor]];
    [self.view addSubview:videoRate];
    
    CGFloat yOrigin = CGRectGetMaxY(videoRate.frame);
    CGRect frame = CGRectMake(0, yOrigin, self.view.bounds.size.width, self.view.bounds.size.height - yOrigin - 5);
    self.deviceSwitchView = [[DeviceSwitchView alloc] initWithFrame:frame];
    [self.view addSubview:self.deviceSwitchView];
    
//    self.configView = [[ConfigView alloc] initWithFrame:frame];
//    [self.view addSubview:self.configView];
    
    [self configNetMedia];
    
    timerPlay = [NSTimer scheduledTimerWithTimeInterval:0.02
                                                 target:self
                                               selector:@selector(onTimerPlay)
                                               userInfo:nil
                                                repeats:YES ];
    isLoading = YES;
    
    self.device1 = [[UIButton alloc] initWithFrame:CGRectMake(10, 500, 80, 40)];
    [self.device1 setTitle:@"设备1" forState:UIControlStateNormal];
    self.device1.tag = 100;
    [self.device1 addTarget:self action:@selector(buttonClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.device1];
    
    self.device2 = [[UIButton alloc] initWithFrame:CGRectMake(100, 500, 80, 40)];
    [self.device2 setTitle:@"设备2" forState:UIControlStateNormal];
    self.device2.tag = 200;
    [self.device2 addTarget:self action:@selector(buttonClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.device2];
}

- (void)buttonClick:(UIButton *)aSender
{
    NSString *devIdno = nil;
    if (aSender.tag == 100) {
        devIdno = @"10250";
    } else {
        devIdno = @"10275";
    }
    NETMEDIA_StopRealPlay(realHandle);
    // 关闭预览对象
    NETMEDIA_CloseRealPlay(realHandle);
    int channel = 0;
    NETMEDIA_OpenRealPlay([devIdno UTF8String], // 设备编号
                          channel,              // 通道号，0表示通道1
                          1,                    // 0主码流，1子码流
                          0,                    // 连接模式，暂时无效
                          true,
                          &realHandle);
    NETMEDIA_SetUserInfo(realHandle, "byzgcxc", "000000");
    NETMEDIA_StartRealPlay(realHandle, true);
}

- (void) viewDidUnload {
    [super viewDidUnload];
    [timerPlay invalidate];
    NETMEDIA_StopRealPlay(realHandle);
    NETMEDIA_CloseRealPlay(realHandle); realHandle = 0;
}

#pragma mark - private methods
- (void)configNetMedia
{
    // 初始化动态库
    NETMEDIA_Initialize("");
    // 设置服务器地址
    NSString *ip = @"211.162.125.99";
    NETMEDIA_SetDirSvr([ip UTF8String], // 服务器IP
                       [ip UTF8String], // 服务器局域网IP，可以配置成与	svrIP 一样
                       6605,            // 服务器端口，一般为6605
                       false);          // 是否局域网优先，如果为true会判断是否处理客户端与服务器是否处理一个网络下，如果是，则会采用直连的方式，并且优先查看主码流的视频。
    
    //    NETMEDIA_SetDirSvr("52.8.85.226",// 服务器IP
    //                       "52.8.85.226",// 服务器局域网IP，可以配置成与	svrIP 一样
    //                       6605,         // 服务器端口，一般为6605
    //                       false);       // 是否局域网优先，如果为true会判断是否处理客户端与服务器是否处理一个网络下，如果是，则会采用直连的方式，并且优先查看主码流的视频。
    ////
    // 停止视频播放
    NETMEDIA_StopRealPlay(realHandle);
    // 关闭预览对象
    NETMEDIA_CloseRealPlay(realHandle);
    
    int channel = 0;
    //    NSString *devIdno = @"91510970";
        NSString *devIdno = @"10275";
//    NSString *devIdno = @"10250";
    // 打开预览对象
    NETMEDIA_OpenRealPlay([devIdno UTF8String], // 设备编号
                          channel,              // 通道号，0表示通道1
                          1,                    // 0主码流，1子码流
                          0,                    // 连接模式，暂时无效
                          true,
                          &realHandle);
    NETMEDIA_SetUserInfo(realHandle, "byzgcxc", "000000");
    // 开始视频预览
    NETMEDIA_StartRealPlay(realHandle, true);
}

- (void)onTimerPlay
{
    if (realHandle != 0) {
        // 取得播放状态
        if (NETMEDIA_OK == NETMEDIA_GetRPlayStatus(realHandle)) {
            int videoSize[2] = {0, 0};
            // 取得播放的图片信息
            if (NETMEDIA_GetRPlayImage(realHandle, videoRgb565Length, (char*)videoBuffer.bytes, videoSize, TTX_RGB_FORMAT_888) != 0) {
                if (videoSize[0] > 0 && videoSize[1] > 0) {
                    [self initVideoBuf:videoSize[0] height:videoSize[1]];
                }
            } else {
                isLoading = NO;
                videoImg.image = [self showVideoImage:videoWidth height:videoHeight];
            }
            
            
            int realRate = 0;
            // 获取下载的速度
            NETMEDIA_GetFlowRate(realHandle, &realRate);
            if (isLoading) {
                [videoRate setText:[NSString stringWithFormat:@"Loading %d KB/S", realRate]];
            } else {
                [videoRate setText:[NSString stringWithFormat:@"%d KB/S", realRate]];
            }
        } else {
            NSLog(@"NETMEDIA_FALSE");
        }
    }
}

- (void)initVideoBuf:(int )nWidth height:(int)nHeight
{
    videoWidth = nWidth;
    videoHeight = nHeight;
    videoRgb565Length = videoWidth * videoHeight * 3;
    videoBuffer = [[NSMutableData alloc] initWithCapacity:videoRgb565Length];
}

- (UIImage *)showVideoImage:(int)width height:(int)height
{
    UIImage *image = nil;
    @try
    {
        CGBitmapInfo bitmapInfo = kCGBitmapByteOrderDefault;
        CFDataRef data = CFDataCreateWithBytesNoCopy(kCFAllocatorDefault, videoBuffer.bytes, width*3*height, kCFAllocatorNull);
        CGDataProviderRef provider = CGDataProviderCreateWithCFData(data);
        CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
        CGImageRef cgImage = CGImageCreate(width,
                                           height,
                                           8,
                                           24,
                                           width*3,
                                           colorSpace,
                                           bitmapInfo,
                                           provider,
                                           NULL,
                                           NO,
                                           kCGRenderingIntentDefault);
        CGColorSpaceRelease(colorSpace);
        image = [UIImage imageWithCGImage:cgImage] ;
        
        CGImageRelease(cgImage);
        CGDataProviderRelease(provider);
        CFRelease(data);
    }
    @catch (NSException *exception)
    {
        image = nil;
    }
    @catch (...)
    {
        image = nil;
    }
    @finally
    {
    }
    
	return image;
}

@end
