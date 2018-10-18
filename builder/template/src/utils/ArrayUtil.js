
/**
 * [compareArr description]
 * 数组去重并合并
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 */
export function concatNoRepeats(arr1, arr2, property) {
  let arr = [];
  const obj = {};
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    arr = arr1.concat(arr2);
    if (Array.isArray(arr) && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const pp = arr[i][property];
        if (!obj[pp]) {
          obj[pp] = arr[i];
        }
      }
    }
  }

  arr = [];
  for (const pro in obj) {
    arr.push(obj[pro]);
  }

  return arr;
}
