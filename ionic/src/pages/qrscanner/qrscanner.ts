import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html'
})
export class QRScannerPage {

  constructor(public navCtrl: NavController,
              public qrScanner: QRScanner) {
        this.qrscanner();
  }

  qrscanner() {
    
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.postQRString(text);
            this.navCtrl.pop();
          });
          // show camera preview
          this.qrScanner.show()
          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });
  }

  postQRString(text : string) {
    let iframe = document.getElementById("mainframe");
    var iWindow = (<HTMLIFrameElement> iframe).contentWindow;
    iWindow.postMessage("getewmvalue:" + text, "*");
  }
}
