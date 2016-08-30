export function getTime(timeStamp) {
  let date = new Date(timeStamp);

  return date.getFullYear() + '-' + parseInt(date.getMonth() + 1, 10) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes();
}

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
