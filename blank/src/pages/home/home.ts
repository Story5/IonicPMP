import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult, FileTransferError } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

import { RecordPage } from '../record/record';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public androidPermissions: AndroidPermissions,
              public barcodeScanner: BarcodeScanner,
              public broadcaster : Broadcaster,
              public camera: Camera,
              public device: Device,
              public file: File,
              public transfer: FileTransfer,
              public media: Media,
              public mediaCapture: MediaCapture) {

  }

  ngOnInit() {
    window.addEventListener("message", (e) => {
      if (e.data == "getSystem") {
        this.returnMobileSystem();
      } else if (e.data == "getPicValue") {
        this.takePhoto();
      } else if (e.data == "takeVideo") {
        this.captureVideo();
        // this.captureAudio();
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
    alert("record");
    this.navCtrl.push(RecordPage);
    // let path = this.file.externalApplicationStorageDirectory + 'file.aac';
    // alert(path)
    // const file: MediaObject = this.media.create(path);
    // file.startRecord();
    // window.setTimeout(() => file.stopRecord(), 10000);

    // let path = this.file.externalApplicationStorageDirectory;
    // let filename = 'my_file.aac';
    // this.file.createFile(path, filename, true)
    // .then(() => {
    //   let finalPath = path.replace(/^file:\/\//, '') + 'my_file.aac';
    //   alert(finalPath);
    //   let file = this.media.create(path);
    //   file.startRecord();
    //   window.setTimeout(() => file.stopRecord(), 10000);
    // });
  }

  captureVideo(){

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    .then(success => {
      
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

    },err => {
      alert("需要存储权限才能录制视频");
    });
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
    let url = encodeURI('http://' + ipAddress + '/mobile/mobile.ashx?type=UploadFile');

    fileTransfer.upload(data.fullPath, url, options)
    .then((data : FileUploadResult) => {
      
      
      var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
      iWindow.postMessage("takeVideo:" + data.response, "*");
      // success
    }, (err : FileTransferError) => {
      alert("上传媒体文件失败!");
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
