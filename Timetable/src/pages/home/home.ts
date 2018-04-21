import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { ApiProvider } from '../../providers/api/api';
import { FilterPage } from '../filter/filter';
import { RoomsPage } from '../rooms/rooms';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { SendnotificationProvider } from '../../providers/sendnotification/sendnotification';

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
    public notification: SendnotificationProvider
  ) {

  }

  selectTab(index: number) { this.navCtrl.parent.select(index); }

  pushFilterPage() {
    // TODO: remove this.
    this.notification.sendNotification('Dit is een notificatie titel', 'dit is een notificatie body', 'testUser');

    this.navCtrl.push(FilterPage);
  }

}
