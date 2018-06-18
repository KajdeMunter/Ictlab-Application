import * as config from '../../app/config';
import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { LessonModel } from "../../models/lesson";
import { DayModel } from "../../models/day";
import { ClassroomModel } from '../../models/classroom';

@Injectable()
export class ApiProvider {

  constructor(
    private http: HTTP,
  ) {

  }

  public postIdToken(idToken: string, http: HTTP) {
    let string = config.baseApiString + config.loginString;
    http.post(string, {}, { Authorization: 'Bearer ' + idToken })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.error);
      });
  }

  public bookRoom(week: number, weekDay: number, startBlock: number, endBlock: number, guests: number, classroom: string, http: HTTP, token: string) {
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
      }, { Authorization: 'Bearer ' + token })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error.error);
          reject(error);
        });
    })
  }

  public getBookings(week: number, http: HTTP, token: string) {
    let string = config.baseApiString + config.personalString + week ;
    let ret = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'Bearer ' + token })
        .then(response => {
          let jsonData = JSON.parse(response.data);
          console.log(jsonData);
          jsonData.forEach(element => {
            ret.push(new LessonModel(element));
          });
          resolve(ret);
        })
        .catch(error => {
          console.log(error.error);
          reject(error);
        });
    })
  }

  public getRoomsByFilter(guests: number, startBlock: number, endBlock: number, week: number, weekDay: number, http: HTTP, token: string) {
    let string = config.baseApiString + config.filterString + guests + '/' + startBlock + '/' + endBlock + '/' + week + '/' + weekDay;
    let ret = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'Bearer ' + token })
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

  public getRooms(http: HTTP, token: string) {
    let string = config.baseApiString + config.classesString;
    let ret = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'Bearer ' + token })
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

  public getRoomSchedule(group: String, week: number, http: HTTP, token: string): Promise<DayModel[]> {
    let string = config.baseApiString + config.roomsScheduleString + group + '/' + week;
    let dayModelArray = [[], [], [], [], []];
    let schedule = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'Bearer ' + token })
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

  public getClassSchedule(group: String, week: number, http: HTTP, token: string): Promise<DayModel[]> {
    let string = config.baseApiString + config.classScheduleString + group + '/' + week;
    let dayModelArray = [[], [], [], [], []];
    let schedule = [];
    return new Promise(function (resolve, reject) {
      http.get(string, {}, { Authorization: 'Bearer ' + token })
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
