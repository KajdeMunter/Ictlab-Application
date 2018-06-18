import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../../models/user';

@Injectable()
export class SendnotificationProvider {

  private user: UserModel;

  constructor(
    public http: HttpClient,
    public afs: AngularFirestore,
  ) {
    this.getUser();
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

  sendNotification(title: string, body: string, userId: string) {

    // Get the collection of notifications
    const notificationsRef = this.afs.collection('notifications');

    // Add the data to the collection
    // TODO get own userID as senderID
    notificationsRef.add({
      title,
      body,
      userId,
      Read: 'False',
      Fixed: 'False',
      Date: new Date(),
      senderId: this.user.getId(),
      senderName: this.user.getFirstName()
    });
  }
}
