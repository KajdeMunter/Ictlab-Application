import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user: String = null;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage

  ) {  }

  ionViewWillEnter() {
    console.log('Entered.')
    this.nativeStorage.getItem('user').then(
      data => { this.user = data['name']; },
      error => console.error(error)
    );  
  }


  logout(){
    let loading = this.loadingCtrl.create({ content: 'Logging out...' });
    loading.present();
      this.googlePlus.logout()
      .then(() => {
        console.log("logged out");
        this.nativeStorage.clear()
        .then(() => {
        console.log("storage cleared");
        this.navCtrl.setRoot(LoginPage);
        loading.dismiss();
        })
      }, function (error) {
        this.navCtrl.setRoot(LoginPage);
        console.log(error);
      });
}

}
