import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentPage } from './incident';

@NgModule({
  declarations: [
    IncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(IncidentPage),
  ],
})
export class IncidentPageModule {}
