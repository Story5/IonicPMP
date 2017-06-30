import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Autostart } from '@ionic-native/autostart';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              autostart: Autostart,
              keyboard: Keyboard) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      autostart.enable();
      // 解决iOS选择器弹出不显示done按钮问题
      keyboard.hideKeyboardAccessoryBar(false);

      window['plugins'].jPushPlugin.openNotificationInAndroidCallback = function (data) {  
        alert('jPushPlugins');   
    }
    });
  }
}

