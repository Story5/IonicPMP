//
//  IonicViewController.m
//  cmsv6demo
//
//  Created by Story5 on 27/06/2017.
//  Copyright © 2017 Apple. All rights reserved.
//

#import "IonicViewController.h"
#import "ViewController.h"

@interface IonicViewController ()

@end

@implementation IonicViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.wwwFolderName = @"www";
    self.startPage = @"index.html";

    [self addNotification];
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

- (void)addNotification
{
    [[NSNotificationCenter defaultCenter] addObserverForName:@"openDevice"
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:^(NSNotification *notification) {
                                                      NSLog(@"Handled 'test.event' [%@]", notification.userInfo[@"item"]);
                                                      [self pushDevice:@"10250"];
                                                  }];

    [[NSNotificationCenter defaultCenter] addObserverForName:@"openDevice2"
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:^(NSNotification *notification) {
                                                      NSLog(@"Handled 'test.event' [%@]", notification.userInfo[@"item"]);
                                                      [self pushDevice:@"10275"];
                                                  }];

}

- (void)pushDevice:(NSString *)device
{
    ViewController *vc = [[ViewController alloc] init];
    vc.deviceId = device;
    [self.navigationController pushViewController:vc animated:true];
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
