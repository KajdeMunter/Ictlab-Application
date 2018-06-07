import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as config from '../../app/config';
import { HTTP } from '@ionic-native/http';
import { LessonModel } from '../../models/lesson';
import { DayModel } from '../../models/day';
import { ApiProvider } from '../../providers/api/api';
import { DayPipe } from '../../pipes/day/day';
 
@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedule: DayModel[] = [];
  filter = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HTTP,
    private api: ApiProvider
  ) {
    this.setScheduleForClass('INF3A', 23);
    this.filter = [];
  }

  public showLessonInfo(lesson: LessonModel) {
    let alert = this.alertCtrl.create();
    alert.setTitle(lesson.getCode());
    alert.setMessage(lesson.getRoom());
    alert.addButton('OK');
    alert.present();  
  }

  public setScheduleForClass(group, week) {
    this.api.getClassSchedule(group, week, this.http).then(response => {
      this.schedule = response;
    })
    .catch((error) => {
      let alert = this.alertCtrl.create();
      alert.setTitle(config.oops_title);
      alert.setMessage(config.oops_message);
      alert.addButton('OK');
      alert.present();  
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
        this.filter[0] = data;
        console.log(this.filter);
        this.filterScheduleClass();
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
        checked: group.c
      });
    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.filter[1] = data;
        this.filterScheduleDate();
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
        this.setScheduleForClass(this.filter[1], this.filter[2]);
        loading.dismiss();
      }
    });
    alert.present();
  }

}
