import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Autostart } from '@ionic-native/autostart';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Autostart,
    Broadcaster,
    Camera,
    HTTP,
    ZBar
  ]
})
export class AppModule {}
