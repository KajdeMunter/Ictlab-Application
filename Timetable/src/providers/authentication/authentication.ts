import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import * as config from '../../app/config';
import { ApiProvider } from '../api/api';
import { UserModel } from '../../models/user';
import { User } from '@firebase/auth-types';


@Injectable()
export class AuthenticationProvider {

  constructor(   
    public loadingCtrl: LoadingController,
    public googlePlus: GooglePlus,
    public nativeStorage: NativeStorage,
    private api: ApiProvider,
    private http: HTTP
  ) {
  }

  public getAuthenticatedUser() {
    let ret;
    this.nativeStorage.getItem('user').then((res) => {
      ret = res;
    })
    .catch((error) => {
      ret = 'error: ', error;
    })
    return ret;
  }

  async signIn() {
    let user;
    let loading = this.loadingCtrl.create({ content: config.loading });

    loading.present();

    await this.googlePlus.login({
      'webClientId': config.webClientId,
      'offline': true
    })
    .then((res) => { 
      user = new UserModel(res); 
      this.nativeStorage.setItem('user', user);
    }
    ,(error) => {
      console.log(error);
    })
    .then(() => {
      loading.dismiss();
      if(user.getEmail().endsWith('@hr.nl')) {
        this.api.postIdToken(user.getIdToken(), this.http);
      } else {
        this.signOut();
        console.log('You are not able to book a room. (CREATE ALERT PROVIDER)')
      }
    });
  }

  signOut() {
    let loading = this.loadingCtrl.create({ content: config.logout });
    loading.present();
    this.googlePlus.logout()
      .then(() => {
        this.nativeStorage.clear()
          .then(() => {
            loading.dismiss()
              .then(() => {
                
            });
          })
      }, function (error) {
        console.log(error);
      });
  }

}
