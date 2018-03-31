import { Injectable } from "@angular/core";
import { HTTP } from '@ionic-native/http';

@Injectable()
export class ApiProvider {

  constructor(public http: HTTP) {
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
