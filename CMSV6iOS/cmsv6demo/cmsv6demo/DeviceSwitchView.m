//
//  DeviceSwitchView.m
//  cmsv6demo
//
//  Created by Story5 on 2017/5/25.
//  Copyright © 2017年 Apple. All rights reserved.
//

#import "DeviceSwitchView.h"

#define BASE_TAG 100

@interface DeviceSwitchView ()

@property (nonatomic,retain) NSMutableArray *devicesNumbers;
@property (nonatomic,retain) NSMutableArray *devicesNames;

@end

@implementation DeviceSwitchView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor lightGrayColor];
        [self createUI];
    }
    return self;
}

#pragma mark - button click
- (void)deviceButtonClicked:(UIButton *)aSender
{
    
}

#pragma mark - private methods
- (void)createUI
{
    if ([self.dataSource respondsToSelector:@selector(numbersOfDevices)]) {
        self.devicesNumbers = [[NSMutableArray alloc] initWithArray:[self.dataSource numbersOfDevices]];
    }
    
    if ([self.dataSource respondsToSelector:@selector(namesOfDevices)]) {
        self.devicesNames = [[NSMutableArray alloc] initWithArray:[self.dataSource namesOfDevices]];
    }
    
    for (int i = 0; i < self.devicesNumbers.count; i++) {
        UIButton *deviceButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [deviceButton setTitle:self.devicesNames[i] forState:UIControlStateNormal];
        deviceButton.tag = BASE_TAG + i;
        [deviceButton addTarget:self action:@selector(deviceButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:deviceButton];
    }
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
