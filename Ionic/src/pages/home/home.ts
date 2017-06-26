import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Broadcaster } from '@ionic-native/broadcaster';
import { HTTP } from '@ionic-native/http';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController,
              public broadcaster : Broadcaster,
              public camera: Camera,
              public http: HTTP,
              public zbar: ZBar) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getewmvalue") {
        this.scan2dBarcodes ();
      } else if (e.data == "getPicValue") {
        this.takePhoto();
        // this.scan2dBarcodes ();
      } else if (e.data == "getVideo1") {
        this.pushAndroidActivity();
      } else if (e.data == "getVideo2") {
        this.pushAndroidActivity2();
      } else if (e.data.indexOf("set_jPushTags") > -1) {
        this.set_jPushTags(e.data.split('|')[1]);
      } else if (e.data.indexOf("set_jPushAlias") > -1) {
        this.set_jPushAlias(e.data.split('|')[1]);
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
      iWindow.postMessage("getewmvalue:" + result.text, "*");
      alert("Scanning success");
      // iWindow.postMessage(result, "*");
    })
    .catch(error => {
      alert("Scanning failed: " + error); // Error message
    });
  }

  pushAndroidActivity() {
    // Send event to Native
    this.broadcaster.fireNativeEvent('openDevice', {"item":"ionic的值"}).then(() => { 
      console.log('success');
    });
  }

  pushAndroidActivity2() {
    // Send event to Native
    this.broadcaster.fireNativeEvent('openDevice2', {"item":"ionic的值"}).then(() => { 
      console.log('success');
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

  set_jPushTags(Tags) {
		try {
      window['plugins'].jPushPlugin.setTags([ Tags ]);
		} catch (e) {
			alert("Set jPushTags Error: " + e);
		}
	}

	set_jPushAlias(alias) {
		try {
			window['plugins'].jPushPlugin.setAlias(alias);
		} catch (e) {
			alert("Set jPushAlias Error: " + e);
		}
	}
}