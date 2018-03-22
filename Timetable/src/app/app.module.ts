import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Firebase } from '@ionic-native/firebase'

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabBarPage } from '../pages/tab-bar/tab-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { SchedulePage } from '../pages/schedule/schedule';
import { RoomsPage } from '../pages/rooms/rooms';
import { AccountPage } from '../pages/account/account';
import { PushnotificationPage } from '../pages/pushnotification/pushnotification';

@NgModule({
  declarations: [
    MyApp,
    TabBarPage,
    HomePage,
    LoginPage,
    SchedulePage,
    RoomsPage,
    AccountPage
    HomePage,
    PushnotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabBarPage,
    HomePage,
    LoginPage,
    SchedulePage,
    RoomsPage,
    AccountPage
    HomePage,
    PushnotificationPage
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    NativeStorage
  ]
})
export class AppModule {}
