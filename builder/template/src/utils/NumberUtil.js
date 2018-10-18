/**
 * [floatReg description]
 * @param  {[type]} value      [description] //输入的值
 * @param  {[type]} numLen     [description] //整数位长度
 * @param  {[type]} floLen     [description] //小数位长度
 * @param  {[type]} maxVal     [description] //最大值
 * @param  {[type]} toFixedLen [description] //保留几位小数
 * @return {[type]}            [description]
 */
export function floatReg(value, numLen, floLen, maxVal, toFixedLen) {
  let flag = true;
  if (!isNaN(value)) {
    if (value <= maxVal) {
      if (value.indexOf('.') > -1) {
        const a = value.split('.');
        if (a[0] && a[0].length > numLen) { flag = false; }
        if (a[1] && a[1].length > floLen) { flag = false; }
      } else {
        const _value = Number(value).toFixed(toFixedLen);
        if (_value.split('.')[0] && _value.split('.')[0].length > numLen) { flag = false; }
        if (_value.split('.')[1] && _value.split('.')[1].length > floLen) { flag = false; }
      }
    } else {
      flag = false;
    }
  }
  return flag;
}
