import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              keyboard: Keyboard) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // app版本更新
      this.postAppVersion(1.0);

      // 注册返回键
      this.registerBackButtonAction();

      // 解决iOS选择器弹出不显示done按钮问题
      keyboard.hideKeyboardAccessoryBar(false);

      window['plugins'].jPushPlugin.init();
    });
  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "setBack") {
        alert("h5setBack");
        this.platform.exitApp();
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