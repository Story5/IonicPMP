import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController,public camera: Camera,public photoLibrary: PhotoLibrary) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getewmvalue") {
        // inputScan();
      } else if (e.data == "getPicValue") {
        this.takePhoto();
        // openCamera();
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let iframe = document.getElementById("mainframe");
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("getPicValue:" + imageData, "*");
      // postImage(imageData);
    }, (err) => {
      // Handl
    });
  }
}