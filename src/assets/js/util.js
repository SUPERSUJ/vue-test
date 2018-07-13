const DOWNLINEREG = /_([a-zA-Z])/g;

export default {
  // 深复制
  deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let tmp = obj.constructor();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        tmp[key] = this.deepCopy(obj[key]);
      }
    }

    return tmp;
  },

  // 格式化日期
  formatDate(date, fmt) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },

  // 字符串左边添加零
  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  },

  // 获取类型
  getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },

  // 判断类型
  isType(obj, type) {
    if (this.getType(type) !== 'string') {
      throw new Error('type param must be string in util.js');
    }

    return this.getType(obj) === type;
  },

  // 对象属性转为驼峰
  transformKeyHump(obj) {
    let newObj = {};

    Object.keys(obj).forEach(key => {
      let newKey = key.replace(DOWNLINEREG, ($0, $1) => $1.toUpperCase());
      newObj[newKey] = obj[key];
    });

    return newObj;
  },

  // 从旧对象获取相应的属性值，组成新对象
  getNewObj(keyArr, obj) {
    if (!this.isType(keyArr, 'array')) {
      throw new Error('keyArr param must be Object in util.js');
    }

    if (!this.isType(obj, 'object') || obj === null) {
      throw new Error('obj param must be Object in util.js');
    }

    let objOfHump = this.transformKeyHump(obj);
    let newObj = {};

    keyArr.forEach((key) => {
      if (objOfHump.hasOwnProperty(key)) {
        newObj[key] = objOfHump[key];
      }
    });

    return newObj;
  },

  // 快速清空数组
  emptyArr(arr) {
    while (arr.length) {
      arr.pop();
    }
  },

  // 判断是否是整数
  isInteger(num) {
    return num % 1 === 0;
  },

  // 修复toFixed
  toFixed(value, exp = 2) {
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math.round(value);
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  },

  // 是否相等
  isEqual(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0, len = aProps.length; i < len; i++) {
      let propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  },
};

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
