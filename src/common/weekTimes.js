import moment, { duration } from 'moment';
const weeks = ['一','二','三','四','五','六','天','一','二','三','四','五','六','天']
let nowWeekDays = []
const during = 1800000;
let startTime = '';
for(let i = 0; i < 14; i++) {
    startTime = new Date(moment().day(i+1).format('YYYY-MM-DD 10:00:00')).getTime();
    nowWeekDays[i] = {
        'day': moment().day(i+1).format('YYYY-MM-DD'),
        'week':`星期${weeks[i]}`,
        'times': [] 
    };
    for(let j=0;j< 18;j++) {
        nowWeekDays[i]['times'][j] = {'used': false,'time': startTime + during * j} 
    }
}


export default nowWeekDays
