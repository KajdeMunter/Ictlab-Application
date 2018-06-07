import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: string, ...args) {
    let newValue;
    if(value == '1') newValue = 'Monday';
    if(value == '2') newValue = 'Tuesday';
    if(value == '3') newValue = 'Wednesday';
    if(value == '4') newValue = 'Thursday';
    if(value == '5') newValue = 'Friday';
    return newValue;
  }
}
