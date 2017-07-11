//
//  IonicViewController.m
//  cmsv6demo
//
//  Created by Story5 on 27/06/2017.
//  Copyright © 2017 Apple. All rights reserved.
//

#import "IonicViewController.h"
#import "ViewController.h"
#import "JPUSHService.h"

@interface IonicViewController ()<UIImagePickerControllerDelegate,UINavigationControllerDelegate>

@end

@implementation IonicViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.wwwFolderName = @"www";
    self.startPage = @"index.html";

    [self addNotification];
    
    [self setTags:nil alias:@"张迅杰"];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBar.hidden = YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - private methods
- (void)addNotification
{
    [[NSNotificationCenter defaultCenter] addObserverForName:@"openDevice"
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:^(NSNotification *notification) {
                                                      NSDictionary *paramDic = notification.userInfo;
                                                      NSLog(@"Handled 'test.event' [%@]", notification.userInfo[@"param"]);
                                                      NSString *deviceId = [paramDic objectForKey:@"param"];
                                                      [self pushDevice:deviceId];
                                                  }];
    
    [[NSNotificationCenter defaultCenter] addObserverForName:@"takePicture"
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:^(NSNotification *notification) {
                                                      
                                                      NSDictionary *paramDic = notification.userInfo;
                                                      NSLog(@"Handled 'test.event' [%@]", notification.userInfo[@"param"]);
                                                      [self takePicture];
                                                  }];
    
    
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    [picker dismissViewControllerAnimated:true completion:nil];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info
{
    UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
    NSData *data = UIImageJPEGRepresentation(image, 1.0f);
    NSString *encodedImageStr = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    [self postToIonic:encodedImageStr];
    
    
    [picker dismissViewControllerAnimated:true completion:nil];
}

- (void)postToIonic:(NSString *)encodedImageStr {
    NSLog(@"%s",__func__);
    [[NSNotificationCenter defaultCenter] postNotificationName:@"iOSPostToIonic"
                                                        object:nil
                                                      userInfo:@{ @"data":encodedImageStr}];
    NSLog(@"%@",encodedImageStr);
}

- (void)takePicture{
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    picker.sourceType = UIImagePickerControllerSourceTypeCamera;
    picker.delegate = self;
    [self presentViewController:picker animated:true completion:nil];
}

- (void)pushDevice:(NSString *)device
{
    ViewController *vc = [[ViewController alloc] init];
    vc.deviceId = device;
//    vc.deviceId = @"00359";
    [self.navigationController pushViewController:vc animated:true];
}


#pragma mark - JPush
- (void)setTags:(NSSet *)tags alias:(NSString *)alias
{
    if (tags == nil || [tags isEqualToSet:[NSSet set]]) {
        tags = [NSSet setWithObject:@"iOSTags"];
    }
    
    if (alias == nil || [alias isEqualToString:@""]) {
        alias = @"iOSAlias";
    }
    
    [JPUSHService setTags:tags alias:alias fetchCompletionHandle:^(int iResCode, NSSet *iTags, NSString *iAlias) {
        NSLog(@"\niResCode\t:\t%d\niTags\t:\t%@\niAlias\t:\t%@",iResCode,iTags,iAlias);
    }];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
