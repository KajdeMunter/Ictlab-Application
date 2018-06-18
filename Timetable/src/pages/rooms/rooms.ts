import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as config from '../../app/config';
import { ApiProvider } from '../../providers/api/api';
import { HTTP } from '@ionic-native/http';
import { DayPipe } from '../../pipes/day/day';
import { TimePipe } from '../../pipes/time/time';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  dummy: any[];
  clicked: Boolean;

  week = 25;
  weekDay = 3;
  timeStart = 1;
  timeEnd = 3;
  guests = 1;

  blocks;

  rooms;

  authenticatedUserToken: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    private api: ApiProvider,
    private auth: AuthenticationProvider,
    private http: HTTP
  ) {
    this.blocks = config.blocks;
  }

  public filterRooms(guests: number, startBlock: number, endBlock: number, week: number, weekDay: number) {
    let loading = this.loadingCtrl.create({ content: config.loading })
    loading.present();
    this.api.getRoomsByFilter(guests, startBlock, endBlock, week, weekDay, this.http, this.authenticatedUserToken).then(response => {
      loading.dismiss();
      this.rooms = response;
      this.rooms = this.rooms.sort((a, b) => a.getId() < b.getId() ? -1 : a.getId() > b.getId() ? 1 : 0);
      this.clicked = null;
    })
      .catch((error) => {
        loading.dismiss();
        console.log(error);
      })
  }

  public bookRoom(guests: number, startBlock: number, endBlock: number, week: number, weekDay: number, room: string) {
    this.api.bookRoom(week, weekDay, startBlock, endBlock, guests, room, this.http, this.authenticatedUserToken)
      .then(response => {
        this.presentReceipt('Great!', 'Your booking of room ' + room + ' is completed and it is ready for use on the reserved time.');
        console.log(response);
      })
      .catch((error) => {
        this.presentReceipt('Oops... MAKE A NEW REFRESHER HERE', 'Something went wrong when we tried to book your room. It might not be available anymore.');
        console.log(error);
      })
  }

  presentReceipt(status: string, message: string) {
    let alert = this.alertCtrl.create();
    alert.setTitle(status);
    alert.setMessage(message),
      alert.addButton({
        text: 'OK',
        handler: action => {
          this.filterRooms(this.guests, this.timeStart, this.timeEnd, this.week, this.weekDay);
        }
      });
    alert.present();
  }

  pickDay() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Day');
    config.days.forEach(day => {
      alert.addInput({
        type: 'radio',
        label: day.day,
        value: day.value,
        checked: false
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data != null) {
          this.weekDay = data;
        } else {
          this.pickDay();
        }
      }
    });
    alert.present();
  }

  pickDate() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Week');
    config.dates.forEach(date => {
      alert.addInput({
        type: 'radio',
        label: date.date,
        value: date.value,
        checked: false
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data != null) {
          this.week = data;
        } else {
          this.pickDate();
        }
      }
    });
    alert.present();
  }

  showTimeRadioAlert(index: number) {
    let alert = this.alertCtrl.create();
    let i = 0;
    alert.setTitle('Block period');
    this.blocks.forEach(block => {
      i++;
      alert.addInput({
        type: 'radio',
        label: block,
        value: i.toString(),
        checked: false
      });
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data != null) {
          if (index == 0) {
            this.timeStart = data;
          } else {
            this.timeEnd = data;
          }
        }
      }
    });
    alert.present();
  }

  presentConfirm(room: string) {
    let day = new DayPipe().transform(this.weekDay.toString());
    let start = new TimePipe().transform(this.timeStart);
    let end = new TimePipe().transform(this.timeEnd);
    console.log(day);
    let alert = this.alertCtrl.create({
      title: 'Confirm booking',
      message: 'You are about to book room ' + room + ' for ' + day + ' ' + start + ' to ' + end + '. Is that correct?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Buy clicked');
            this.auth.signIn().then(() => {
              this.bookRoom(this.guests, this.timeStart, this.timeEnd, this.week, this.weekDay, room);
            });
          }
        }
      ]
    });
    alert.present();
  }

  calcGuests(amount) {
    this.guests += amount;
    if (this.guests == -1) { this.guests = 0; }
  }

  ionViewWillEnter() {
    this.clicked = null;
    this.nativeStorage.getItem('user').then((user) => {
      this.authenticatedUserToken = user['idToken'];
      console.log(this.authenticatedUserToken);
      this.filterRooms(this.guests, this.timeStart, this.timeEnd, this.week, this.weekDay);

    })
  }
  activateFilter() { this.clicked = !this.clicked; }

}
