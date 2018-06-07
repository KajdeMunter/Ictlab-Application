export class RoomModel {

  private id: string;
  private tag: string;
  private timeStart: any; 
  private timeEnd: any;   

  constructor(res) {
    this.id = res['id'];
    this.tag = res['id'].replace(/\./g,'').substring(0, res['id'].length - 5);
    this.timeStart = res['timeStart'];
    this.timeEnd = res['timeEnd'];
  }

  getId(): string { return this.id; }
  getTimeStart(): string { return this.timeStart; }
  getTimeEnd(): string { return this.timeEnd; }

}

