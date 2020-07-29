let startDate = new Date('2020/7/18 23:55:20');
console.log('startDate: ', startDate);
let startTime = startDate.getTime();
let timer = null;

function countTime() {
  let currDate = new Date();
  let currTime = currDate.getTime();
  console.log('currDate: ', currDate);
  let addZero = (n) => {
    return n < 10 ? '0' + n : n + '';
  };
  let diff = startTime - currTime;
  console.log('currTime: ', currTime);
  console.log('startTime: ', startTime);
  console.log('diff: ', diff);
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (diff >= 0) {
    d = Math.floor(diff / 1000 / 60 / 60 / 24);
    h = Math.floor(diff / 1000 / 60 / 60 % 24);
    m = Math.floor(diff / 1000 / 60 % 60);
    s = Math.floor(diff / 1000 % 60);
    if (!timer) {
      timer = setInterval(function() {
        countTime();
      }, 1000);
    }
    console.log(addZero(d), addZero(h), addZero(m), addZero(s));
  } else {
    console.log('clear time');
    clearInterval(timer);
  }
}

countTime();
