import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiProvider } from '../../providers/api/api';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage,
    public api: ApiProvider,
    private modalCtrl: ModalController
    
  ) {

  }

  selectTab(index: number) { this.navCtrl.parent.select(index); }
  
  presentAccountModal() {
    let modal = this.modalCtrl.create(AccountPage);
    modal.present();
  }

}
