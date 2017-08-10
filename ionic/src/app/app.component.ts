import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              keyboard: Keyboard,
              screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // 锁定竖屏
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

      // app版本更新
      this.postAppVersion(1.3);

      // 注册返回键
      this.registerBackButtonAction();

      // 解决iOS选择器弹出不显示done按钮问题
      keyboard.hideKeyboardAccessoryBar(false);
    });
  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "setBack") {
        this.platform.exitApp();
      } else {
        
      }
    }, false);
  }

  registerBackButtonAction() {
     this.platform.registerBackButtonAction(() => {
      // alert("back");
      let iframe = document.getElementById("mainframe");
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("setBack:" + "android", "*");
     }, 1);
  }

  // 版本更新
  postAppVersion(version : number) {
    let iframe = document.getElementById("mainframe");
    var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
    iWindow.postMessage("appVersion:" + version, "*");
  }
}

