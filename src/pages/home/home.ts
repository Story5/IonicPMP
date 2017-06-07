import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public camera: Camera,public alertCtrl: AlertController) {

  }

  ngOnInit() {
    var thisOBJ=this;
    window.addEventListener("message", function(e) {
      if (e.data == "getewmvalue") {
        // inputScan();
      } else if (e.data == "getPicValue") {
alert();
        thisOBJ.takePhoto();
        //openCamera();
      } else if (e.data.indexOf("set_jPushTags") > -1) {
        // set_jPushTags(e.data.split('|')[1]);
      } else if (e.data.indexOf("set_jPushAlias") > -1) {
        // set_jPushAlias(e.data.split('|')[1]);
      }
    }, false);
  }

   takePhoto () {
    // alert(2)
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
    }, (err) => {
      // Handl
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }
}
