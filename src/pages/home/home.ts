import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { Broadcaster } from '@ionic-native/broadcaster';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController,public camera: Camera,public zbar: ZBar,public broadcaster : Broadcaster) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getewmvalue") {
        this.scan2dBarcodes ();
      } else if (e.data == "getPicValue") {
        // this.takePhoto();
        this.pushAndroidActivity();
      } else if (e.data.indexOf("set_jPushTags") > -1) {
        // set_jPushTags(e.data.split('|')[1]);
      } else if (e.data.indexOf("set_jPushAlias") > -1) {
        // set_jPushAlias(e.data.split('|')[1]);
      }
    }, false);
  }

  takePhoto () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      let iframe = document.getElementById("mainframe");
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("getPicValue:" + imageData, "*");
    }, (err) => {
      // Handl
    });
  }

  scan2dBarcodes () {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };

    this.zbar.scan(options)
    .then(result => {
      let iframe = document.getElementById("mainframe");
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("getewmvalue:" + result.text, "*"); // Scanned code
    })
    .catch(error => {
      alert("Scanning failed: " + error); // Error message
    });
  }

  pushAndroidActivity() {
    // Send event to Native
    alert("start fireNativeEvent");
    this.broadcaster.fireNativeEvent('openDevice', {item:'test data'}).then(() => { 
      console.log('success');
      alert('success fireNativeEvent');
    });
  }

  backToIonic() {
    // Listen to events from Native
    alert("start addEventListener");
    this.broadcaster.addEventListener('backIonic').subscribe((event) => {
      console.log(event);
      alert('success addEventListener');
    });
  }
}