/**
 * @Author JohnLi
 * @Date 2018/3/6 19:26
 */

function extend() {
  var target = arguments[0] || {},
    deep = false,
    length = arguments.length,
    i = 1,
    options;
  if (typeof arguments[0] === 'boolean') {
    deep = arguments[0];
    target = arguments[1] || {};
    i = 2;
  }
  for (; i < length; i++) {
    options = arguments[i];
    if (deep) {
      for (var key in options) {
        if (isObject(options[key])) {
          target[key] = target[key] || {};
          extend(deep, target[key], options[key]);
        } else {
          target[key] = options[key];
        }
      }
    } else {
      Object.assign(target, options);
    }
  }

  return target;
}

function isObject(obj) {
  return typeof obj === 'boject' && !!obj;
}

exports = module.exports = {
  isObject: isObject,
  extend: extend
};
