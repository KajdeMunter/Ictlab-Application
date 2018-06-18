export class ClassroomModel {

  private id: string;
  private capacity: number;
  private maintenance: number;
  private freeUntill: number;


  constructor(res) {
    this.id = res['RoomId'];
    this.capacity = res['Capacity'];
    this.maintenance = res['Maintenance'];
    if (res['FreeUntill']) {
      this.freeUntill = res['FreeUntill']
    } else { this.freeUntill = null }

  }

  getId() {
    return this.id;
  }

  getCapacity() {
    return this.capacity;
  }

  getMaintenance() {
    return this.maintenance;
  }
}

