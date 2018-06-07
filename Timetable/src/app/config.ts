//Strings
export const webClientId: string = '303796026665-lpn5j56iobj5o43th969jgea2vhnc8a4.apps.googleusercontent.com';


//Translations
export const loading: string = 'Please wait...';
export const logout: string = 'Logging out...';
export const oops_title: string = 'Oops!';
export const oops_message: string = 'Something went wrong with loading your schedule. Please try again!';

export const blocks = ['08.30', '09.20', '10.30', '11.20', '12.10', '13.00', '13.50', '15.00', '15.50', '17.00', '17.50', '18.40', '19.30', '20.20', '21.10'];
export const dates = [
  { date: '28-05-2018', value: '22', c: false },
  { date: '04-06-2018', value: '23', c: true },
  { date: '11-06-2018', value: '24', c: false },
  { date: '18-06-2018', value: '25', c: false },
  { date: '25-06-2018', value: '26', c: false },
  { date: '02-07-2018', value: '27', c: false }
];

export const schedules = [
  { variant: 'Classes', value: 'classes', c: true },
  { variant: 'Rooms', value: 'rooms', c: false },
]

export const classes = [
  { variant: 'INF1J', c: false },
  { variant: 'INF3A', c: true },
  { variant: 'INF3B', c: false },
  { variant: 'INF3C', c: false },
]

export const baseApiString: string = 'http://acceptancetimetable2api.azurewebsites.net/api/';
export const classScheduleString: string = 'Schedule/Class/';