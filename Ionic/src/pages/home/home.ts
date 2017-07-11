import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Broadcaster } from '@ionic-native/broadcaster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { HTTP } from '@ionic-native/http';
import { Transfer, FileUploadOptions, TransferObject, FileUploadResult } from '@ionic-native/transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController,
              public broadcaster : Broadcaster,
              public camera: Camera,
              public device: Device,
              public http: HTTP,
              public transfer: Transfer,
              public mediaCapture: MediaCapture,
              public zbar: ZBar) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getSystem") {
        this.returnMobileSystem();
      } else if (e.data == "getewmvalue") {
        this.scan2dBarcodes ();
      } else if (e.data == "getPicValue") {
        this.takePhoto();
      } else if (e.data == "takeVideo") {
        this.takeVideo();
      } else if (e.data.indexOf("getVideo|") > -1) {
        let message = e.data.split("|")[3];
        this.pushAndroidActivity(message);
      } else if (e.data == "getVideo1") {
        this.pushAndroidActivity("10250");
      } else if (e.data == "getVideo2") {
        this.pushAndroidActivity("10275");
      } else if (e.data.indexOf("set_jPushTags") > -1) {
        let tags = e.data.split('|')[1];
        // alert("tags : " + tags);
        this.set_jPushTags(tags); 
      } else if (e.data.indexOf("set_jPushAlias") > -1) {
        let alias = e.data.split('|')[1]
        // alert("alias : " + alias);
        this.set_jPushAlias(alias);
      }
    }, false);
  }

  returnMobileSystem() {
    let platform = this.device.platform;
    let iframe = document.getElementById("mainframe");
    var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
    iWindow.postMessage("getSystem:" + platform, "*");
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

  takeVideo(){
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
    .then(
      (dataArray: MediaFile[]) => {
        var mediaFile = dataArray[0];
        // alert(JSON.stringify(data));
        this.uploadVideo(mediaFile);
      },
      (err: CaptureError) => {
        alert("CaptureError:" + err);
      }
    );
  }

  uploadVideo(data : MediaFile) {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'video.mp4',
      headers: {}
    }

    let iframe = document.getElementById("mainframe");
    let srcAddress = (<HTMLIFrameElement>iframe).src;
    let ipAddress = srcAddress.split("/")[2];

    const fileTransfer: TransferObject = this.transfer.create();
    let url = encodeURI("http://" + ipAddress + "/mobile/mobile.ashx?type=UploadFile");
    fileTransfer.upload(data.fullPath, url, options)
    .then((data : FileUploadResult) => {
      
      
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("takeVideo:" + data.response, "*");
      // success
    }, (err) => {
      alert("uploadError:" + err);
      // error
    })
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
      iWindow.postMessage("getewmvalue:" + result, "*");
    })
    .catch(error => {
      alert("Scanning failed: " + error); // Error message
    });
  }

  pushAndroidActivity(message? : string) {
    // Send event to Native
    this.broadcaster.fireNativeEvent('openDevice', { param : message }).then(() => { 
      console.log('success');
    });
  }

  set_jPushTags(Tags) {
		try {
      window['plugins'].jPushPlugin.setTags([ Tags ]);
		} catch (e) {
			// alert("Set jPushTags Error: " + e);
		}
	}

	set_jPushAlias(alias) {
		this.broadcaster.fireNativeEvent('setAlias', { param : alias }).then(() => { 
      alert("fire alias success");
    });
	}
}