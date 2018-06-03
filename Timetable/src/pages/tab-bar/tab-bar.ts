import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RoomsPage } from '../rooms/rooms';
import { SchedulePage } from '../schedule/schedule';

@IonicPage()
@Component({
  selector: 'page-tab-bar',
  templateUrl: 'tab-bar.html',
})
export class TabBarPage {

  tab1 = HomePage;
  tab2 = RoomsPage;
  tab3 = SchedulePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
