import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { RoomsPage } from '../rooms/rooms';
import { SchedulePage } from '../schedule/schedule';

@IonicPage()
@Component({
  selector: 'page-tab-bar',
  templateUrl: 'tab-bar.html',
})
export class TabBarPage {

  tab1 = HomePage;
  tab2 = SchedulePage;
  tab3 = RoomsPage;
  tab4 = AccountPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
