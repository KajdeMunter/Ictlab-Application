import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabBarPage } from '../tab-bar/tab-bar';
import { UserModel } from '../../models/user';
import * as config from '../../app/config';

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
    public nativeStorage: NativeStorage
  ) { 
    this.navCtrl = navCtrl;
  }


  public signIn() {
    this.nativeStorage.clear();
    let loading = this.loadingCtrl.create({ content: config.loading });
    loading.present();

    this.googlePlus.login({
      'webClientId': config.webClientId,
      'offline': false
    })
    .then((res) => {
      loading.dismiss().then(() => {
        this.navCtrl.setRoot(TabBarPage, {}, {animate: true, direction: 'forward'})
      })

      let user = new UserModel(res, function(completeUser){
      console.log(completeUser.fullName);
      let nativeStorage = new NativeStorage();
      nativeStorage.setItem('user', { user })
      });
    }, (err) => {
      console.log(err)
      loading.dismiss();
    }
    ).then(() => {
    });
  }

  
}

