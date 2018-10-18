const BaseUtils = {};

BaseUtils.parseIntForArray = (srcArray) => {
  return srcArray.map((item) => parseInt(item))
}

export default BaseUtils;
