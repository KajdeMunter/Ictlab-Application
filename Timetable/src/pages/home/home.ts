import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { RoomsPage } from '../rooms/rooms';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage
  
  ) {

  }

  selectTab(index: number) { this.navCtrl.parent.select(index); }

}
