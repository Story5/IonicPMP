import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public barcodeScanner: BarcodeScanner,
              public broadcaster : Broadcaster,
              public camera: Camera,
              public device: Device,
              public transfer: FileTransfer,
              public mediaCapture: MediaCapture) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getSystem") {
        this.returnMobileSystem();
      } else if (e.data == "getPicValue") {
        this.takePhoto();
      } else if (e.data == "takeVideo") {
        // this.captureVideo();
        this.captureAudio();
      } else if (e.data == "getewmvalue") {
        this.barcodeScannerScan ();
      } else if (e.data.indexOf("getVideo|") > -1) {
        let message = e.data.split("|")[3];
        this.pushAndroidActivity(message);
      } else if (e.data.indexOf("set_jPushAlias") > -1) {
        let alias = e.data.split('|')[1]
        this.set_jPushAlias(alias);
      } else if (e.data.indexOf("set_jPushTags") > -1) {
        let tags = e.data.split('|')[1];
        this.set_jPushTags(tags); 
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
      mediaType: this.camera.MediaType.PICTURE,
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
  
  captureAudio(){
    let options: CaptureAudioOptions = { limit: 1 };
    this.mediaCapture.captureAudio(options)
    .then(
      (dataArray: MediaFile[]) => {
        var mediaFile = dataArray[0];
        // alert(JSON.stringify(data));
        this.uploadMediaFile(mediaFile);
      },
      (err: CaptureError) => {
        alert("录音失败!");
        // alert("CaptureError:" + err);
      }
    );
  }

  captureVideo(){
    let options: CaptureVideoOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
    .then(
      (dataArray: MediaFile[]) => {
        var mediaFile = dataArray[0];
        // alert(JSON.stringify(data));
        this.uploadMediaFile(mediaFile);
      },
      (err: CaptureError) => {
        alert("录制视频失败!");
        // alert("CaptureError:" + err);
      }
    );
  }

  uploadMediaFile(data : MediaFile) {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'video.mp4',
      headers: {}
    }

    let iframe = document.getElementById("mainframe");
    let srcAddress = (<HTMLIFrameElement>iframe).src;
    let ipAddress = srcAddress.split("/")[2];

    const fileTransfer: FileTransferObject = this.transfer.create();
    let url = encodeURI("http://" + ipAddress + "/mobile/mobile.ashx?type=UploadFile");
    fileTransfer.upload(data.fullPath, url, options)
    .then((data : FileUploadResult) => {
      
      
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("takeVideo:" + data.response, "*");
      // success
    }, (err) => {
      alert("上传媒体文件失败!");
      // alert("uploadError:" + err);
      // error
    })
  }

  barcodeScannerScan() {
    this.barcodeScanner.scan().then((barcodeData : BarcodeScanResult) => {
      // Success! Barcode data is here
      this.postQRString(barcodeData.text);
    }, (err) => {
        // An error occurred
        alert("扫描二维码失败!");
    });
  }

  postQRString(text : string) {
    let iframe = document.getElementById("mainframe");
    var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
    iWindow.postMessage("getewmvalue:" + text, "*");
  }

  pushAndroidActivity(message? : string) {
    // Send event to Native
    this.broadcaster.fireNativeEvent('openDevice', { param : message }).then(() => { 
      console.log('success');
    });
  }

  set_jPushAlias(alias) {
		this.broadcaster.fireNativeEvent('setAlias', { param : alias }).then(() => { 
      console.log("fire alias success");
    });
	}

  set_jPushTags(tags) {
		this.broadcaster.fireNativeEvent('setTags', { param : tags }).then(() => { 
      console.log("fire tags success");
    });
	}

}
