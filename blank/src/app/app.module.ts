import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Keyboard } from '@ionic-native/keyboard';
import { Media } from '@ionic-native/media';
import { MediaCapture } from '@ionic-native/media-capture';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecordPage } from '../pages/record/record';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Broadcaster,
    Camera,
    Device,
    File,
    FileTransfer,
    Keyboard,
    Media,
    MediaCapture,
    ScreenOrientation
  ]
})
export class AppModule {}
