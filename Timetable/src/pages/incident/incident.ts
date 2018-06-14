import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SendnotificationProvider } from '../../providers/sendnotification/sendnotification';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ApiProvider } from '../../providers/api/api';
import * as config from '../../app/config';

/**
 * Generated class for the IncidentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incident',
  templateUrl: 'incident.html',
})
export class IncidentPage {

  private incident: FormGroup;
  private selectedRoom: string;
  rooms;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private notification: SendnotificationProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private http: HTTP,
    private api: ApiProvider
  ) {
    this.setRooms();
    this.incident = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }

  public setRooms() {
    this.api.getRooms(this.http).then(response => {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidentPage');
  }

  pickRoom() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Room');

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
          this.selectedRoom = data;
        }
      }
    });
    alert.present();
  }

  sendIncident() {
    // TODO userID
    this.notification.sendNotification(this.selectedRoom, this.incident.value.description, 'dashboard');
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Report succesfully sent',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
