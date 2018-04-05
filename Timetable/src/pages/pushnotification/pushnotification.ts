import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pushnotification',
  templateUrl: 'pushnotification.html',
})
export class PushnotificationPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    console.log('kaasnotification');

  }

  ionViewDidLoad() {

  }
}

