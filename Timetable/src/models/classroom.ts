export class ClassroomModel {

  private id: string;
  private capacity: number;
  private maintenance: number;


  constructor(res) {
    this.id = res['RoomId'];
    this.capacity = res['Capacity'];
    this.maintenance = res ['Maintenance'];
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

