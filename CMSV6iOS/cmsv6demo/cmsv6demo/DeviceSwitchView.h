//
//  DeviceSwitchView.h
//  cmsv6demo
//
//  Created by Story5 on 2017/5/25.
//  Copyright © 2017年 Apple. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DeviceSwitchView;
@protocol DeviceSwitchViewDataSource <NSObject>

- (NSArray<NSString *> *)numbersOfDevices;
- (NSArray<NSString *> *)namesOfDevices;

@end

@protocol DeviceSwitchViewDelegate <NSObject>

- (void)deviceSwitchView:(DeviceSwitchView *)deviceSwitchView didSelectedDeviceAtIndex:(NSUInteger)index;

@end

@interface DeviceSwitchView : UIView

@property (nonatomic,assign) id<DeviceSwitchViewDataSource>dataSource;
@property (nonatomic,assign) id<DeviceSwitchViewDelegate>delegate;

@end
