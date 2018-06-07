import * as config from '../../app/config';
import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { LessonModel } from "../../models/lesson";
import { DayModel } from "../../models/day";

@Injectable()
export class ApiProvider {

  constructor(private http: HTTP) {

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
          console.log(error.error); // error message as string
          reject(error);
        });
    });
  }

  createScheduleService(data) {
    let days = [[], [], [], [], []];
    data.forEach(element => {
      days[element['WeekDay'] - 1].push(new LessonModel(element));
    });
    let schedule = [];
    days.forEach(day => {
      if (day.length > 0) {
        let dayModel = new DayModel(day);
        schedule.push(dayModel);
      }
    });
    return schedule;
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
