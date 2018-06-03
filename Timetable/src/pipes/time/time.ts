import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  private blocks = ['08.30', '09.20', '10.30', '11.20', '12.10', '13.00', '13.50', '15.00', '15.50', '17.00', '17.50', '18.40', '19.30', '20.20', '21.10'];

  transform(value: number, ...args) {
    let newValue;
    newValue = this.blocks[value - 1];

    return newValue;
  }
}
