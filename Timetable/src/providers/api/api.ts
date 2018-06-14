import * as config from '../../app/config';
import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { LessonModel } from "../../models/lesson";
import { DayModel } from "../../models/day";
import { ClassroomModel } from '../../models/classroom';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserModel } from '../../models/user';

@Injectable()
export class ApiProvider {

  private user: UserModel;

  constructor(
    private http: HTTP,
  ) {

  }

  public getUser() {
    let nativeStorage = new NativeStorage();
    nativeStorage.getItem('user').then(res => {
      this.user = res;
      console.log('user: ', this.user)
    }).catch(error => {
      this.user = null;
      console.log('user: ', this.user)
      console.log(error);
    });
  }

  public bookRoom(week: number, weekDay: number, startBlock: number, endBlock: number, guests: number, classroom: string, http: HTTP) {
    let string = config.baseApiString + config.bookingString;
    let ret = [];
    return new Promise(function (resolve, reject) {
      http.post(string, {
        "Week": week,
        "WeekDay": weekDay,
        "StartBlock": startBlock,
        "EndBlock": endBlock,
        "Guests": guests,
        "Classroom": classroom
      }, { Authorization: 'tt2' })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error.error);
        reject(error);
      });
    })
  }

  public getRoomsByFilter(guests) {

  }

  public getRooms(http: HTTP) {
    let string = config.baseApiString + config.classesString;
    let ret = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'tt2' })
      .then(response => {
        let jsonData = JSON.parse(response.data);
        jsonData.forEach(element => {
          ret.push(new ClassroomModel(element));
        });
        resolve(ret);
      })
      .catch(error => {
        console.log(error.error);
        reject(error);
      });
    })
  }

  public getRoomSchedule(group: String, week: number, http: HTTP): Promise<DayModel[]> {
    let string = config.baseApiString + config.roomsScheduleString + group + '/' + week;
    let dayModelArray = [[], [], [], [], []];
    let schedule = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'tt2' })
        .then(response => {
          let jsonData = JSON.parse(response.data);
          jsonData.forEach(element => {
            dayModelArray[element['WeekDay'] - 1].push(new LessonModel(element));
          });
          dayModelArray.forEach(day => {
            if (day.length > 0) {
              schedule.push(new DayModel(day));
            }
          });
          resolve(schedule);
        })
        .catch(error => {
          console.log(error.error);
          reject(error);
        });
    });
  }

  public getClassSchedule(group: String, week: number, http: HTTP): Promise<DayModel[]> {
    let string = config.baseApiString + config.classScheduleString + group + '/' + week;
    let dayModelArray = [[], [], [], [], []];
    let schedule = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'tt2' })
        .then(response => {
          let jsonData = JSON.parse(response.data);
          jsonData.forEach(element => {
            dayModelArray[element['WeekDay'] - 1].push(new LessonModel(element));
          });
          dayModelArray.forEach(day => {
            if (day.length > 0) {
              schedule.push(new DayModel(day));
            }
          });
          resolve(schedule);
        })
        .catch(error => {
          console.log(error.error);
          reject(error);
        });
    });
  }

  async getExpDateToken(idToken) {
    const googleUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="
    let url = googleUrl + idToken;
    let expDate = 0;

    await this.http.get(url, {}, {})
      .then(res => {
        let data = JSON.parse(res.data);
        expDate = data.exp;
      })
      .catch(error => {
        console.log(error.error)
      });
    return expDate
  }
}
