import { NgModule } from '@angular/core';
import { DayPipe } from './day/day';
import { TimePipe } from './time/time';
@NgModule({
	declarations: [DayPipe,
    TimePipe],
	imports: [],
	exports: [DayPipe,
    TimePipe]
})
export class PipesModule {}
