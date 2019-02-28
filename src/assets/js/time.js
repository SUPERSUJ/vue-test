// 获取当月第一天是星期几
export function getFirstDayOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth()).getDay(); // 几号参数没有添加就是1
}


// 获取某年某月有多少天 month:1就是一月
export function getDayNumOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
