import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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

@NgModule({
  declarations: [
    MyApp,
    TabBarPage,
    HomePage,
    LoginPage,
    SchedulePage,
    RoomsPage,
    AccountPage,
    FilterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpClientJsonpModule,
    JsonpModule
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
    FilterPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    NativeStorage,
    ApiProvider,
    HTTP
  ]
})
export class AppModule {}
