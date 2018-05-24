import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';

@Injectable()
export class SendnotificationProvider {

  constructor(
    public http: HttpClient,
    public afs: AngularFirestore
  ) {
  }

  sendNotification(title: string, body: string, userId: string) {

    // Get the collection of notifications
    const notificationsRef = this.afs.collection('notifications');

    // Add the data to the collection
    notificationsRef.add({
      title,
      body,
      userId,
      Read: 'False',
    });
  }
}
