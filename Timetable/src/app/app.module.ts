import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Firebase } from '@ionic-native/firebase'

import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {JsonpModule} from '@angular/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabBarPage } from '../pages/tab-bar/tab-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { SchedulePage } from '../pages/schedule/schedule';
import { RoomsPage } from '../pages/rooms/rooms';
import { AccountPage } from '../pages/account/account';
import { ApiProvider } from '../providers/api/api';
import { HTTP } from '@ionic-native/http';
import { FilterPage } from '../pages/filter/filter';

import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SendnotificationProvider } from '../providers/sendnotification/sendnotification';

const firebase = {
  apiKey: "AIzaSyDkwHrLAWywjfbKsdogMGFn1-fWD7rhb3k",
  authDomain: "hr-timetable.firebaseapp.com",
  databaseURL: "https://hr-timetable.firebaseio.com",
  projectId: "hr-timetable",
  storageBucket: "hr-timetable.appspot.com",
  messagingSenderId: "303796026665"
}

@NgModule({
  declarations: [
    MyApp,
    TabBarPage,
    HomePage,
    LoginPage,
    SchedulePage,
    RoomsPage,
    AccountPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpClientJsonpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabBarPage,
    HomePage,
    LoginPage,
    SchedulePage,
    RoomsPage,
    AccountPage,
    HomePage
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    NativeStorage,
    ApiProvider,
    HTTP,
    FcmProvider,
    SendnotificationProvider
  ]
})
export class AppModule {}
