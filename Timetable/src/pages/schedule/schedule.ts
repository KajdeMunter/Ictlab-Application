import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as config from '../../app/config';
import { HTTP } from '@ionic-native/http';
import { LessonModel } from '../../models/lesson';
import { DayModel } from '../../models/day';
import { ApiProvider } from '../../providers/api/api';
import { DayPipe } from '../../pipes/day/day';
import { ClassroomModel } from '../../models/classroom';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedule: DayModel[] = [];
  bookings;
  rooms;

  filter = [];

  authenticatedUserToken: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController,
    private http: HTTP,
    private api: ApiProvider
  ) {
    this.filter = [];
  }

  public getPersonalBookings() {
    this.api.getBookings(25, this.http, this.authenticatedUserToken).then(response => {
      this.bookings = response;
      console.log('bookings: ', this.bookings)
    })
      .catch((error) => {
        let alert = this.alertCtrl.create();
        alert.setTitle(config.oops_title);
        alert.setMessage(config.oops_message);
        alert.addButton('OK');
        alert.present();
      })
  }

  public setRooms() {
    this.api.getRooms(this.http, this.authenticatedUserToken).then(response => {
      this.rooms = response;
      this.rooms = this.rooms.sort((a, b) => a.getId() < b.getId() ? -1 : a.getId() > b.getId() ? 1 : 0);
    })
      .catch((error) => {
        let alert = this.alertCtrl.create();
        alert.setTitle(config.oops_title);
        alert.setMessage(config.oops_message);
        alert.addButton('OK');
        alert.present();
      })
  }

  public setScheduleForClass(group, week) {
    this.api.getClassSchedule(group, week, this.http, this.authenticatedUserToken).then(response => {
      this.schedule = response;
      console.log(this.schedule);
    })
      .catch((error) => {
        let alert = this.alertCtrl.create();
        alert.setTitle(config.oops_title);
        alert.setMessage(config.oops_message);
        alert.addButton('OK');
        alert.present();
      })
  }

  public setScheduleForRoom(room, week) {
    let loading = this.loadingCtrl.create({ content: config.loading });
    loading.present();
    this.api.getRoomSchedule(room, week, this.http, this.authenticatedUserToken).then(response => {
      loading.dismiss().then(() => {
        this.schedule = response;
      })
    })
      .catch((error) => {
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create();
          alert.setTitle(config.oops_title);
          alert.setMessage(config.oops_message);
          alert.addButton('OK');
          alert.present();
        })

      })
  }

  public filterScheduleType() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Schedule');
    config.schedules.forEach(schedule => {
      alert.addInput({
        type: 'radio',
        label: schedule.variant,
        value: schedule.value,
        checked: schedule.c
      });
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == 'classes') {
          this.filterScheduleClass();
        } else {
          this.filterScheduleRooms();
        }
        this.filter[0] = data;

      }
    });
    alert.present();
  }

  public filterScheduleClass() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Your class');
    config.classes.forEach(group => {
      alert.addInput({
        type: 'radio',
        label: group.variant,
        value: group.variant,
        checked: false
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data != null) {
          this.filter[1] = data;
          this.filterScheduleDate();
        } else {
          this.filterScheduleClass();
        }
      }
    });
    alert.present();
  }

  public filterScheduleRooms() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Your room');
    this.rooms.forEach(room => {
      alert.addInput({
        type: 'radio',
        label: room.getId(),
        value: room.getId(),
        checked: false
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data != null) {
          this.filter[1] = data;
          this.filterScheduleDate();
        } else {
          this.filterScheduleRooms();
        }
      }
    });
    alert.present();
  }

  public filterScheduleDate() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Calendarweek');
    config.dates.forEach(date => {
      alert.addInput({
        type: 'radio',
        label: date.date,
        value: date.value,
        checked: date.c
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        let loading = this.loadingCtrl.create({ content: config.loading });
        loading.present();
        this.filter[2] = data;
        if (this.filter[0] == 'classes') {
          this.setScheduleForClass(this.filter[1], this.filter[2]);
          console.log(this.filter[1], this.filter[2]);
        } else {
          this.setScheduleForRoom(this.filter[1], this.filter[2]);
        }
        loading.dismiss();
      }
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('user').then((user) => {
      this.authenticatedUserToken = user['idToken'];
      this.setRooms();
      this.setScheduleForClass(config.preferedClass, 25);
      this.getPersonalBookings();
    })
  }

}
