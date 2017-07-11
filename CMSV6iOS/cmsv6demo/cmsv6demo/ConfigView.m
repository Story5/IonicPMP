//
//  ConfigView.m
//  cmsv6demo
//
//  Created by 陶春节 on 2017/5/25.
//  Copyright © 2017年 Apple. All rights reserved.
//

#import "ConfigView.h"

@implementation ConfigView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor lightGrayColor];
        [self createUI];
    }
    return self;
}

- (void)createUI
{
    self.userName   = [self createTextFieldWithIndex:0 leftLabelTitle:@"用户名"];
    
    self.password   = [self createTextFieldWithIndex:1 leftLabelTitle:@"密码"];
    
    self.ipTF       = [self createTextFieldWithIndex:2 leftLabelTitle:@"服务器"];
    
    self.deviceTF   = [self createTextFieldWithIndex:3 leftLabelTitle:@"设备号"];
}

- (UITextField *)createTextFieldWithIndex:(NSUInteger)index leftLabelTitle:(NSString *)title
{
    CGFloat gap = 5;
    CGFloat width = self.bounds.size.width - gap * 2;
    CGFloat height = 25;
    CGRect frame = CGRectMake(gap, gap + (gap + height) * index, width, height);
    UITextField *tf = [[UITextField alloc] initWithFrame:frame];
    tf.borderStyle = UITextBorderStyleRoundedRect;
    [self addSubview:tf];
    
    UILabel *leftLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 40, height)];
    leftLabel.text = title;
    tf.leftView = leftLabel;
    
    return tf;
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
