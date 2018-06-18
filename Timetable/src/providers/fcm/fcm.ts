import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../../models/user';

@Injectable()
export class FcmProvider {

  private user: UserModel;

  constructor(
    public http: HttpClient,
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
  ) {
    console.log('This FcmProvider should be run when the user logs in');
  }

  public getUser() {
    let nativeStorage = new NativeStorage();
    nativeStorage.getItem('user').then(res => {
      this.user = res;
      console.log('user: ', this.user)
    }).catch(error => {
      this.user = null;
      console.log('user: ', this.user)
      console.log(error);
    });
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
      userId: 'testUser',
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
