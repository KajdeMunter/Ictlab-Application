import { LessonModel } from "./lesson";

export class DayModel {

  private weekDay: number;
  private lessons: LessonModel[];

  constructor(lessons: LessonModel[]) {
    this.weekDay = lessons[0]['weekDay'];
    this.lessons = lessons.sort((a, b) => a.getStartBlock() < b.getStartBlock() ? -1 : a.getStartBlock() > b.getStartBlock() ? 1 : 0);
  }
}

