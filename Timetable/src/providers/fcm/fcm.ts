import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FcmProvider {

  constructor(
    public http: HttpClient,
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {
    console.log('This FcmProvider should be run when the user logs in');
  }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
    }

    // Is not cordova == web PWA
    if (!this.platform.is('cordova')) {
      // TODO
    }

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if (!token) return;
    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: 'gerben', // TODO: this should eventually be the auth userID
    }

    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

  /*
   * This should be called when the user logs out
   */
  public async removeTokenFromFirestore() {
    // get device token
    let token = await this.firebaseNative.getToken();
 
    // Get notification collection and remove the token
    const notificationsRef = this.afs.collection('notifications').doc(token).delete();
  }
}
