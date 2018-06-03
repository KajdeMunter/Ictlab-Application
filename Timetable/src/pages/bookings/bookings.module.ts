import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingsPage } from './bookings';

@NgModule({
  declarations: [
    BookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingsPage),
  ],
})
export class BookingsPageModule {}
