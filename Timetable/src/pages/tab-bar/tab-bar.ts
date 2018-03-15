import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tab-bar',
  templateUrl: 'tab-bar.html',
})
export class TabBarPage {

  tab1 = HomePage;
  tab2 = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
