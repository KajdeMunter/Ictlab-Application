import { Component } from '@angular/core';
import { Platform, Tab } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../models/user';
import { TabBarPage } from '../pages/tab-bar/tab-bar';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private nativeStorage: NativeStorage
            
            ) {
    platform.ready().then(() => {

      this.rootPage = TabBarPage;

      //this.nativeStorage.getItem('user').then(
      //  loggedIn => this.rootPage = TabBarPage,
      //  error => this.rootPage = LoginPage
      //)
        
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

