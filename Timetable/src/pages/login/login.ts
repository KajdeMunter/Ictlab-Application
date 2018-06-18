import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabBarPage } from '../tab-bar/tab-bar';
import { UserModel } from '../../models/user';
import * as config from '../../app/config';
import { ApiProvider } from '../../providers/api/api';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage,
    public alertCtrl: AlertController,
    private api: ApiProvider,
    private http: HTTP
  ) {
    this.navCtrl = navCtrl;
  }


  public signIn() {
    this.nativeStorage.clear();
    let user;
    let loading = this.loadingCtrl.create({ content: config.loading });
    loading.present();

    this.googlePlus.login({
      'webClientId': config.webClientId,
      'offline': true
    })
      .then((res) => {
        user = new UserModel(res);
        this.nativeStorage.setItem('user', user);
        loading.dismiss();
      }
      ).then(() => {
        if (user.getEmail().endsWith('@hr.nl')) {
          this.api.postIdToken(user.getIdToken(), this.http);
          this.navCtrl.setRoot(TabBarPage, {}, { animate: true, direction: 'forward' })
        } else {
          this.signOut();
          let alert = this.alertCtrl.create();
          alert.setTitle('Warning');
          alert.setMessage('You did not log in in with your Hogeschool Rotterdam details. Please log in with your @hr.nl credentials in order to use the app properly.');
          alert.addButton('OK');
          alert.present();
        }
      });
  }

  public signOut() {
    this.googlePlus.logout()
      .then(() => { this.nativeStorage.clear() }
        , function (error) {
          console.log(error);
        });
  }


}

