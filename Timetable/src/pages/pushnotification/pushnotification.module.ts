import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PushnotificationPage } from './pushnotification';

@NgModule({
  declarations: [
    PushnotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PushnotificationPage),
  ],
})
export class PushnotificationPageModule {}
