var timer = null;
// 时间日期
export function getTime(timeStamp) {
  if (!timeStamp) return '---';
  let date = new Date(timeStamp);

  return date.getFullYear() + '-' + parseInt(date.getMonth() + 1, 10) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes();
}
// 距离现在多久
export function getTimeLeft(timeStamp) {
  let date = new Date().getTime() - timeStamp;
  let dateTmp = '';
  if (date <= 5 * 60 * 1000) { // 5分钟以内
    dateTmp = '刚刚';
  } else if (date <= 60 * 60 * 1000) { // 1小时以内
    dateTmp = Math.floor(date / (60 * 1000)) + '分钟之前';
  } else if (date <= 24 * 60 * 60 * 1000) { // 1天以内
    dateTmp = Math.floor(date / (60 * 60 * 1000)) + '小时之前';
  } else if (date <= 30 * 24 * 60 * 60 * 1000) { // 1个月以内
    dateTmp = Math.floor(date / (24 * 60 * 60 * 1000)) + '天之前';
  } else if (date <= 365 * 24 * 60 * 60 * 1000) { // 一年以内
    dateTmp = Math.floor(date / (30 * 24 * 60 * 60 * 1000)) + '个月之前';
  } else {
    dateTmp = '太久太久了';
  }
  return dateTmp;
}
// 判断是否是数组
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
// 产生随机数 例如，生成0-9的随机数(包括0和9) random(0,9)
export function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

/* eslint-disable prefer-rest-params */
/*
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn {function}  需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */

const throttle = function(fn, delay, immediate, debounce) {
  var curr = +new Date(); // 当前事件
  var lastCall = 0;
  var lastExec = 0;
  // timer = null,
  var diff; // 时间差
  var context; // 上下文
  var args;
  var exec = function() {
    lastExec = curr;
    fn.apply(context, args);
  };
  return (function() {
    curr = +new Date();
    context = this;
    args = arguments;
    diff = curr - (debounce ? lastCall : lastExec) - delay;
    clearTimeout(timer);
    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (immediate) {
        timer = setTimeout(exec, -diff);
      }
    }
    lastCall = curr;
  }());
};

/*
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @param fn {function}  要调用的函数
 * @param delay   {number}    空闲时间
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */

const debounce = function(fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
};

export {
  debounce,
  throttle
};
// el:获取的元素，selector：元素id或者class的字符串
export function closest(el, selector) {
  let elTmp = el;
  const matchesSelector = elTmp.matches ||
                          elTmp.webkitMatchesSelector ||
                          elTmp.mozMatchesSelector ||
                          elTmp.msMatchesSelector;
  while (elTmp) {
    if (matchesSelector.call(elTmp, selector)) {
      return elTmp;
    }
    elTmp = elTmp.parentElement;
  }
  return null;
}
