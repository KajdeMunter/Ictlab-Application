import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Firebase } from '@ionic-native/firebase';

import { GooglePlus } from '@ionic-native/google-plus';

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
import { DatePicker } from '@ionic-native/date-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BookingsPage } from '../pages/bookings/bookings';
import { ReportPage } from '../pages/report/report';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { IncidentPage } from '../pages/incident/incident';
import { DayPipe } from '../pipes/day/day';
import { TimePipe } from '../pipes/time/time';
import { AlertProvider } from '../providers/alert/alert';

import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SendnotificationProvider } from '../providers/sendnotification/sendnotification';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AuthenticationProvider } from '../providers/authentication/authentication';


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
    BookingsPage,
    ReportPage,
    ProfilePage,
    AboutPage,
    IncidentPage,
    DayPipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpClientJsonpModule,
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
    BookingsPage,
    ReportPage,
    ProfilePage,
    IncidentPage,
    AboutPage
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    NativeStorage,
    ApiProvider,
    AuthenticationProvider,
    HTTP,
    DatePicker,
    InAppBrowser,
    AlertProvider,
    FcmProvider,
    SendnotificationProvider,
    AuthenticationProvider
  ]
})
export class AppModule {}
