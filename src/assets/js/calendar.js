function isDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]';
}

export function addZero(num) {
  return num < 10 ? '0' + num : num;
}

function getMonthDatas(year, month) {
  let prevYear = year;
  let prevMonth = month - 1;
  let nextYear = year;
  let nextMonth = month + 1;

  if (month === 0) {
    prevYear--;
    prevMonth = 11;
  } else if (month === 11) {
    nextYear++;
    nextMonth = 0;
  }

  let firstDay = new Date(year, month, 1).getDay(); // 这个月第一天是星期几
  let daysInPrevMonth = new Date(year, month, 0).getDate(); // 上月多少天
  let daysInCurrMonth = new Date(nextYear, nextMonth, 0).getDate(); // 这个月多少天
  let currentMonthData = [];

  for (let i = firstDay; i > 0; i--) {
    let date = daysInPrevMonth - i + 1;
    currentMonthData.push({
      year: prevYear,
      month: addZero(prevMonth),
      date: addZero(date),
      text: date,
    });
  }
  currentMonthData.push({
    year: year,
    month: addZero(month),
    date: '01',
    text: `${month + 1}月`,
  });
  for (let i = 2; i <= daysInCurrMonth; i++) {
    currentMonthData.push({
      year: year,
      month: addZero(month),
      date: addZero(i),
      text: i,
    });
  }
  let diffDays = 42 - currentMonthData.length;
  if (diffDays > 0) {
    currentMonthData.push({
      year: nextYear,
      month: addZero(nextMonth),
      date: '01',
      text: `${nextMonth + 1}月`,
    });
    for (let i = 2, len = i + diffDays - 1; i < len; i++) {
      currentMonthData.push({
        year: nextYear,
        month: addZero(nextMonth),
        date: addZero(i),
        text: i,
      });
    }
  }
  return currentMonthData;
}

export default function getThreeMonthDates(currentDate) {
  currentDate = isDate(currentDate) ? currentDate : new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let prevYear = year;
  let prevMonth = month - 1;
  let nextYear = year;
  let nextMonth = month + 1;
  if (month === 0) {
    prevYear--;
    prevMonth = 11;
  } else if (month === 11) {
    nextYear++;
    nextMonth = 0;
  }
  let ret = [
    getMonthDatas(prevYear, prevMonth),
    getMonthDatas(year, month),
    getMonthDatas(nextYear, nextMonth),
  ];
  console.log('getThreeMonthDates ret: ', ret);
  return ret;
}
