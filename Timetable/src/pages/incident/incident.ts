import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SendnotificationProvider } from '../../providers/sendnotification/sendnotification';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private notification: SendnotificationProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
  ) {
    this.incident = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidentPage');
  }

  pickRoom() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Room');

    alert.addInput({
      type: 'radio',
      label: 'h4.318',
      value: 'h4.318',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'h5.318',
      value: 'h5.318',
      checked: false
    });

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
