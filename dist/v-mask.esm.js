var format = function (data, mask) {
  if (!mask) return data;

  var maskStartRegExp = /^([^#ANX]+)/;

  if (data.length == 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  var text = '';

  var cOffset = 0;

  for (var i = 0; i < mask.length; i++) {
    var m = mask.charAt(i);
    switch (m) {
      case '#':
        break;
      case 'A':
        break;
      case '?':
        break;
      case 'N':
        break;
      case 'X':
        break;
      default:
        data = data.replace(m, '');
    }
  }
  for (var _i = 0, x = 1; x && _i < mask.length; ++_i) {
    var c = data.charAt(_i - cOffset);
    var _m = mask.charAt(_i);

    switch (_m) {
      case '#':
        if (/\d/.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;
      case 'A':
        if (/[a-z]/i.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;
      case 'N':
        if (/[a-z0-9]/i.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;

      case '?':
        cOffset++;break;
      case 'X':
        text += c;break;
      default:
        text += _m;

        if (c && c !== _m) {
          data = ' ' + data;
        }

        break;
    }
  }
  return text;
};

var trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var value = el.value;
  var previousValue = void 0;
  var mask = void 0;

  previousValue = el.getAttribute('data-previous-value') || '';
  mask = el.getAttribute('data-mask');

  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = format(value, mask);
    trigger(el, 'input');
  }

  el.setAttribute('data-previous-value', value);
}

function updateMask(el, mask) {
  el.setAttribute('data-mask', mask);
}

var index = function (Vue) {
  Vue.directive('mask', {
    bind: function bind(el, _ref) {
      var value = _ref.value;

      updateMask(el, value);
      updateValue(el);
    },
    componentUpdated: function componentUpdated(el, _ref2) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;


      var isMaskChanged = value !== oldValue;

      if (isMaskChanged) {
        updateMask(el, value);
      }

      updateValue(el, isMaskChanged);
    }
  });
};

export default index;
