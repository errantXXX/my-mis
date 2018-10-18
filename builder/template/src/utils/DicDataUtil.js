const DicDataUtil = module.exports = {}

DicDataUtil.getCodeOrValue = (arr, x) => {
  let value;
  if (Array.isArray(arr)) {
    arr.forEach((i) => {
      if (i.code === x || i.name === x || i.code === `${x}`) {
        value = i.code === x ? i.name || i.value : i.code;
      }
    })
  }
  return value;
}



