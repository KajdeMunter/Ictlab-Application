import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as config from '../../app/config';


@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  dummy: any[];
  clicked: Boolean;

  date: String = '18th May 2018';
  timeStart = config.blocks[0];
  timeEnd = config.blocks[2];
  guests: Number = 9;
  blocks;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.dummy = [1, 2, 3, 4, 5, 6, 7];
    this.blocks = config.blocks;
  }

  calcGuests(amount) {
    this.guests += amount;
    if (this.guests == -1) { this.guests = 0; }
  }

  applyFilter() {
    let loading = this.loadingCtrl.create({ content: config.loading })
    loading.present().then(() => {
      alert('This page will now filter: ' + this.date + ' - ' + this.timeStart + ' - ' + this.timeEnd + ' - ' + this.guests);
    });
    loading.dismiss();
    this.clicked = false;
  }

  confirmRoom() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Confirmation');
    alert.setMessage('You are about to book room H.4.308. Are you sure about that?');
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: data => {
        let loading = this.loadingCtrl.create({ content: config.loading });
        loading.present();
        loading.dismiss().then(() => {
          this.presentReceipt();
        });;
      }
    });
    alert.present();
  }

  presentReceipt() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Successful');
    alert.setMessage('Your room has been booked and is ready for use.'),
      alert.addButton('OK');
    alert.present();
  }

  pickDate() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Date');
    alert.addInput({
      type: 'radio',
      label: '14th May 2018',
      value: '14th May 2018',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '15th May 2018',
      value: '15th May 2018',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '16th May 2018',
      value: '16th May 2018',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '17th May 2018',
      value: '17th May 2018',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '18th May 2018',
      value: '18th May 2018',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: '19th May 2018',
      value: '19th May 2018',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(data != null) {
          this.date = data;
        }
      }
    });
    alert.present();
  }

  showTimeRadioAlert(index: number) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Block period');
    this.blocks.forEach(block => {
      alert.addInput({
        type: 'radio',
        label: block,
        value: block,
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

  ionViewWillEnter() { this.clicked = null; }
  activateFilter() { this.clicked = !this.clicked; }

}
