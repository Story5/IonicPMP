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
        // alert();
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
      alert("post image");
      var ifr = document.getElementsByTagName("iframe");
      window.postMessage("getPicValue:" + imageData, "*");
      // window.parent.postMessage(
      // postImage(imageData);
    }, (err) => {
      // Handl
    });
  }

  choosePhoto () {
    alert("choosePhoto");
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => {},
        complete: () => { console.log('could not get photos'); }
      });
    })
    // .catch(err => console.log('permissions weren't granted'));
    }
}

// function postImage(imageData) {
//   document.getElementById("mainframe").contentWindow.postMessage(
//       "getPicValue:" + imageData, "*");
// }
