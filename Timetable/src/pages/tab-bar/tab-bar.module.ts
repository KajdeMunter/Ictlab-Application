import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabBarPage } from './tab-bar';

@NgModule({
  declarations: [
    TabBarPage,
  ],
  imports: [
    IonicPageModule.forChild(TabBarPage),
  ],
})
export class TabBarPageModule {}
