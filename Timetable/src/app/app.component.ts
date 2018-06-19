import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabBarPage } from '../pages/tab-bar/tab-bar';

import { Firebase } from '@ionic-native/firebase';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { FcmProvider } from '../providers/fcm/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private nativeStorage: NativeStorage,
              public fcm: FcmProvider,
              public toastCtrl: ToastController
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
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('f7f7f7');
      splashScreen.hide();
      console.log("token " + this.fcm.getToken());
      // Get a FCM token
      this.fcm.getToken()
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 5000
          });
          toast.present();
        })
      ).subscribe()
    });
  }
}

