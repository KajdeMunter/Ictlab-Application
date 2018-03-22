import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabBarPage } from '../tab-bar/tab-bar';

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
  ) { }

  login(){
    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();
    this.googlePlus.login({'webClientId': '303796026665-lqbuq0ct6v42lq3k1ee2cu1t8d7iholj.apps.googleusercontent.com'})
    .then((user) => {
      loading.dismiss();
      console.log(user);
      this.nativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(() => {
        this.navCtrl.setRoot(TabBarPage);
        console.log(this.nativeStorage.getItem('user'))
      }, function (error) {
        console.log(error);
      })
    }, function (error) {
      console.log(error);
      loading.dismiss();
    });
  }

}

