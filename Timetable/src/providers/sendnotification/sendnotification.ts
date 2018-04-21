import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SendnotificationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SendnotificationProvider Provider');
  }

}
