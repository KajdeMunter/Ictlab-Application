import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import * as config from '../../app/config';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AboutPage } from '../about/about';
import { ReportPage } from '../report/report';
import { BookingsPage } from '../bookings/bookings';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage,
    public iab: InAppBrowser
  ) { }

  dismiss() {
    this.navCtrl.pop();
  }

  aboutPage() {this.navCtrl.push(AboutPage); }
  reportsPage() {this.navCtrl.push(ReportPage); }
  bookingsPage() { this.navCtrl.push(BookingsPage); }

  logout() {
    let loading = this.loadingCtrl.create({ content: config.logout });
    loading.present();
    this.googlePlus.logout()
      .then(() => {
        this.nativeStorage.clear()
          .then(() => {
            loading.dismiss().then(() => {
              this.app.getRootNav().setRoot(LoginPage, {}, {animate: true, direction: 'back'});
            });
          })
      }, function (error) {
        console.log(error);
      });
  }

}
