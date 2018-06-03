export class LessonModel {

  private id: string;
  private week;
  private weekDay;
  private startBlock;
  private endBlock;
  private teacher;
  private code;
  private class;
  private room;

  constructor(res) {
    this.id = res['Id'];
    this.class = res['Klas'];
    this.week = res['Week'];
    this.weekDay = res['WeekDay'];
    this.startBlock = res['StartBlock'];
    this.endBlock = res['EndBlock'];
    this.teacher = res['Teacher'];
    this.code = res['CourseCode'];
    this.room = res['Room'];
  }

  getId() { return this.id}
  getClass() { return this.class }
  getWeek() { return this.week }
  getWeekDay() { return this.weekDay }
  getStartBlock() { return this.startBlock }
  getEndBlock() { return this.endBlock }
  getTeacher() { return this.teacher}
  getCode() { return this.code }
  getRoom() { return this.room }

}

