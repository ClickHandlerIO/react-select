require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function blacklist (src) {
  var copy = {}, filter = arguments[1]

  if (typeof filter === 'string') {
    filter = {}
    for (var i = 1; i < arguments.length; i++) {
      filter[arguments[i]] = true
    }
  }

  for (var key in src) {
    // blacklist?
    if (filter[key]) continue

    copy[key] = src[key]
  }

  return copy
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

if (!_tether2['default']) {
  console.error('It looks like Tether has not been included. Please load this dependency first https://github.com/HubSpot/tether');
}

var renderElementToPropTypes = [_react.PropTypes.string, _react.PropTypes.shape({
  appendChild: _react.PropTypes.func.isRequired
})];

var childrenPropType = function childrenPropType(_ref, propName, componentName) {
  var children = _ref.children;

  var childCount = _react.Children.count(children);
  if (childCount <= 0) {
    return new Error(componentName + ' expects at least one child to use as the target element.');
  } else if (childCount > 2) {
    return new Error('Only a max of two children allowed in ' + componentName + '.');
  }
};

var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

var TetherComponent = (function (_Component) {
  _inherits(TetherComponent, _Component);

  function TetherComponent() {
    _classCallCheck(this, TetherComponent);

    _get(Object.getPrototypeOf(TetherComponent.prototype), 'constructor', this).apply(this, arguments);

    this._targetNode = null;
    this._elementParentNode = null;
    this._tether = false;
  }

  _createClass(TetherComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._targetNode = _reactDom2['default'].findDOMNode(this);
      this._update();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this._update();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroy();
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._tether.disable();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._tether.enable();
    }
  }, {
    key: 'position',
    value: function position() {
      this._tether.position();
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      if (this._elementParentNode) {
        _reactDom2['default'].unmountComponentAtNode(this._elementParentNode);
        this._elementParentNode.parentNode.removeChild(this._elementParentNode);
      }

      if (this._tether) {
        this._tether.destroy();
      }

      this._elementParentNode = null;
      this._tether = null;
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this = this;

      var _props = this.props;
      var children = _props.children;
      var renderElementTag = _props.renderElementTag;

      var elementComponent = _react.Children.toArray(children)[1];

      // if no element component provided, bail out
      if (!elementComponent) {
        // destroy Tether element if it has been created
        if (this._tether) {
          this._destroy();
        }
        return;
      }

      // create element node container if it hasn't been yet
      if (!this._elementParentNode) {
        // create a node that we can stick our content Component in
        this._elementParentNode = document.createElement(renderElementTag);

        // append node to the render node
        this._renderNode.appendChild(this._elementParentNode);
      }

      // render element component into the DOM
      _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
        // don't update Tether until the subtree has finished rendering
        _this._updateTether();
      });
    }
  }, {
    key: '_updateTether',
    value: function _updateTether() {
      var _this2 = this;

      var _props2 = this.props;
      var children = _props2.children;
      var renderElementTag = _props2.renderElementTag;
      var renderElementTo = _props2.renderElementTo;
      var id = _props2.id;
      var className = _props2.className;
      var style = _props2.style;

      var options = _objectWithoutProperties(_props2, ['children', 'renderElementTag', 'renderElementTo', 'id', 'className', 'style']);

      var tetherOptions = _extends({
        target: this._targetNode,
        element: this._elementParentNode
      }, options);

      if (id) {
        this._elementParentNode.id = id;
      }

      if (className) {
        this._elementParentNode.className = className;
      }

      if (style) {
        Object.keys(style).forEach(function (key) {
          _this2._elementParentNode.style[key] = style[key];
        });
      }

      if (!this._tether) {
        this._tether = new _tether2['default'](tetherOptions);
      } else {
        this._tether.setOptions(tetherOptions);
      }

      this._tether.position();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.toArray(this.props.children)[0];
    }
  }, {
    key: '_renderNode',
    get: function get() {
      var renderElementTo = this.props.renderElementTo;

      if (typeof renderElementTo === 'string') {
        return document.querySelector(renderElementTo);
      } else {
        return renderElementTo || document.body;
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      renderElementTag: _react.PropTypes.string,
      renderElementTo: _react.PropTypes.oneOfType(renderElementToPropTypes),
      attachment: _react.PropTypes.oneOf(attachmentPositions).isRequired,
      targetAttachment: _react.PropTypes.oneOf(attachmentPositions),
      offset: _react.PropTypes.string,
      targetOffset: _react.PropTypes.string,
      targetModifier: _react.PropTypes.string,
      enabled: _react.PropTypes.bool,
      classes: _react.PropTypes.object,
      classPrefix: _react.PropTypes.string,
      optimizations: _react.PropTypes.object,
      constraints: _react.PropTypes.array,
      id: _react.PropTypes.string,
      className: _react.PropTypes.string,
      style: _react.PropTypes.object,
      children: childrenPropType
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      renderElementTag: 'div',
      renderElementTo: null
    },
    enumerable: true
  }]);

  return TetherComponent;
})(_react.Component);

exports['default'] = TetherComponent;
module.exports = exports['default'];
},{"react":undefined,"react-dom":undefined,"tether":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _TetherComponent = require('./TetherComponent');

var _TetherComponent2 = _interopRequireDefault(_TetherComponent);

exports['default'] = _TetherComponent2['default'];
module.exports = exports['default'];
},{"./TetherComponent":2}],4:[function(require,module,exports){
/*! tether 1.3.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(document.body);
  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = {};

    var rect = node.getBoundingClientRect();
    for (var k in rect) {
      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
      zeroPosCache[id][k] = rect[k];
    }

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = {};
  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = el.getBoundingClientRect();
  for (var k in rect) {
    box[k] = rect[k];
  }

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

function getScrollBarSize() {
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  return { width: width, height: width };
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  if (el.className instanceof SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== document) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var scrollbarSize = undefined;
      if (document.body.scrollWidth > window.innerWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (document.body.scrollHeight > window.innerHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = document.body.scrollHeight - top - height;
        next.page.right = document.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        var offsetParentIsBody = true;
        var currentNode = this.element.parentNode;
        while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
          if (getComputedStyle(currentNode).position !== 'static') {
            offsetParentIsBody = false;
            break;
          }

          currentNode = currentNode.parentNode;
        }

        if (!offsetParentIsBody) {
          this.element.parentNode.removeChild(this.element);
          document.body.appendChild(this.element);
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

},{}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var requestId = 0;

function initCache(cache) {
	if (cache && typeof cache !== 'object') {
		cache = {};
	}
	return cache ? cache : null;
}

function updateCache(cache, input, data) {
	if (!cache) return;
	cache[input] = data;
}

function getFromCache(cache, input) {
	if (!cache) return;
	for (var i = input.length; i >= 0; --i) {
		var cacheKey = input.slice(0, i);
		if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
			return cache[cacheKey];
		}
	}
}

function thenPromise(promise, callback) {
	if (!promise || typeof promise.then !== 'function') return;
	return promise.then(function (data) {
		callback(null, data);
	}, function (err) {
		callback(err);
	});
}

var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

var Async = _react2['default'].createClass({
	displayName: 'Async',

	propTypes: {
		cache: _react2['default'].PropTypes.any, // object to use to cache results, can be null to disable cache
		ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering (shared with Select)
		ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering (shared with Select)
		isLoading: _react2['default'].PropTypes.bool, // overrides the isLoading state when set to true
		loadOptions: _react2['default'].PropTypes.func.isRequired, // function to call to load options asynchronously
		loadingPlaceholder: _react2['default'].PropTypes.string, // replaces the placeholder while options are loading
		minimumInput: _react2['default'].PropTypes.number, // the minimum number of characters that trigger loadOptions
		noResultsText: stringOrNode, // placeholder displayed when there are no matching search results (shared with Select)
		onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
		placeholder: stringOrNode, // field placeholder, displayed when there's no value (shared with Select)
		searchPromptText: stringOrNode, // label to prompt for search input
		searchingText: _react2['default'].PropTypes.string },
	// message to display while options are loading
	getDefaultProps: function getDefaultProps() {
		return {
			cache: true,
			ignoreAccents: true,
			ignoreCase: true,
			loadingPlaceholder: 'Loading...',
			minimumInput: 0,
			searchingText: 'Searching...',
			searchPromptText: 'Type to search'
		};
	},
	getInitialState: function getInitialState() {
		return {
			cache: initCache(this.props.cache),
			isLoading: false,
			options: []
		};
	},
	componentWillMount: function componentWillMount() {
		this._lastInput = '';
	},
	componentDidMount: function componentDidMount() {
		this.loadOptions('');
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.cache !== this.props.cache) {
			this.setState({
				cache: initCache(nextProps.cache)
			});
		}
	},
	focus: function focus() {
		this.refs.select.focus();
	},
	resetState: function resetState() {
		this._currentRequestId = -1;
		this.setState({
			isLoading: false,
			options: []
		});
	},
	getResponseHandler: function getResponseHandler(input) {
		var _this = this;

		var _requestId = this._currentRequestId = requestId++;
		return function (err, data) {
			if (err) throw err;
			if (!_this.isMounted()) return;
			updateCache(_this.state.cache, input, data);
			if (_requestId !== _this._currentRequestId) return;
			_this.setState({
				isLoading: false,
				options: data && data.options || []
			});
		};
	},
	loadOptions: function loadOptions(input) {
		if (this.props.onInputChange) {
			var nextState = this.props.onInputChange(input);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null) {
				input = '' + nextState;
			}
		}
		if (this.props.ignoreAccents) input = (0, _utilsStripDiacritics2['default'])(input);
		if (this.props.ignoreCase) input = input.toLowerCase();

		this._lastInput = input;
		if (input.length < this.props.minimumInput) {
			return this.resetState();
		}
		var cacheResult = getFromCache(this.state.cache, input);
		if (cacheResult) {
			return this.setState({
				options: cacheResult.options
			});
		}
		this.setState({
			isLoading: true
		});
		var responseHandler = this.getResponseHandler(input);
		var inputPromise = thenPromise(this.props.loadOptions(input, responseHandler), responseHandler);
		return inputPromise ? inputPromise.then(function () {
			return input;
		}) : input;
	},
	onOpen: function onOpen() {
		this.loadOptions('');
	},
	render: function render() {
		var noResultsText = this.props.noResultsText;
		var _state = this.state;
		var isLoading = _state.isLoading;
		var options = _state.options;

		if (this.props.isLoading) isLoading = true;
		var placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
		if (isLoading) {
			noResultsText = this.props.searchingText;
		} else if (!options.length && this._lastInput.length < this.props.minimumInput) {
			noResultsText = this.props.searchPromptText;
		}
		return _react2['default'].createElement(_Select2['default'], _extends({}, this.props, {
			ref: 'select',
			isLoading: isLoading,
			noResultsText: noResultsText,
			onInputChange: this.loadOptions,
			options: options,
			onOpen: this.onOpen,
			placeholder: placeholder
		}));
	}
});

module.exports = Async;

},{"./Select":"react-select","./utils/stripDiacritics":8,"react":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Option = _react2['default'].createClass({
	displayName: 'Option',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string, // className (based on mouse position)
		instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
		isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
		isFocused: _react2['default'].PropTypes.bool, // the option is focused
		isSelected: _react2['default'].PropTypes.bool, // the option is selected
		onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
		onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
		onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
		option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
		optionIndex: _react2['default'].PropTypes.number },
	// index of the option, used to generate unique ids for aria
	blockEvent: function blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},

	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},

	handleMouseEnter: function handleMouseEnter(event) {
		this.onFocus(event);
	},

	handleMouseMove: function handleMouseMove(event) {
		this.onFocus(event);
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	onFocus: function onFocus(event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	},
	render: function render() {
		var _props = this.props;
		var option = _props.option;
		var instancePrefix = _props.instancePrefix;
		var optionIndex = _props.optionIndex;

		var className = (0, _classnames2['default'])(this.props.className, option.className);

		return option.disabled ? _react2['default'].createElement(
			'div',
			{ className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			this.props.children
		) : _react2['default'].createElement(
			'div',
			{ className: className,
				style: option.style,
				role: 'option',
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				id: instancePrefix + '-option-' + optionIndex,
				title: option.title },
			this.props.children
		);
	}
});

module.exports = Option;

},{"classnames":undefined,"react":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Value = _react2['default'].createClass({

	displayName: 'Value',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
		id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
		onClick: _react2['default'].PropTypes.func, // method to handle click on value label
		onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
		value: _react2['default'].PropTypes.object.isRequired },

	// the option object for this value
	handleMouseDown: function handleMouseDown(event) {
		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(this.props.value, event);
			return;
		}
		if (this.props.value.href) {
			event.stopPropagation();
		}
	},

	onRemove: function onRemove(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	handleTouchEndRemove: function handleTouchEndRemove(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	renderRemoveIcon: function renderRemoveIcon() {
		if (this.props.disabled || !this.props.onRemove) return;
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-value-icon',
				'aria-hidden': 'true',
				onMouseDown: this.onRemove,
				onTouchEnd: this.handleTouchEndRemove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove },
			'×'
		);
	},

	renderLabel: function renderLabel() {
		var className = 'Select-value-label';
		return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
			'a',
			{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
			this.props.children
		) : _react2['default'].createElement(
			'span',
			{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
			this.props.children
		);
	},

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
				style: this.props.value.style,
				title: this.props.value.title
			},
			this.renderRemoveIcon(),
			this.renderLabel()
		);
	}

});

module.exports = Value;

},{"classnames":undefined,"react":undefined}],8:[function(require,module,exports){
'use strict';

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

module.exports = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

},{}],"react-select":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = require("react-input-autosize");

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _reactTether = require("react-tether");

var _reactTether2 = _interopRequireDefault(_reactTether);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _blacklist = require("blacklist");

var _blacklist2 = _interopRequireDefault(_blacklist);

var _utilsStripDiacritics = require("./utils/stripDiacritics");

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var _Async = require("./Async");

var _Async2 = _interopRequireDefault(_Async);

var _Option = require("./Option");

var _Option2 = _interopRequireDefault(_Option);

var _Value = require("./Value");

var _Value2 = _interopRequireDefault(_Value);

function stringifyValue(value) {
    if (typeof value === 'object') {
        return JSON.stringify(value);
    } else {
        return value;
    }
}

var stringOrNode = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.node]);

var instanceId = 1;

var Select = _react2["default"].createClass({

    displayName: 'Select',

    propTypes: {
        addLabelText: _react2["default"].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
        allowCreate: _react2["default"].PropTypes.bool, // whether to allow creation of new entries
        'aria-label': _react2["default"].PropTypes.string, // Aria label (for assistive tech)
        'aria-labelledby': _react2["default"].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
        autoBlur: _react2["default"].PropTypes.bool, // automatically blur the component when an option is selected
        autofocus: _react2["default"].PropTypes.bool, // autofocus the component on mount
        autosize: _react2["default"].PropTypes.bool, // whether to enable autosizing or not
        backspaceRemoves: _react2["default"].PropTypes.bool, // whether backspace removes an item if there is no text input
        backspaceToRemoveMessage: _react2["default"].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item -
        // {label} is replaced with the item label
        className: _react2["default"].PropTypes.string, // className for the outer element
        clearAllText: stringOrNode, // title for the "clear" control when multi: true
        clearValueText: stringOrNode, // title for the "clear" control
        clearable: _react2["default"].PropTypes.bool, // should it be possible to reset value
        delimiter: _react2["default"].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
        disabled: _react2["default"].PropTypes.bool, // whether the Select is disabled or not
        escapeClearsValue: _react2["default"].PropTypes.bool, // whether escape clears the value when the menu is closed
        filterOption: _react2["default"].PropTypes.func, // method to filter a single option (option, filterString)
        filterOptions: _react2["default"].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
        ignoreAccents: _react2["default"].PropTypes.bool, // whether to strip diacritics when filtering
        ignoreCase: _react2["default"].PropTypes.bool, // whether to perform case-insensitive filtering
        inputProps: _react2["default"].PropTypes.object, // custom attributes for the Input
        inputRenderer: _react2["default"].PropTypes.func, // returns a custom input component
        isLoading: _react2["default"].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
        joinValues: _react2["default"].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
        labelKey: _react2["default"].PropTypes.string, // path of the label value in option objects
        matchPos: _react2["default"].PropTypes.string, // (any|start) match the start or entire string when filtering
        matchProp: _react2["default"].PropTypes.string, // (any|label|value) which option property to filter on
        menuBuffer: _react2["default"].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
        menuContainerStyle: _react2["default"].PropTypes.object, // optional style to apply to the menu container
        menuRenderer: _react2["default"].PropTypes.func, // renders a custom menu with options
        menuStyle: _react2["default"].PropTypes.object, // optional style to apply to the menu
        multi: _react2["default"].PropTypes.bool, // multi-value input
        name: _react2["default"].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
        newOptionCreator: _react2["default"].PropTypes.func, // factory to create new options when allowCreate set
        noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
        onBlur: _react2["default"].PropTypes.func, // onBlur handler: function (event) {}
        onBlurResetsInput: _react2["default"].PropTypes.bool, // whether input is cleared on blur
        onChange: _react2["default"].PropTypes.func, // onChange handler: function (newValue) {}
        onClose: _react2["default"].PropTypes.func, // fires when the menu is closed
        onFocus: _react2["default"].PropTypes.func, // onFocus handler: function (event) {}
        onInputChange: _react2["default"].PropTypes.func, // onInputChange handler: function (inputValue) {}
        onMenuScrollToBottom: _react2["default"].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
        onOpen: _react2["default"].PropTypes.func, // fires when the menu is opened
        onValueClick: _react2["default"].PropTypes.func, // onClick handler for value labels: function (value, event) {}
        openAfterFocus: _react2["default"].PropTypes.bool, // boolean to enable opening dropdown when focused
        openOnFocus: _react2["default"].PropTypes.bool, // always open options menu on focus
        optionClassName: _react2["default"].PropTypes.string, // additional class(es) to apply to the <Option /> elements
        optionComponent: _react2["default"].PropTypes.func, // option component to render in dropdown
        optionRenderer: _react2["default"].PropTypes.func, // optionRenderer: function (option) {}
        options: _react2["default"].PropTypes.array, // array of options
        pageSize: _react2["default"].PropTypes.number, // number of entries to page when using page up/down keys
        placeholder: stringOrNode, // field placeholder, displayed when there's no value
        required: _react2["default"].PropTypes.bool, // applies HTML5 required attribute when needed
        resetValue: _react2["default"].PropTypes.any, // value to use when you clear the control
        scrollMenuIntoView: _react2["default"].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
        searchable: _react2["default"].PropTypes.bool, // whether to enable searching feature or not
        simpleValue: _react2["default"].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
        style: _react2["default"].PropTypes.object, // optional style to apply to the control
        tabIndex: _react2["default"].PropTypes.string, // optional tab index of the control
        tabSelectsValue: _react2["default"].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
        value: _react2["default"].PropTypes.any, // initial field value
        valueComponent: _react2["default"].PropTypes.func, // value component to render
        valueKey: _react2["default"].PropTypes.string, // path of the label value in option objects
        valueRenderer: _react2["default"].PropTypes.func, // valueRenderer: function (option) {}
        wrapperStyle: _react2["default"].PropTypes.object },

    // optional style to apply to the component wrapper
    statics: { Async: _Async2["default"] },

    getDefaultProps: function getDefaultProps() {
        return {
            addLabelText: 'Add "{label}"?',
            autosize: true,
            allowCreate: false,
            backspaceRemoves: true,
            backspaceToRemoveMessage: 'Press backspace to remove {label}',
            clearable: true,
            clearAllText: 'Clear all',
            clearValueText: 'Clear value',
            delimiter: ',',
            disabled: false,
            escapeClearsValue: true,
            filterOptions: true,
            ignoreAccents: true,
            ignoreCase: true,
            inputProps: {},
            isLoading: false,
            joinValues: false,
            labelKey: 'label',
            matchPos: 'any',
            matchProp: 'any',
            menuBuffer: 0,
            multi: false,
            noResultsText: 'No results found',
            onBlurResetsInput: true,
            openAfterFocus: false,
            optionComponent: _Option2["default"],
            pageSize: 5,
            placeholder: 'Select...',
            required: false,
            resetValue: null,
            scrollMenuIntoView: true,
            searchable: true,
            simpleValue: false,
            tabSelectsValue: true,
            valueComponent: _Value2["default"],
            valueKey: 'value'
        };
    },

    getInitialState: function getInitialState() {
        return {
            inputValue: '',
            isFocused: false,
            isLoading: false,
            isOpen: false,
            isPseudoFocused: false,
            required: false
        };
    },

    componentWillMount: function componentWillMount() {
        this._instancePrefix = 'react-select-' + ++instanceId + '-';
        var valueArray = this.getValueArray(this.props.value);

        if (this.props.required) {
            this.setState({
                required: this.handleRequired(valueArray[0], this.props.multi)
            });
        }
    },

    componentDidMount: function componentDidMount() {
        if (this.props.autofocus) {
            this.focus();
        }

        window.addEventListener('resize', this.positionMenuContainer, true);
    },

    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.positionMenuContainer);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var valueArray = this.getValueArray(nextProps.value, nextProps);

        if (nextProps.required) {
            this.setState({
                required: this.handleRequired(valueArray[0], nextProps.multi)
            });
        }
    },

    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        if (nextState.isOpen !== this.state.isOpen) {
            var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
            handler && handler();
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        // focus to the selected option
        if (this.refs.menu && this.refs.focused && this.state.isOpen && !this.hasScrolledToOption) {
            var focusedOptionNode = _reactDom2["default"].findDOMNode(this.refs.focused);
            var menuNode = _reactDom2["default"].findDOMNode(this.refs.menu);
            menuNode.scrollTop = focusedOptionNode.offsetTop;
            this.hasScrolledToOption = true;
        } else if (!this.state.isOpen) {
            this.hasScrolledToOption = false;
        }

        if (this._scrollToFocusedOptionOnUpdate && this.refs.focused && this.refs.menu) {
            this._scrollToFocusedOptionOnUpdate = false;
            var focusedDOM = _reactDom2["default"].findDOMNode(this.refs.focused);
            var menuDOM = _reactDom2["default"].findDOMNode(this.refs.menu);
            var focusedRect = focusedDOM.getBoundingClientRect();
            var menuRect = menuDOM.getBoundingClientRect();
            if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
                menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
            }
        }
        if (this.props.scrollMenuIntoView && this.refs.menuContainer) {
            var menuContainerRect = this.refs.menuContainer.getBoundingClientRect();
            if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
                window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
            }
        }
        if (prevProps.disabled !== this.props.disabled) {
            this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
            this.closeMenu();
        }
        this.positionMenuContainer();
    },

    positionMenuContainer: function positionMenuContainer() {
        // Tethered container width
        if (this.state.isOpen) {
            var menuContainerNode = _reactDom2["default"].findDOMNode(this.refs.menuContainer);
            var controlNode = _reactDom2["default"].findDOMNode(this.refs.control);
            menuContainerNode.style.width = controlNode.offsetWidth + "px";
        }
    },

    focus: function focus() {
        if (!this.refs.input) return;
        this.refs.input.focus();

        if (this.props.openAfterFocus) {
            this.setState({
                isOpen: true
            });
        }
    },

    blurInput: function blurInput() {
        if (!this.refs.input) return;
        this.refs.input.blur();
    },

    handleTouchMove: function handleTouchMove(event) {
        // Set a flag that the view is being dragged
        this.dragging = true;
    },

    handleTouchStart: function handleTouchStart(event) {
        // Set a flag that the view is not being dragged
        this.dragging = false;
    },

    handleTouchEnd: function handleTouchEnd(event) {
        // Check if the view is being dragged, In this case
        // we don't want to fire the click event (because the user only wants to scroll)
        if (this.dragging) return;

        // Fire the mouse events
        this.handleMouseDown(event);
    },

    handleTouchEndClearValue: function handleTouchEndClearValue(event) {
        // Check if the view is being dragged, In this case
        // we don't want to fire the click event (because the user only wants to scroll)
        if (this.dragging) return;

        // Clear the value
        this.clearValue(event);
    },

    handleMouseDown: function handleMouseDown(event) {
        // if the event was triggered by a mousedown and not the primary
        // button, or if the component is disabled, ignore it.
        if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
            return;
        }

        if (event.target.tagName === 'INPUT') {
            return;
        }

        // prevent default event handlers
        event.stopPropagation();
        event.preventDefault();

        // for the non-searchable select, toggle the menu
        if (!this.props.searchable) {
            this.focus();
            return this.setState({
                isOpen: !this.state.isOpen
            });
        }

        if (this.state.isFocused) {
            // On iOS, we can get into a state where we think the input is focused but it isn't really,
            // since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
            // Call focus() again here to be safe.
            this.focus();

            // clears value so that the cursor will be a the end of input then the component re-renders
            this.refs.input.getInput().value = '';

            // if the input is focused, ensure the menu is open
            this.setState({
                isOpen: true,
                isPseudoFocused: false
            });
        } else {
            // otherwise, focus the input and open the menu
            this._openAfterFocus = true;
            this.focus();
        }
    },

    handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
        // if the event was triggered by a mousedown and not the primary
        // button, or if the component is disabled, ignore it.
        if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
            return;
        }
        // If the menu isn't open, let the event bubble to the main handleMouseDown
        if (!this.state.isOpen) {
            return;
        }
        // prevent default event handlers
        event.stopPropagation();
        event.preventDefault();
        // close the menu
        this.closeMenu();
    },

    handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
        // if the event was triggered by a mousedown and not the primary
        // button, or if the component is disabled, ignore it.
        if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();

        this._openAfterFocus = true;
        this.focus();
    },

    closeMenu: function closeMenu() {
        this.setState({
            isOpen: false,
            isPseudoFocused: this.state.isFocused && !this.props.multi,
            inputValue: ''
        });
        this.hasScrolledToOption = false;
    },

    handleInputFocus: function handleInputFocus(event) {
        var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        this.setState({
            isFocused: true,
            isOpen: isOpen
        });
        this._openAfterFocus = false;
    },

    handleInputBlur: function handleInputBlur(event) {
        // The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
        if (this.refs.menu && (this.refs.menu === document.activeElement || this.refs.menu.contains(document.activeElement))) {
            this.focus();
            return;
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        var onBlurredState = {
            isFocused: false,
            isOpen: false,
            isPseudoFocused: false
        };
        if (this.props.onBlurResetsInput) {
            onBlurredState.inputValue = '';
        }
        this.setState(onBlurredState);
    },

    handleInputChange: function handleInputChange(event) {
        var newInputValue = event.target.value;
        if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
            var nextState = this.props.onInputChange(newInputValue);
            // Note: != used deliberately here to catch undefined and null
            if (nextState != null && typeof nextState !== 'object') {
                newInputValue = '' + nextState;
            }
        }
        this.setState({
            isOpen: true,
            isPseudoFocused: false,
            inputValue: newInputValue
        });
    },

    handleKeyDown: function handleKeyDown(event) {
        if (this.props.disabled) return;
        switch (event.keyCode) {
            case 8:
                // backspace
                if (!this.state.inputValue && this.props.backspaceRemoves) {
                    event.preventDefault();
                    this.popValue();
                }
                return;
            case 9:
                // tab
                if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
                    return;
                }
                this.selectFocusedOption();
                return;
            case 13:
                // enter
                if (!this.state.isOpen) return;
                event.stopPropagation();
                this.selectFocusedOption();
                break;
            case 27:
                // escape
                if (this.state.isOpen) {
                    this.closeMenu();
                    event.stopPropagation();
                } else if (this.props.clearable && this.props.escapeClearsValue) {
                    this.clearValue(event);
                    event.stopPropagation();
                }
                break;
            case 38:
                // up
                this.focusPreviousOption();
                break;
            case 40:
                // down
                this.focusNextOption();
                break;
            case 33:
                // page up
                this.focusPageUpOption();
                break;
            case 34:
                // page down
                this.focusPageDownOption();
                break;
            case 35:
                // end key
                this.focusEndOption();
                break;
            case 36:
                // home key
                this.focusStartOption();
                break;
            // case 188: // ,
            // 	if (this.props.allowCreate && this.props.multi) {
            // 		event.preventDefault();
            // 		event.stopPropagation();
            // 		this.selectFocusedOption();
            // 	} else {
            // 		return;
            // 	}
            // break;
            default:
                return;
        }
        event.preventDefault();
    },

    handleValueClick: function handleValueClick(option, event) {
        if (!this.props.onValueClick) return;
        this.props.onValueClick(option, event);
    },

    handleMenuScroll: function handleMenuScroll(event) {
        if (!this.props.onMenuScrollToBottom) return;
        var target = event.target;

        if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
            this.props.onMenuScrollToBottom();
        }
    },

    handleRequired: function handleRequired(value, multi) {
        if (!value) return true;
        return multi ? value.length === 0 : Object.keys(value).length === 0;
    },

    getOptionLabel: function getOptionLabel(op) {
        return op[this.props.labelKey];
    },

    /**
     * Turns a value into an array from the given options
     * @param    {String|Number|Array}    value        - the value of the select input
     * @param    {Object}        nextProps    - optionally specify the nextProps so the returned array uses the latest configuration
     * @returns    {Array}    the value of the select represented in an array
     */
    getValueArray: function getValueArray(value, nextProps) {
        var _this = this;

        /** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
        var props = typeof nextProps === 'object' ? nextProps : this.props;
        if (props.multi) {
            if (typeof value === 'string') value = value.split(props.delimiter);
            if (!Array.isArray(value)) {
                if (value === null || value === undefined) return [];
                value = [value];
            }
            return value.map(function (value) {
                return _this.expandValue(value, props);
            }).filter(function (i) {
                return i;
            });
        }
        var expandedValue = this.expandValue(value, props);
        return expandedValue ? [expandedValue] : [];
    },

    /**
     * Retrieve a value from the given options and valueKey
     * @param    {String|Number|Array}    value    - the selected value(s)
     * @param    {Object}        props    - the Select component's props (or nextProps)
     */
    expandValue: function expandValue(value, props) {
        if (typeof value !== 'string' && typeof value !== 'number') return value;
        var options = props.options;
        var valueKey = props.valueKey;

        if (!options) return;
        for (var i = 0; i < options.length; i++) {
            if (options[i][valueKey] === value) return options[i];
        }
    },

    setValue: function setValue(value) {
        var _this2 = this;

        if (this.props.autoBlur) {
            this.blurInput();
        }
        if (!this.props.onChange) return;
        if (this.props.required) {
            var required = this.handleRequired(value, this.props.multi);
            this.setState({ required: required });
        }
        if (this.props.simpleValue && value) {
            value = this.props.multi ? value.map(function (i) {
                return i[_this2.props.valueKey];
            }).join(this.props.delimiter) : value[this.props.valueKey];
        }
        this.props.onChange(value);
    },

    selectValue: function selectValue(value) {
        var _this3 = this;

        //NOTE: update value in the callback to make sure the input value is empty so that there are no sttyling issues (Chrome had issue otherwise)
        this.hasScrolledToOption = false;
        if (this.props.multi) {
            this.setState({
                inputValue: '',
                focusedIndex: null
            }, function () {
                _this3.addValue(value);
            });
        } else {
            this.setState({
                isOpen: false,
                inputValue: '',
                isPseudoFocused: this.state.isFocused
            }, function () {
                _this3.setValue(value);
            });
        }
    },

    addValue: function addValue(value) {
        var valueArray = this.getValueArray(this.props.value);
        this.setValue(valueArray.concat(value));
    },

    popValue: function popValue() {
        var valueArray = this.getValueArray(this.props.value);
        if (!valueArray.length) return;
        if (valueArray[valueArray.length - 1].clearableValue === false) return;
        this.setValue(valueArray.slice(0, valueArray.length - 1));
    },

    removeValue: function removeValue(value) {
        var valueArray = this.getValueArray(this.props.value);
        this.setValue(valueArray.filter(function (i) {
            return i !== value;
        }));
        this.focus();
    },

    clearValue: function clearValue(event) {
        // if the event was triggered by a mousedown and not the primary
        // button, ignore it.
        if (event && event.type === 'mousedown' && event.button !== 0) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.setValue(this.props.resetValue);
        this.setState({
            isOpen: false,
            inputValue: ''
        }, this.focus);
    },

    focusOption: function focusOption(option) {
        this.setState({
            focusedOption: option
        });
    },

    focusNextOption: function focusNextOption() {
        this.focusAdjacentOption('next');
    },

    focusPreviousOption: function focusPreviousOption() {
        this.focusAdjacentOption('previous');
    },

    focusPageUpOption: function focusPageUpOption() {
        this.focusAdjacentOption('page_up');
    },

    focusPageDownOption: function focusPageDownOption() {
        this.focusAdjacentOption('page_down');
    },

    focusStartOption: function focusStartOption() {
        this.focusAdjacentOption('start');
    },

    focusEndOption: function focusEndOption() {
        this.focusAdjacentOption('end');
    },

    focusAdjacentOption: function focusAdjacentOption(dir) {
        var options = this._visibleOptions.map(function (option, index) {
            return { option: option, index: index };
        }).filter(function (option) {
            return !option.option.disabled;
        });
        this._scrollToFocusedOptionOnUpdate = true;
        if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
                inputValue: '',
                focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
            });
            return;
        }
        if (!options.length) return;
        var focusedIndex = -1;
        for (var i = 0; i < options.length; i++) {
            if (this._focusedOption === options[i].option) {
                focusedIndex = i;
                break;
            }
        }
        if (dir === 'next' && focusedIndex !== -1) {
            focusedIndex = (focusedIndex + 1) % options.length;
        } else if (dir === 'previous') {
            if (focusedIndex > 0) {
                focusedIndex = focusedIndex - 1;
            } else {
                focusedIndex = options.length - 1;
            }
        } else if (dir === 'start') {
            focusedIndex = 0;
        } else if (dir === 'end') {
            focusedIndex = options.length - 1;
        } else if (dir === 'page_up') {
            var potentialIndex = focusedIndex - this.props.pageSize;
            if (potentialIndex < 0) {
                focusedIndex = 0;
            } else {
                focusedIndex = potentialIndex;
            }
        } else if (dir === 'page_down') {
            var potentialIndex = focusedIndex + this.props.pageSize;
            if (potentialIndex > options.length - 1) {
                focusedIndex = options.length - 1;
            } else {
                focusedIndex = potentialIndex;
            }
        }

        if (focusedIndex === -1) {
            focusedIndex = 0;
        }

        this.setState({
            focusedIndex: options[focusedIndex].index,
            focusedOption: options[focusedIndex].option
        });
    },

    selectFocusedOption: function selectFocusedOption() {
        // if (this.props.allowCreate && !this.state.focusedOption) {
        // 	return this.selectValue(this.state.inputValue);
        // }
        if (this._focusedOption) {
            return this.selectValue(this._focusedOption);
        }
    },

    renderLoading: function renderLoading() {
        if (!this.props.isLoading) return;
        return _react2["default"].createElement(
            "span",
            { className: "Select-loading-zone", "aria-hidden": "true" },
            _react2["default"].createElement("span", { className: "Select-loading" })
        );
    },

    renderValue: function renderValue(valueArray, isOpen) {
        var _this4 = this;

        var renderLabel = this.props.valueRenderer || this.getOptionLabel;
        var ValueComponent = this.props.valueComponent;
        if (!valueArray.length) {
            return !this.state.inputValue ? _react2["default"].createElement(
                "div",
                { className: "Select-placeholder" },
                this.props.placeholder
            ) : null;
        }
        var onClick = this.props.onValueClick ? this.handleValueClick : null;
        if (this.props.multi) {
            return valueArray.map(function (value, i) {
                return _react2["default"].createElement(
                    ValueComponent,
                    {
                        id: _this4._instancePrefix + '-value-' + i,
                        instancePrefix: _this4._instancePrefix,
                        disabled: _this4.props.disabled || value.clearableValue === false,
                        key: "value-" + i + "-" + value[_this4.props.valueKey],
                        onClick: onClick,
                        onRemove: _this4.removeValue,
                        value: value
                    },
                    renderLabel(value),
                    _react2["default"].createElement(
                        "span",
                        { className: "Select-aria-only" },
                        " "
                    )
                );
            });
        } else if (!this.state.inputValue) {
            if (isOpen) onClick = null;
            return _react2["default"].createElement(
                ValueComponent,
                {
                    id: this._instancePrefix + '-value-item',
                    disabled: this.props.disabled,
                    instancePrefix: this._instancePrefix,
                    onClick: onClick,
                    value: valueArray[0]
                },
                renderLabel(valueArray[0])
            );
        }
    },

    renderInput: function renderInput(valueArray, focusedOptionIndex) {
        if (this.props.inputRenderer) {
            return this.props.inputRenderer();
        } else {
            var _classNames;

            var className = (0, _classnames2["default"])('Select-input', this.props.inputProps.className);
            var isOpen = !!this.state.isOpen;

            var ariaOwns = (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

            // TODO: Check how this project includes Object.assign()
            var inputProps = _extends({}, this.props.inputProps, {
                role: 'combobox',
                'aria-expanded': '' + isOpen,
                'aria-owns': ariaOwns,
                'aria-haspopup': '' + isOpen,
                'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
                'aria-labelledby': this.props['aria-labelledby'],
                'aria-label': this.props['aria-label'],
                className: className,
                tabIndex: this.props.tabIndex,
                onBlur: this.handleInputBlur,
                onChange: this.handleInputChange,
                onFocus: this.handleInputFocus,
                ref: 'input',
                required: this.state.required,
                value: this.state.inputValue
            });

            if (this.props.disabled || !this.props.searchable) {
                var divProps = (0, _blacklist2["default"])(this.props.inputProps, 'inputClassName');
                return _react2["default"].createElement("div", _extends({}, divProps, {
                    role: "combobox",
                    "aria-expanded": isOpen,
                    "aria-owns": isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
                    "aria-activedescendant": isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
                    className: className,
                    tabIndex: this.props.tabIndex || 0,
                    onBlur: this.handleInputBlur,
                    onFocus: this.handleInputFocus,
                    ref: "input",
                    "aria-readonly": '' + !!this.props.disabled,
                    style: { border: 0, width: 1, display: 'inline-block' } }));
            }

            if (this.props.autosize) {
                return _react2["default"].createElement(_reactInputAutosize2["default"], _extends({}, inputProps, { minWidth: "5px" }));
            }
            return _react2["default"].createElement(
                "div",
                { className: className },
                _react2["default"].createElement("input", inputProps)
            );
        }
    },

    renderClear: function renderClear() {
        if (!this.props.clearable || !this.props.value || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
        return _react2["default"].createElement(
            "span",
            { className: "Select-clear-zone",
                title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                "aria-label": this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                onMouseDown: this.clearValue,
                onTouchStart: this.handleTouchStart,
                onTouchMove: this.handleTouchMove,
                onTouchEnd: this.handleTouchEndClearValue
            },
            _react2["default"].createElement("span", { className: "Select-clear", dangerouslySetInnerHTML: { __html: '&times;' } })
        );
    },

    renderArrow: function renderArrow() {
        return _react2["default"].createElement(
            "span",
            { className: "Select-arrow-zone", onMouseDown: this.handleMouseDownOnArrow },
            _react2["default"].createElement("span", { className: "Select-arrow", onMouseDown: this.handleMouseDownOnArrow })
        );
    },

    filterOptions: function filterOptions(excludeOptions) {
        var _this5 = this;

        var filterValue = this.state.inputValue;
        var options = this.props.options || [];
        if (typeof this.props.filterOptions === 'function') {
            return this.props.filterOptions.call(this, options, filterValue, excludeOptions);
        } else if (this.props.filterOptions) {
            if (this.props.ignoreAccents) {
                filterValue = (0, _utilsStripDiacritics2["default"])(filterValue);
            }
            if (this.props.ignoreCase) {
                filterValue = filterValue.toLowerCase();
            }
            if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
                return i[_this5.props.valueKey];
            });
            return options.filter(function (option) {
                if (excludeOptions && excludeOptions.indexOf(option[_this5.props.valueKey]) > -1) return false;
                if (_this5.props.filterOption) return _this5.props.filterOption.call(_this5, option, filterValue);
                if (!filterValue) return true;
                var valueTest = String(option[_this5.props.valueKey]);
                var labelTest = String(option[_this5.props.labelKey]);
                if (_this5.props.ignoreAccents) {
                    if (_this5.props.matchProp !== 'label') valueTest = (0, _utilsStripDiacritics2["default"])(valueTest);
                    if (_this5.props.matchProp !== 'value') labelTest = (0, _utilsStripDiacritics2["default"])(labelTest);
                }
                if (_this5.props.ignoreCase) {
                    if (_this5.props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
                    if (_this5.props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
                }
                return _this5.props.matchPos === 'start' ? _this5.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || _this5.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : _this5.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || _this5.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
            });
        } else {
            return options;
        }
    },

    renderMenu: function renderMenu(options, valueArray, focusedOption) {
        var _this6 = this;

        if (options && options.length) {
            if (this.props.menuRenderer) {
                return this.props.menuRenderer({
                    focusedOption: focusedOption,
                    focusOption: this.focusOption,
                    labelKey: this.props.labelKey,
                    options: options,
                    selectValue: this.selectValue,
                    valueArray: valueArray
                });
            } else {
                var _ret = (function () {
                    var Option = _this6.props.optionComponent;
                    var renderLabel = _this6.props.optionRenderer || _this6.getOptionLabel;

                    return {
                        v: options.map(function (option, i) {
                            var isSelected = valueArray && valueArray.indexOf(option) > -1;
                            var isFocused = option === focusedOption;
                            var optionRef = isFocused ? 'focused' : null;
                            var optionClass = (0, _classnames2["default"])(_this6.props.optionClassName, {
                                'Select-option': true,
                                'is-selected': isSelected,
                                'is-focused': isFocused,
                                'is-disabled': option.disabled
                            });

                            return _react2["default"].createElement(
                                Option,
                                {
                                    instancePrefix: _this6._instancePrefix,
                                    optionIndex: i,
                                    className: optionClass,
                                    isDisabled: option.disabled,
                                    isFocused: isFocused,
                                    key: "option-" + i + "-" + option[_this6.props.valueKey],
                                    onSelect: _this6.selectValue,
                                    onFocus: _this6.focusOption,
                                    option: option,
                                    isSelected: isSelected,
                                    ref: optionRef
                                },
                                renderLabel(option)
                            );
                        })
                    };
                })();

                if (typeof _ret === "object") return _ret.v;
            }
        } else if (this.props.noResultsText) {
            return _react2["default"].createElement(
                "div",
                { className: "Select-noresults" },
                this.props.noResultsText
            );
        } else {
            return null;
        }
    },

    renderHiddenField: function renderHiddenField(valueArray) {
        var _this7 = this;

        if (!this.props.name) return;
        if (this.props.joinValues) {
            var value = valueArray.map(function (i) {
                return stringifyValue(i[_this7.props.valueKey]);
            }).join(this.props.delimiter);
            return _react2["default"].createElement("input", {
                type: "hidden",
                ref: "value",
                name: this.props.name,
                value: value,
                disabled: this.props.disabled });
        }
        return valueArray.map(function (item, index) {
            return _react2["default"].createElement("input", { key: 'hidden.' + index,
                type: "hidden",
                ref: 'value' + index,
                name: _this7.props.name,
                value: stringifyValue(item[_this7.props.valueKey]),
                disabled: _this7.props.disabled });
        });
    },

    getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
        var options = this._visibleOptions;
        if (!options.length) return null;

        var focusedOption = this.state.focusedOption || selectedOption;
        if (focusedOption && !focusedOption.disabled) {
            var focusedOptionIndex = options.indexOf(focusedOption);
            if (focusedOptionIndex !== -1) {
                return focusedOptionIndex;
            }
        }

        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled) return i;
        }
        return null;
    },

    renderOuter: function renderOuter(options, valueArray, focusedOption) {
        var menu = this.renderMenu(options, valueArray, focusedOption);
        if (!menu) {
            return null;
        }

        return _react2["default"].createElement(
            "div",
            { ref: "menuContainer", className: "Select-menu-outer", style: this.props.menuContainerStyle },
            _react2["default"].createElement(
                "div",
                { ref: "menu", role: "listbox", className: "Select-menu", id: this._instancePrefix + '-list',
                    style: this.props.menuStyle,
                    onScroll: this.handleMenuScroll,
                    onMouseDown: this.handleMouseDownOnMenu },
                menu
            )
        );
    },

    render: function render() {
        var valueArray = this.getValueArray(this.props.value);
        var options = this._visibleOptions = this.filterOptions(this.props.multi ? valueArray : null);
        var isOpen = this.state.isOpen;
        if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
        var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

        var focusedOption = null;
        if (focusedOptionIndex !== null) {
            focusedOption = this._focusedOption = this._visibleOptions[focusedOptionIndex];
        } else {
            focusedOption = this._focusedOption = null;
        }
        var className = (0, _classnames2["default"])('Select', this.props.className, {
            'Select--multi': this.props.multi,
            'Select--single': !this.props.multi,
            'is-disabled': this.props.disabled,
            'is-focused': this.state.isFocused,
            'is-loading': this.props.isLoading,
            'is-open': isOpen,
            'is-pseudo-focused': this.state.isPseudoFocused,
            'is-searchable': this.props.searchable,
            'has-value': valueArray.length
        });

        var removeMessage = null;
        if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
            removeMessage = _react2["default"].createElement(
                "span",
                { id: this._instancePrefix + '-backspace-remove-message', className: "Select-aria-only",
                    "aria-live": "assertive" },
                this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
            );
        }

        var tetherStyle = {
            zIndex: '2000'
        };
        return _react2["default"].createElement(
            "div",
            { ref: "wrapper",
                className: className,
                style: this.props.wrapperStyle },
            this.renderHiddenField(valueArray),
            _react2["default"].createElement(
                _reactTether2["default"],
                {
                    attachment: "top left",
                    targetAttachment: "bottom left",
                    targetModifier: "visible",
                    style: tetherStyle
                },
                _react2["default"].createElement(
                    "div",
                    { ref: "control",
                        className: "Select-control",
                        style: this.props.style,
                        onKeyDown: this.handleKeyDown,
                        onMouseDown: this.handleMouseDown,
                        onTouchEnd: this.handleTouchEnd,
                        onTouchStart: this.handleTouchStart,
                        onTouchMove: this.handleTouchMove
                    },
                    _react2["default"].createElement(
                        "span",
                        { className: "Select-multi-value-wrapper", id: this._instancePrefix + '-value' },
                        this.renderValue(valueArray, isOpen),
                        this.renderInput(valueArray, focusedOptionIndex)
                    ),
                    removeMessage,
                    this.renderLoading(),
                    this.renderClear(),
                    this.renderArrow()
                ),
                isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
            )
        );
    }

});

exports["default"] = Select;
module.exports = exports["default"];

},{"./Async":5,"./Option":6,"./Value":7,"./utils/stripDiacritics":8,"blacklist":1,"classnames":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined,"react-tether":3}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmxhY2tsaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXRldGhlci9saWIvVGV0aGVyQ29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXRldGhlci9saWIvcmVhY3QtdGV0aGVyLmpzIiwibm9kZV9tb2R1bGVzL3RldGhlci9kaXN0L2pzL3RldGhlci5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jLmpzIiwiL3JlcG9zL0NsaWNrSGFuZGxlcklPL3JlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiL3JlcG9zL0NsaWNrSGFuZGxlcklPL3JlYWN0LXNlbGVjdC9zcmMvVmFsdWUuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9zdHJpcERpYWNyaXRpY3MuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L3NyYy9TZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7cUJDNXREa0IsT0FBTzs7OztzQkFFTixVQUFVOzs7O29DQUNELHlCQUF5Qjs7OztBQUVyRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7O0FBRWxCLFNBQVMsU0FBUyxDQUFF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aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJsYWNrbGlzdCAoc3JjKSB7XG4gIHZhciBjb3B5ID0ge30sIGZpbHRlciA9IGFyZ3VtZW50c1sxXVxuXG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IHt9XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZpbHRlclthcmd1bWVudHNbaV1dID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICAvLyBibGFja2xpc3Q/XG4gICAgaWYgKGZpbHRlcltrZXldKSBjb250aW51ZVxuXG4gICAgY29weVtrZXldID0gc3JjW2tleV1cbiAgfVxuXG4gIHJldHVybiBjb3B5XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgX3RldGhlciA9IHJlcXVpcmUoJ3RldGhlcicpO1xuXG52YXIgX3RldGhlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXRoZXIpO1xuXG5pZiAoIV90ZXRoZXIyWydkZWZhdWx0J10pIHtcbiAgY29uc29sZS5lcnJvcignSXQgbG9va3MgbGlrZSBUZXRoZXIgaGFzIG5vdCBiZWVuIGluY2x1ZGVkLiBQbGVhc2UgbG9hZCB0aGlzIGRlcGVuZGVuY3kgZmlyc3QgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdGV0aGVyJyk7XG59XG5cbnZhciByZW5kZXJFbGVtZW50VG9Qcm9wVHlwZXMgPSBbX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIF9yZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICBhcHBlbmRDaGlsZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pXTtcblxudmFyIGNoaWxkcmVuUHJvcFR5cGUgPSBmdW5jdGlvbiBjaGlsZHJlblByb3BUeXBlKF9yZWYsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG5cbiAgdmFyIGNoaWxkQ291bnQgPSBfcmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pO1xuICBpZiAoY2hpbGRDb3VudCA8PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihjb21wb25lbnROYW1lICsgJyBleHBlY3RzIGF0IGxlYXN0IG9uZSBjaGlsZCB0byB1c2UgYXMgdGhlIHRhcmdldCBlbGVtZW50LicpO1xuICB9IGVsc2UgaWYgKGNoaWxkQ291bnQgPiAyKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcignT25seSBhIG1heCBvZiB0d28gY2hpbGRyZW4gYWxsb3dlZCBpbiAnICsgY29tcG9uZW50TmFtZSArICcuJyk7XG4gIH1cbn07XG5cbnZhciBhdHRhY2htZW50UG9zaXRpb25zID0gWyd0b3AgbGVmdCcsICd0b3AgY2VudGVyJywgJ3RvcCByaWdodCcsICdtaWRkbGUgbGVmdCcsICdtaWRkbGUgY2VudGVyJywgJ21pZGRsZSByaWdodCcsICdib3R0b20gbGVmdCcsICdib3R0b20gY2VudGVyJywgJ2JvdHRvbSByaWdodCddO1xuXG52YXIgVGV0aGVyQ29tcG9uZW50ID0gKGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhUZXRoZXJDb21wb25lbnQsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRldGhlckNvbXBvbmVudCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGV0aGVyQ29tcG9uZW50KTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRldGhlckNvbXBvbmVudC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5fZWxlbWVudFBhcmVudE5vZGUgPSBudWxsO1xuICAgIHRoaXMuX3RldGhlciA9IGZhbHNlO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRldGhlckNvbXBvbmVudCwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fdGFyZ2V0Tm9kZSA9IF9yZWFjdERvbTJbJ2RlZmF1bHQnXS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLl90ZXRoZXIuZGlzYWJsZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHRoaXMuX3RldGhlci5lbmFibGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdwb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuICAgICAgdGhpcy5fdGV0aGVyLnBvc2l0aW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLl9lbGVtZW50UGFyZW50Tm9kZSkge1xuICAgICAgICBfcmVhY3REb20yWydkZWZhdWx0J10udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLl9lbGVtZW50UGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRQYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbWVudFBhcmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fdGV0aGVyKSB7XG4gICAgICAgIHRoaXMuX3RldGhlci5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnRQYXJlbnROb2RlID0gbnVsbDtcbiAgICAgIHRoaXMuX3RldGhlciA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciByZW5kZXJFbGVtZW50VGFnID0gX3Byb3BzLnJlbmRlckVsZW1lbnRUYWc7XG5cbiAgICAgIHZhciBlbGVtZW50Q29tcG9uZW50ID0gX3JlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pWzFdO1xuXG4gICAgICAvLyBpZiBubyBlbGVtZW50IGNvbXBvbmVudCBwcm92aWRlZCwgYmFpbCBvdXRcbiAgICAgIGlmICghZWxlbWVudENvbXBvbmVudCkge1xuICAgICAgICAvLyBkZXN0cm95IFRldGhlciBlbGVtZW50IGlmIGl0IGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgaWYgKHRoaXMuX3RldGhlcikge1xuICAgICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBlbGVtZW50IG5vZGUgY29udGFpbmVyIGlmIGl0IGhhc24ndCBiZWVuIHlldFxuICAgICAgaWYgKCF0aGlzLl9lbGVtZW50UGFyZW50Tm9kZSkge1xuICAgICAgICAvLyBjcmVhdGUgYSBub2RlIHRoYXQgd2UgY2FuIHN0aWNrIG91ciBjb250ZW50IENvbXBvbmVudCBpblxuICAgICAgICB0aGlzLl9lbGVtZW50UGFyZW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocmVuZGVyRWxlbWVudFRhZyk7XG5cbiAgICAgICAgLy8gYXBwZW5kIG5vZGUgdG8gdGhlIHJlbmRlciBub2RlXG4gICAgICAgIHRoaXMuX3JlbmRlck5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFBhcmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW5kZXIgZWxlbWVudCBjb21wb25lbnQgaW50byB0aGUgRE9NXG4gICAgICBfcmVhY3REb20yWydkZWZhdWx0J10udW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXIodGhpcywgZWxlbWVudENvbXBvbmVudCwgdGhpcy5fZWxlbWVudFBhcmVudE5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZG9uJ3QgdXBkYXRlIFRldGhlciB1bnRpbCB0aGUgc3VidHJlZSBoYXMgZmluaXNoZWQgcmVuZGVyaW5nXG4gICAgICAgIF90aGlzLl91cGRhdGVUZXRoZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVUZXRoZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlVGV0aGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wczIuY2hpbGRyZW47XG4gICAgICB2YXIgcmVuZGVyRWxlbWVudFRhZyA9IF9wcm9wczIucmVuZGVyRWxlbWVudFRhZztcbiAgICAgIHZhciByZW5kZXJFbGVtZW50VG8gPSBfcHJvcHMyLnJlbmRlckVsZW1lbnRUbztcbiAgICAgIHZhciBpZCA9IF9wcm9wczIuaWQ7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzMi5jbGFzc05hbWU7XG4gICAgICB2YXIgc3R5bGUgPSBfcHJvcHMyLnN0eWxlO1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMyLCBbJ2NoaWxkcmVuJywgJ3JlbmRlckVsZW1lbnRUYWcnLCAncmVuZGVyRWxlbWVudFRvJywgJ2lkJywgJ2NsYXNzTmFtZScsICdzdHlsZSddKTtcblxuICAgICAgdmFyIHRldGhlck9wdGlvbnMgPSBfZXh0ZW5kcyh7XG4gICAgICAgIHRhcmdldDogdGhpcy5fdGFyZ2V0Tm9kZSxcbiAgICAgICAgZWxlbWVudDogdGhpcy5fZWxlbWVudFBhcmVudE5vZGVcbiAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoaWQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFBhcmVudE5vZGUuaWQgPSBpZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50UGFyZW50Tm9kZS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgX3RoaXMyLl9lbGVtZW50UGFyZW50Tm9kZS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fdGV0aGVyKSB7XG4gICAgICAgIHRoaXMuX3RldGhlciA9IG5ldyBfdGV0aGVyMlsnZGVmYXVsdCddKHRldGhlck9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdGV0aGVyLnNldE9wdGlvbnModGV0aGVyT3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RldGhlci5wb3NpdGlvbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKVswXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVuZGVyTm9kZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgcmVuZGVyRWxlbWVudFRvID0gdGhpcy5wcm9wcy5yZW5kZXJFbGVtZW50VG87XG5cbiAgICAgIGlmICh0eXBlb2YgcmVuZGVyRWxlbWVudFRvID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZW5kZXJFbGVtZW50VG8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlckVsZW1lbnRUbyB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgfVxuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAncHJvcFR5cGVzJyxcbiAgICB2YWx1ZToge1xuICAgICAgcmVuZGVyRWxlbWVudFRhZzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICByZW5kZXJFbGVtZW50VG86IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKHJlbmRlckVsZW1lbnRUb1Byb3BUeXBlcyksXG4gICAgICBhdHRhY2htZW50OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKGF0dGFjaG1lbnRQb3NpdGlvbnMpLmlzUmVxdWlyZWQsXG4gICAgICB0YXJnZXRBdHRhY2htZW50OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKGF0dGFjaG1lbnRQb3NpdGlvbnMpLFxuICAgICAgb2Zmc2V0OiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHRhcmdldE9mZnNldDogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB0YXJnZXRNb2RpZmllcjogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBlbmFibGVkOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICBjbGFzc2VzOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGNsYXNzUHJlZml4OiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG9wdGltaXphdGlvbnM6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgY29uc3RyYWludHM6IF9yZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgICBpZDogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgc3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuUHJvcFR5cGVcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfSwge1xuICAgIGtleTogJ2RlZmF1bHRQcm9wcycsXG4gICAgdmFsdWU6IHtcbiAgICAgIHJlbmRlckVsZW1lbnRUYWc6ICdkaXYnLFxuICAgICAgcmVuZGVyRWxlbWVudFRvOiBudWxsXG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1dKTtcblxuICByZXR1cm4gVGV0aGVyQ29tcG9uZW50O1xufSkoX3JlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFRldGhlckNvbXBvbmVudDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9UZXRoZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL1RldGhlckNvbXBvbmVudCcpO1xuXG52YXIgX1RldGhlckNvbXBvbmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UZXRoZXJDb21wb25lbnQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBfVGV0aGVyQ29tcG9uZW50MlsnZGVmYXVsdCddO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyohIHRldGhlciAxLjMuMSAqL1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuVGV0aGVyID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgVGV0aGVyQmFzZSA9IHVuZGVmaW5lZDtcbmlmICh0eXBlb2YgVGV0aGVyQmFzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgVGV0aGVyQmFzZSA9IHsgbW9kdWxlczogW10gfTtcbn1cblxudmFyIHplcm9FbGVtZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50cyhlbCkge1xuICAvLyBJbiBmaXJlZm94IGlmIHRoZSBlbCBpcyBpbnNpZGUgYW4gaWZyYW1lIHdpdGggZGlzcGxheTogbm9uZTsgd2luZG93LmdldENvbXB1dGVkU3R5bGUoKSB3aWxsIHJldHVybiBudWxsO1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKSB8fCB7fTtcbiAgdmFyIHBvc2l0aW9uID0gY29tcHV0ZWRTdHlsZS5wb3NpdGlvbjtcbiAgdmFyIHBhcmVudHMgPSBbXTtcblxuICBpZiAocG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gW2VsXTtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSBlbDtcbiAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHZhciBzdHlsZSA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc3R5bGUgPT09IG51bGwpIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgcmV0dXJuIHBhcmVudHM7XG4gICAgfVxuXG4gICAgdmFyIF9zdHlsZSA9IHN0eWxlO1xuICAgIHZhciBvdmVyZmxvdyA9IF9zdHlsZS5vdmVyZmxvdztcbiAgICB2YXIgb3ZlcmZsb3dYID0gX3N0eWxlLm92ZXJmbG93WDtcbiAgICB2YXIgb3ZlcmZsb3dZID0gX3N0eWxlLm92ZXJmbG93WTtcblxuICAgIGlmICgvKGF1dG98c2Nyb2xsKS8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCkpIHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyB8fCBbJ3JlbGF0aXZlJywgJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihzdHlsZS5wb3NpdGlvbikgPj0gMCkge1xuICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJlbnRzLnB1c2goZG9jdW1lbnQuYm9keSk7XG4gIHJldHVybiBwYXJlbnRzO1xufVxuXG52YXIgdW5pcXVlSWQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiArK2lkO1xuICB9O1xufSkoKTtcblxudmFyIHplcm9Qb3NDYWNoZSA9IHt9O1xudmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHVuZm9ydHVuYXRlbHkgdG9vIGFjY3VyYXRlLiAgSXQgaW50cm9kdWNlcyBhIHBpeGVsIG9yIHR3byBvZlxuICAvLyBqaXR0ZXIgYXMgdGhlIHVzZXIgc2Nyb2xscyB0aGF0IG1lc3NlcyB3aXRoIG91ciBhYmlsaXR5IHRvIGRldGVjdCBpZiB0d28gcG9zaXRpb25zXG4gIC8vIGFyZSBlcXVpdmlsYW50IG9yIG5vdC4gIFdlIHBsYWNlIGFuIGVsZW1lbnQgYXQgdGhlIHRvcCBsZWZ0IG9mIHRoZSBwYWdlIHRoYXQgd2lsbFxuICAvLyBnZXQgdGhlIHNhbWUgaml0dGVyLCBzbyB3ZSBjYW4gY2FuY2VsIHRoZSB0d28gb3V0LlxuICB2YXIgbm9kZSA9IHplcm9FbGVtZW50O1xuICBpZiAoIW5vZGUpIHtcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV0aGVyLWlkJywgdW5pcXVlSWQoKSk7XG4gICAgZXh0ZW5kKG5vZGUuc3R5bGUsIHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIHplcm9FbGVtZW50ID0gbm9kZTtcbiAgfVxuXG4gIHZhciBpZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRldGhlci1pZCcpO1xuICBpZiAodHlwZW9mIHplcm9Qb3NDYWNoZVtpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgemVyb1Bvc0NhY2hlW2lkXSA9IHt9O1xuXG4gICAgdmFyIHJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGZvciAodmFyIGsgaW4gcmVjdCkge1xuICAgICAgLy8gQ2FuJ3QgdXNlIGV4dGVuZCwgYXMgb24gSUU5LCBlbGVtZW50cyBkb24ndCByZXNvbHZlIHRvIGJlIGhhc093blByb3BlcnR5XG4gICAgICB6ZXJvUG9zQ2FjaGVbaWRdW2tdID0gcmVjdFtrXTtcbiAgICB9XG5cbiAgICAvLyBDbGVhciB0aGUgY2FjaGUgd2hlbiB0aGlzIHBvc2l0aW9uIGNhbGwgaXMgZG9uZVxuICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlbGV0ZSB6ZXJvUG9zQ2FjaGVbaWRdO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHplcm9Qb3NDYWNoZVtpZF07XG59O1xuXG5mdW5jdGlvbiByZW1vdmVVdGlsRWxlbWVudHMoKSB7XG4gIGlmICh6ZXJvRWxlbWVudCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoemVyb0VsZW1lbnQpO1xuICB9XG4gIHplcm9FbGVtZW50ID0gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGdldEJvdW5kcyhlbCkge1xuICB2YXIgZG9jID0gdW5kZWZpbmVkO1xuICBpZiAoZWwgPT09IGRvY3VtZW50KSB7XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgZWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgZG9jID0gZWwub3duZXJEb2N1bWVudDtcbiAgfVxuXG4gIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgdmFyIGJveCA9IHt9O1xuICAvLyBUaGUgb3JpZ2luYWwgb2JqZWN0IHJldHVybmVkIGJ5IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyBpbW11dGFibGUsIHNvIHdlIGNsb25lIGl0XG4gIC8vIFdlIGNhbid0IHVzZSBleHRlbmQgYmVjYXVzZSB0aGUgcHJvcGVydGllcyBhcmUgbm90IGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgb2JqZWN0IGJ5IGhhc093blByb3BlcnR5IGluIElFOVxuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBmb3IgKHZhciBrIGluIHJlY3QpIHtcbiAgICBib3hba10gPSByZWN0W2tdO1xuICB9XG5cbiAgdmFyIG9yaWdpbiA9IGdldE9yaWdpbigpO1xuXG4gIGJveC50b3AgLT0gb3JpZ2luLnRvcDtcbiAgYm94LmxlZnQgLT0gb3JpZ2luLmxlZnQ7XG5cbiAgaWYgKHR5cGVvZiBib3gud2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgYm94LndpZHRoID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIGJveC5sZWZ0IC0gYm94LnJpZ2h0O1xuICB9XG4gIGlmICh0eXBlb2YgYm94LmhlaWdodCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBib3guaGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgLSBib3gudG9wIC0gYm94LmJvdHRvbTtcbiAgfVxuXG4gIGJveC50b3AgPSBib3gudG9wIC0gZG9jRWwuY2xpZW50VG9wO1xuICBib3gubGVmdCA9IGJveC5sZWZ0IC0gZG9jRWwuY2xpZW50TGVmdDtcbiAgYm94LnJpZ2h0ID0gZG9jLmJvZHkuY2xpZW50V2lkdGggLSBib3gud2lkdGggLSBib3gubGVmdDtcbiAgYm94LmJvdHRvbSA9IGRvYy5ib2R5LmNsaWVudEhlaWdodCAtIGJveC5oZWlnaHQgLSBib3gudG9wO1xuXG4gIHJldHVybiBib3g7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbCkge1xuICByZXR1cm4gZWwub2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsQmFyU2l6ZSgpIHtcbiAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGlubmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICBpbm5lci5zdHlsZS5oZWlnaHQgPSAnMjAwcHgnO1xuXG4gIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBleHRlbmQob3V0ZXIuc3R5bGUsIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KTtcblxuICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgdmFyIHdpZHRoQ29udGFpbmVkID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gIHZhciB3aWR0aFNjcm9sbCA9IGlubmVyLm9mZnNldFdpZHRoO1xuXG4gIGlmICh3aWR0aENvbnRhaW5lZCA9PT0gd2lkdGhTY3JvbGwpIHtcbiAgICB3aWR0aFNjcm9sbCA9IG91dGVyLmNsaWVudFdpZHRoO1xuICB9XG5cbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgdmFyIHdpZHRoID0gd2lkdGhDb250YWluZWQgLSB3aWR0aFNjcm9sbDtcblxuICByZXR1cm4geyB3aWR0aDogd2lkdGgsIGhlaWdodDogd2lkdGggfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICB2YXIgb3V0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGFyZ3MgPSBbXTtcblxuICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuXG4gIGFyZ3Muc2xpY2UoMSkuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKG9iaikge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgIG91dFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgZWwuY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICAgIGlmIChjbHMudHJpbSgpKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyggfCQpJywgJ2dpJyk7XG4gICAgdmFyIGNsYXNzTmFtZSA9IGdldENsYXNzTmFtZShlbCkucmVwbGFjZShyZWdleCwgJyAnKTtcbiAgICBzZXRDbGFzc05hbWUoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNscykge1xuICAgICAgaWYgKGNscy50cmltKCkpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZUNsYXNzKGVsLCBuYW1lKTtcbiAgICB2YXIgY2xzID0gZ2V0Q2xhc3NOYW1lKGVsKSArICgnICcgKyBuYW1lKTtcbiAgICBzZXRDbGFzc05hbWUoZWwsIGNscyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzQ2xhc3MoZWwsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbiAgfVxuICB2YXIgY2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKGVsKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShlbCkge1xuICBpZiAoZWwuY2xhc3NOYW1lIGluc3RhbmNlb2YgU1ZHQW5pbWF0ZWRTdHJpbmcpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lLmJhc2VWYWw7XG4gIH1cbiAgcmV0dXJuIGVsLmNsYXNzTmFtZTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NOYW1lKGVsLCBjbGFzc05hbWUpIHtcbiAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzZXMoZWwsIGFkZCwgYWxsKSB7XG4gIC8vIE9mIHRoZSBzZXQgb2YgJ2FsbCcgY2xhc3Nlcywgd2UgbmVlZCB0aGUgJ2FkZCcgY2xhc3NlcywgYW5kIG9ubHkgdGhlXG4gIC8vICdhZGQnIGNsYXNzZXMgdG8gYmUgc2V0LlxuICBhbGwuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgaWYgKGFkZC5pbmRleE9mKGNscykgPT09IC0xICYmIGhhc0NsYXNzKGVsLCBjbHMpKSB7XG4gICAgICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGFkZC5mb3JFYWNoKGZ1bmN0aW9uIChjbHMpIHtcbiAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbHMpKSB7XG4gICAgICBhZGRDbGFzcyhlbCwgY2xzKTtcbiAgICB9XG4gIH0pO1xufVxuXG52YXIgZGVmZXJyZWQgPSBbXTtcblxudmFyIGRlZmVyID0gZnVuY3Rpb24gZGVmZXIoZm4pIHtcbiAgZGVmZXJyZWQucHVzaChmbik7XG59O1xuXG52YXIgZmx1c2ggPSBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgdmFyIGZuID0gdW5kZWZpbmVkO1xuICB3aGlsZSAoZm4gPSBkZWZlcnJlZC5wb3AoKSkge1xuICAgIGZuKCk7XG4gIH1cbn07XG5cbnZhciBFdmVudGVkID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRlZCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRlZCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRXZlbnRlZCwgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyLCBjdHgpIHtcbiAgICAgIHZhciBvbmNlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbM107XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5iaW5kaW5ncyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzW2V2ZW50XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nc1tldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdLnB1c2goeyBoYW5kbGVyOiBoYW5kbGVyLCBjdHg6IGN0eCwgb25jZTogb25jZSB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbmNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShldmVudCwgaGFuZGxlciwgY3R4KSB7XG4gICAgICB0aGlzLm9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJpbmRpbmdzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5iaW5kaW5nc1tldmVudF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkZWxldGUgdGhpcy5iaW5kaW5nc1tldmVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldLmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKytpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGV2ZW50KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuYmluZGluZ3MgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuYmluZGluZ3NbZXZlbnRdKSB7XG4gICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIF9iaW5kaW5ncyRldmVudCRpID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV07XG4gICAgICAgICAgdmFyIGhhbmRsZXIgPSBfYmluZGluZ3MkZXZlbnQkaS5oYW5kbGVyO1xuICAgICAgICAgIHZhciBjdHggPSBfYmluZGluZ3MkZXZlbnQkaS5jdHg7XG4gICAgICAgICAgdmFyIG9uY2UgPSBfYmluZGluZ3MkZXZlbnQkaS5vbmNlO1xuXG4gICAgICAgICAgdmFyIGNvbnRleHQgPSBjdHg7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaGFuZGxlci5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRlZDtcbn0pKCk7XG5cblRldGhlckJhc2UuVXRpbHMgPSB7XG4gIGdldFNjcm9sbFBhcmVudHM6IGdldFNjcm9sbFBhcmVudHMsXG4gIGdldEJvdW5kczogZ2V0Qm91bmRzLFxuICBnZXRPZmZzZXRQYXJlbnQ6IGdldE9mZnNldFBhcmVudCxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIGFkZENsYXNzOiBhZGRDbGFzcyxcbiAgcmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxuICBoYXNDbGFzczogaGFzQ2xhc3MsXG4gIHVwZGF0ZUNsYXNzZXM6IHVwZGF0ZUNsYXNzZXMsXG4gIGRlZmVyOiBkZWZlcixcbiAgZmx1c2g6IGZsdXNoLFxuICB1bmlxdWVJZDogdW5pcXVlSWQsXG4gIEV2ZW50ZWQ6IEV2ZW50ZWQsXG4gIGdldFNjcm9sbEJhclNpemU6IGdldFNjcm9sbEJhclNpemUsXG4gIHJlbW92ZVV0aWxFbGVtZW50czogcmVtb3ZlVXRpbEVsZW1lbnRzXG59O1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlLCBwZXJmb3JtYW5jZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTsgfSB9OyB9KSgpO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeDYsIF94NywgX3g4KSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94NiwgcHJvcGVydHkgPSBfeDcsIHJlY2VpdmVyID0gX3g4OyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94NiA9IHBhcmVudDsgX3g3ID0gcHJvcGVydHk7IF94OCA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pZiAodHlwZW9mIFRldGhlckJhc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgaW5jbHVkZSB0aGUgdXRpbHMuanMgZmlsZSBiZWZvcmUgdGV0aGVyLmpzJyk7XG59XG5cbnZhciBfVGV0aGVyQmFzZSRVdGlscyA9IFRldGhlckJhc2UuVXRpbHM7XG52YXIgZ2V0U2Nyb2xsUGFyZW50cyA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldFNjcm9sbFBhcmVudHM7XG52YXIgZ2V0Qm91bmRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0Qm91bmRzO1xudmFyIGdldE9mZnNldFBhcmVudCA9IF9UZXRoZXJCYXNlJFV0aWxzLmdldE9mZnNldFBhcmVudDtcbnZhciBleHRlbmQgPSBfVGV0aGVyQmFzZSRVdGlscy5leHRlbmQ7XG52YXIgYWRkQ2xhc3MgPSBfVGV0aGVyQmFzZSRVdGlscy5hZGRDbGFzcztcbnZhciByZW1vdmVDbGFzcyA9IF9UZXRoZXJCYXNlJFV0aWxzLnJlbW92ZUNsYXNzO1xudmFyIHVwZGF0ZUNsYXNzZXMgPSBfVGV0aGVyQmFzZSRVdGlscy51cGRhdGVDbGFzc2VzO1xudmFyIGRlZmVyID0gX1RldGhlckJhc2UkVXRpbHMuZGVmZXI7XG52YXIgZmx1c2ggPSBfVGV0aGVyQmFzZSRVdGlscy5mbHVzaDtcbnZhciBnZXRTY3JvbGxCYXJTaXplID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0U2Nyb2xsQmFyU2l6ZTtcbnZhciByZW1vdmVVdGlsRWxlbWVudHMgPSBfVGV0aGVyQmFzZSRVdGlscy5yZW1vdmVVdGlsRWxlbWVudHM7XG5cbmZ1bmN0aW9uIHdpdGhpbihhLCBiKSB7XG4gIHZhciBkaWZmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gMSA6IGFyZ3VtZW50c1syXTtcblxuICByZXR1cm4gYSArIGRpZmYgPj0gYiAmJiBiID49IGEgLSBkaWZmO1xufVxuXG52YXIgdHJhbnNmb3JtS2V5ID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgdmFyIHRyYW5zZm9ybXMgPSBbJ3RyYW5zZm9ybScsICd3ZWJraXRUcmFuc2Zvcm0nLCAnT1RyYW5zZm9ybScsICdNb3pUcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2Zvcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IHRyYW5zZm9ybXNbaV07XG4gICAgaWYgKGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cbnZhciB0ZXRoZXJzID0gW107XG5cbnZhciBwb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuICB0ZXRoZXJzLmZvckVhY2goZnVuY3Rpb24gKHRldGhlcikge1xuICAgIHRldGhlci5wb3NpdGlvbihmYWxzZSk7XG4gIH0pO1xuICBmbHVzaCgpO1xufTtcblxuZnVuY3Rpb24gbm93KCkge1xuICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgfVxuICByZXR1cm4gK25ldyBEYXRlKCk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBsYXN0Q2FsbCA9IG51bGw7XG4gIHZhciBsYXN0RHVyYXRpb24gPSBudWxsO1xuICB2YXIgcGVuZGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gIHZhciB0aWNrID0gZnVuY3Rpb24gdGljaygpIHtcbiAgICBpZiAodHlwZW9mIGxhc3REdXJhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbGFzdER1cmF0aW9uID4gMTYpIHtcbiAgICAgIC8vIFdlIHZvbHVudGFyaWx5IHRocm90dGxlIG91cnNlbHZlcyBpZiB3ZSBjYW4ndCBtYW5hZ2UgNjBmcHNcbiAgICAgIGxhc3REdXJhdGlvbiA9IE1hdGgubWluKGxhc3REdXJhdGlvbiAtIDE2LCAyNTApO1xuXG4gICAgICAvLyBKdXN0IGluIGNhc2UgdGhpcyBpcyB0aGUgbGFzdCBldmVudCwgcmVtZW1iZXIgdG8gcG9zaXRpb24ganVzdCBvbmNlIG1vcmVcbiAgICAgIHBlbmRpbmdUaW1lb3V0ID0gc2V0VGltZW91dCh0aWNrLCAyNTApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbGFzdENhbGwgIT09ICd1bmRlZmluZWQnICYmIG5vdygpIC0gbGFzdENhbGwgPCAxMCkge1xuICAgICAgLy8gU29tZSBicm93c2VycyBjYWxsIGV2ZW50cyBhIGxpdHRsZSB0b28gZnJlcXVlbnRseSwgcmVmdXNlIHRvIHJ1biBtb3JlIHRoYW4gaXMgcmVhc29uYWJsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwZW5kaW5nVGltZW91dCAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQocGVuZGluZ1RpbWVvdXQpO1xuICAgICAgcGVuZGluZ1RpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIGxhc3RDYWxsID0gbm93KCk7XG4gICAgcG9zaXRpb24oKTtcbiAgICBsYXN0RHVyYXRpb24gPSBub3coKSAtIGxhc3RDYWxsO1xuICB9O1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgWydyZXNpemUnLCAnc2Nyb2xsJywgJ3RvdWNobW92ZSddLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGljayk7XG4gICAgfSk7XG4gIH1cbn0pKCk7XG5cbnZhciBNSVJST1JfTFIgPSB7XG4gIGNlbnRlcjogJ2NlbnRlcicsXG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCdcbn07XG5cbnZhciBNSVJST1JfVEIgPSB7XG4gIG1pZGRsZTogJ21pZGRsZScsXG4gIHRvcDogJ2JvdHRvbScsXG4gIGJvdHRvbTogJ3RvcCdcbn07XG5cbnZhciBPRkZTRVRfTUFQID0ge1xuICB0b3A6IDAsXG4gIGxlZnQ6IDAsXG4gIG1pZGRsZTogJzUwJScsXG4gIGNlbnRlcjogJzUwJScsXG4gIGJvdHRvbTogJzEwMCUnLFxuICByaWdodDogJzEwMCUnXG59O1xuXG52YXIgYXV0b1RvRml4ZWRBdHRhY2htZW50ID0gZnVuY3Rpb24gYXV0b1RvRml4ZWRBdHRhY2htZW50KGF0dGFjaG1lbnQsIHJlbGF0aXZlVG9BdHRhY2htZW50KSB7XG4gIHZhciBsZWZ0ID0gYXR0YWNobWVudC5sZWZ0O1xuICB2YXIgdG9wID0gYXR0YWNobWVudC50b3A7XG5cbiAgaWYgKGxlZnQgPT09ICdhdXRvJykge1xuICAgIGxlZnQgPSBNSVJST1JfTFJbcmVsYXRpdmVUb0F0dGFjaG1lbnQubGVmdF07XG4gIH1cblxuICBpZiAodG9wID09PSAnYXV0bycpIHtcbiAgICB0b3AgPSBNSVJST1JfVEJbcmVsYXRpdmVUb0F0dGFjaG1lbnQudG9wXTtcbiAgfVxuXG4gIHJldHVybiB7IGxlZnQ6IGxlZnQsIHRvcDogdG9wIH07XG59O1xuXG52YXIgYXR0YWNobWVudFRvT2Zmc2V0ID0gZnVuY3Rpb24gYXR0YWNobWVudFRvT2Zmc2V0KGF0dGFjaG1lbnQpIHtcbiAgdmFyIGxlZnQgPSBhdHRhY2htZW50LmxlZnQ7XG4gIHZhciB0b3AgPSBhdHRhY2htZW50LnRvcDtcblxuICBpZiAodHlwZW9mIE9GRlNFVF9NQVBbYXR0YWNobWVudC5sZWZ0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZWZ0ID0gT0ZGU0VUX01BUFthdHRhY2htZW50LmxlZnRdO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBPRkZTRVRfTUFQW2F0dGFjaG1lbnQudG9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0b3AgPSBPRkZTRVRfTUFQW2F0dGFjaG1lbnQudG9wXTtcbiAgfVxuXG4gIHJldHVybiB7IGxlZnQ6IGxlZnQsIHRvcDogdG9wIH07XG59O1xuXG5mdW5jdGlvbiBhZGRPZmZzZXQoKSB7XG4gIHZhciBvdXQgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBvZmZzZXRzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgb2Zmc2V0c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIG9mZnNldHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciB0b3AgPSBfcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IF9yZWYubGVmdDtcblxuICAgIGlmICh0eXBlb2YgdG9wID09PSAnc3RyaW5nJykge1xuICAgICAgdG9wID0gcGFyc2VGbG9hdCh0b3AsIDEwKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAnc3RyaW5nJykge1xuICAgICAgbGVmdCA9IHBhcnNlRmxvYXQobGVmdCwgMTApO1xuICAgIH1cblxuICAgIG91dC50b3AgKz0gdG9wO1xuICAgIG91dC5sZWZ0ICs9IGxlZnQ7XG4gIH0pO1xuXG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIG9mZnNldFRvUHgob2Zmc2V0LCBzaXplKSB7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0LmxlZnQgPT09ICdzdHJpbmcnICYmIG9mZnNldC5sZWZ0LmluZGV4T2YoJyUnKSAhPT0gLTEpIHtcbiAgICBvZmZzZXQubGVmdCA9IHBhcnNlRmxvYXQob2Zmc2V0LmxlZnQsIDEwKSAvIDEwMCAqIHNpemUud2lkdGg7XG4gIH1cbiAgaWYgKHR5cGVvZiBvZmZzZXQudG9wID09PSAnc3RyaW5nJyAmJiBvZmZzZXQudG9wLmluZGV4T2YoJyUnKSAhPT0gLTEpIHtcbiAgICBvZmZzZXQudG9wID0gcGFyc2VGbG9hdChvZmZzZXQudG9wLCAxMCkgLyAxMDAgKiBzaXplLmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQ7XG59XG5cbnZhciBwYXJzZU9mZnNldCA9IGZ1bmN0aW9uIHBhcnNlT2Zmc2V0KHZhbHVlKSB7XG4gIHZhciBfdmFsdWUkc3BsaXQgPSB2YWx1ZS5zcGxpdCgnICcpO1xuXG4gIHZhciBfdmFsdWUkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX3ZhbHVlJHNwbGl0LCAyKTtcblxuICB2YXIgdG9wID0gX3ZhbHVlJHNwbGl0MlswXTtcbiAgdmFyIGxlZnQgPSBfdmFsdWUkc3BsaXQyWzFdO1xuXG4gIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG59O1xudmFyIHBhcnNlQXR0YWNobWVudCA9IHBhcnNlT2Zmc2V0O1xuXG52YXIgVGV0aGVyQ2xhc3MgPSAoZnVuY3Rpb24gKF9FdmVudGVkKSB7XG4gIF9pbmhlcml0cyhUZXRoZXJDbGFzcywgX0V2ZW50ZWQpO1xuXG4gIGZ1bmN0aW9uIFRldGhlckNsYXNzKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRldGhlckNsYXNzKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRldGhlckNsYXNzLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYmluZCh0aGlzKTtcblxuICAgIHRldGhlcnMucHVzaCh0aGlzKTtcblxuICAgIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMsIGZhbHNlKTtcblxuICAgIFRldGhlckJhc2UubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kdWxlLmluaXRpYWxpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG1vZHVsZS5pbml0aWFsaXplLmNhbGwoX3RoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRldGhlckNsYXNzLCBbe1xuICAgIGtleTogJ2dldENsYXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3MoKSB7XG4gICAgICB2YXIga2V5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gJycgOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgY2xhc3NlcyA9IHRoaXMub3B0aW9ucy5jbGFzc2VzO1xuXG4gICAgICBpZiAodHlwZW9mIGNsYXNzZXMgIT09ICd1bmRlZmluZWQnICYmIGNsYXNzZXNba2V5XSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsYXNzZXNba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNsYXNzUHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3NQcmVmaXggKyAnLScgKyBrZXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NldE9wdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgcG9zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBvZmZzZXQ6ICcwIDAnLFxuICAgICAgICB0YXJnZXRPZmZzZXQ6ICcwIDAnLFxuICAgICAgICB0YXJnZXRBdHRhY2htZW50OiAnYXV0byBhdXRvJyxcbiAgICAgICAgY2xhc3NQcmVmaXg6ICd0ZXRoZXInXG4gICAgICB9O1xuXG4gICAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgX29wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICB2YXIgZWxlbWVudCA9IF9vcHRpb25zLmVsZW1lbnQ7XG4gICAgICB2YXIgdGFyZ2V0ID0gX29wdGlvbnMudGFyZ2V0O1xuICAgICAgdmFyIHRhcmdldE1vZGlmaWVyID0gX29wdGlvbnMudGFyZ2V0TW9kaWZpZXI7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRoaXMudGFyZ2V0TW9kaWZpZXIgPSB0YXJnZXRNb2RpZmllcjtcblxuICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSAndmlld3BvcnQnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy50YXJnZXRNb2RpZmllciA9ICd2aXNpYmxlJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50YXJnZXQgPT09ICdzY3JvbGwtaGFuZGxlJykge1xuICAgICAgICB0aGlzLnRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMudGFyZ2V0TW9kaWZpZXIgPSAnc2Nyb2xsLWhhbmRsZSc7XG4gICAgICB9XG5cbiAgICAgIFsnZWxlbWVudCcsICd0YXJnZXQnXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBfdGhpczJba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RldGhlciBFcnJvcjogQm90aCBlbGVtZW50IGFuZCB0YXJnZXQgbXVzdCBiZSBkZWZpbmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIF90aGlzMltrZXldLmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBfdGhpczJba2V5XSA9IF90aGlzMltrZXldWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfdGhpczJba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBfdGhpczJba2V5XSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3RoaXMyW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLmdldENsYXNzKCdlbGVtZW50JykpO1xuICAgICAgaWYgKCEodGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICBhZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygndGFyZ2V0JykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdHRhY2htZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGV0aGVyIEVycm9yOiBZb3UgbXVzdCBwcm92aWRlIGFuIGF0dGFjaG1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50YXJnZXRBdHRhY2htZW50ID0gcGFyc2VBdHRhY2htZW50KHRoaXMub3B0aW9ucy50YXJnZXRBdHRhY2htZW50KTtcbiAgICAgIHRoaXMuYXR0YWNobWVudCA9IHBhcnNlQXR0YWNobWVudCh0aGlzLm9wdGlvbnMuYXR0YWNobWVudCk7XG4gICAgICB0aGlzLm9mZnNldCA9IHBhcnNlT2Zmc2V0KHRoaXMub3B0aW9ucy5vZmZzZXQpO1xuICAgICAgdGhpcy50YXJnZXRPZmZzZXQgPSBwYXJzZU9mZnNldCh0aGlzLm9wdGlvbnMudGFyZ2V0T2Zmc2V0KTtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnNjcm9sbFBhcmVudHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50YXJnZXRNb2RpZmllciA9PT0gJ3Njcm9sbC1oYW5kbGUnKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50cyA9IFt0aGlzLnRhcmdldF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjcm9sbFBhcmVudHMgPSBnZXRTY3JvbGxQYXJlbnRzKHRoaXMudGFyZ2V0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEodGhpcy5vcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlKSkge1xuICAgICAgICB0aGlzLmVuYWJsZShwb3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFRhcmdldEJvdW5kcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRhcmdldEJvdW5kcygpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXRNb2RpZmllciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0TW9kaWZpZXIgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiBwYWdlWU9mZnNldCwgbGVmdDogcGFnZVhPZmZzZXQsIGhlaWdodDogaW5uZXJIZWlnaHQsIHdpZHRoOiBpbm5lcldpZHRoIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSBnZXRCb3VuZHModGhpcy50YXJnZXQpO1xuXG4gICAgICAgICAgICB2YXIgb3V0ID0ge1xuICAgICAgICAgICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQsXG4gICAgICAgICAgICAgIHdpZHRoOiBib3VuZHMud2lkdGgsXG4gICAgICAgICAgICAgIHRvcDogYm91bmRzLnRvcCxcbiAgICAgICAgICAgICAgbGVmdDogYm91bmRzLmxlZnRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1pbihvdXQuaGVpZ2h0LCBib3VuZHMuaGVpZ2h0IC0gKHBhZ2VZT2Zmc2V0IC0gYm91bmRzLnRvcCkpO1xuICAgICAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKG91dC5oZWlnaHQsIGJvdW5kcy5oZWlnaHQgLSAoYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQgLSAocGFnZVlPZmZzZXQgKyBpbm5lckhlaWdodCkpKTtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1pbihpbm5lckhlaWdodCwgb3V0LmhlaWdodCk7XG4gICAgICAgICAgICBvdXQuaGVpZ2h0IC09IDI7XG5cbiAgICAgICAgICAgIG91dC53aWR0aCA9IE1hdGgubWluKG91dC53aWR0aCwgYm91bmRzLndpZHRoIC0gKHBhZ2VYT2Zmc2V0IC0gYm91bmRzLmxlZnQpKTtcbiAgICAgICAgICAgIG91dC53aWR0aCA9IE1hdGgubWluKG91dC53aWR0aCwgYm91bmRzLndpZHRoIC0gKGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoIC0gKHBhZ2VYT2Zmc2V0ICsgaW5uZXJXaWR0aCkpKTtcbiAgICAgICAgICAgIG91dC53aWR0aCA9IE1hdGgubWluKGlubmVyV2lkdGgsIG91dC53aWR0aCk7XG4gICAgICAgICAgICBvdXQud2lkdGggLT0gMjtcblxuICAgICAgICAgICAgaWYgKG91dC50b3AgPCBwYWdlWU9mZnNldCkge1xuICAgICAgICAgICAgICBvdXQudG9wID0gcGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3V0LmxlZnQgPCBwYWdlWE9mZnNldCkge1xuICAgICAgICAgICAgICBvdXQubGVmdCA9IHBhZ2VYT2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldE1vZGlmaWVyID09PSAnc2Nyb2xsLWhhbmRsZScpIHtcbiAgICAgICAgICB2YXIgYm91bmRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgICBpZiAodGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGJvdW5kcyA9IHtcbiAgICAgICAgICAgICAgbGVmdDogcGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgIHRvcDogcGFnZVlPZmZzZXQsXG4gICAgICAgICAgICAgIGhlaWdodDogaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICAgIHdpZHRoOiBpbm5lcldpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3VuZHMgPSBnZXRCb3VuZHModGFyZ2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XG5cbiAgICAgICAgICB2YXIgaGFzQm90dG9tU2Nyb2xsID0gdGFyZ2V0LnNjcm9sbFdpZHRoID4gdGFyZ2V0LmNsaWVudFdpZHRoIHx8IFtzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYXS5pbmRleE9mKCdzY3JvbGwnKSA+PSAwIHx8IHRoaXMudGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5O1xuXG4gICAgICAgICAgdmFyIHNjcm9sbEJvdHRvbSA9IDA7XG4gICAgICAgICAgaWYgKGhhc0JvdHRvbVNjcm9sbCkge1xuICAgICAgICAgICAgc2Nyb2xsQm90dG9tID0gMTU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKSAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpIC0gc2Nyb2xsQm90dG9tO1xuXG4gICAgICAgICAgdmFyIG91dCA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxNSxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICogMC45NzUgKiAoaGVpZ2h0IC8gdGFyZ2V0LnNjcm9sbEhlaWdodCksXG4gICAgICAgICAgICBsZWZ0OiBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyTGVmdFdpZHRoKSAtIDE1XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBmaXRBZGogPSAwO1xuICAgICAgICAgIGlmIChoZWlnaHQgPCA0MDggJiYgdGhpcy50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGZpdEFkaiA9IC0wLjAwMDExICogTWF0aC5wb3coaGVpZ2h0LCAyKSAtIDAuMDA3MjcgKiBoZWlnaHQgKyAyMi41ODtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy50YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1heChvdXQuaGVpZ2h0LCAyNCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNjcm9sbFBlcmNlbnRhZ2UgPSB0aGlzLnRhcmdldC5zY3JvbGxUb3AgLyAodGFyZ2V0LnNjcm9sbEhlaWdodCAtIGhlaWdodCk7XG4gICAgICAgICAgb3V0LnRvcCA9IHNjcm9sbFBlcmNlbnRhZ2UgKiAoaGVpZ2h0IC0gb3V0LmhlaWdodCAtIGZpdEFkaikgKyBib3VuZHMudG9wICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCk7XG5cbiAgICAgICAgICBpZiAodGhpcy50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1heChvdXQuaGVpZ2h0LCAyNCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEJvdW5kcyh0aGlzLnRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xlYXJDYWNoZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NhY2hlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FjaGUoaywgZ2V0dGVyKSB7XG4gICAgICAvLyBNb3JlIHRoYW4gb25lIG1vZHVsZSB3aWxsIG9mdGVuIG5lZWQgdGhlIHNhbWUgRE9NIGluZm8sIHNvXG4gICAgICAvLyB3ZSBrZWVwIGEgY2FjaGUgd2hpY2ggaXMgY2xlYXJlZCBvbiBlYWNoIHBvc2l0aW9uIGNhbGxcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fY2FjaGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fY2FjaGVba10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlW2tdID0gZ2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZVtrXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIHBvcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIGlmICghKHRoaXMub3B0aW9ucy5hZGRUYXJnZXRDbGFzc2VzID09PSBmYWxzZSkpIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy50YXJnZXQsIHRoaXMuZ2V0Q2xhc3MoJ2VuYWJsZWQnKSk7XG4gICAgICB9XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsIHRoaXMuZ2V0Q2xhc3MoJ2VuYWJsZWQnKSk7XG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLnNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF90aGlzMy5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAocG9zKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgdGhpcy5nZXRDbGFzcygnZW5hYmxlZCcpKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2Nyb2xsUGFyZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfdGhpczQucG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgdGV0aGVycy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXRoZXIsIGkpIHtcbiAgICAgICAgaWYgKHRldGhlciA9PT0gX3RoaXM1KSB7XG4gICAgICAgICAgdGV0aGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgYW55IGVsZW1lbnRzIHdlIHdlcmUgdXNpbmcgZm9yIGNvbnZlbmllbmNlIGZyb20gdGhlIERPTVxuICAgICAgaWYgKHRldGhlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbW92ZVV0aWxFbGVtZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUF0dGFjaENsYXNzZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBdHRhY2hDbGFzc2VzKGVsZW1lbnRBdHRhY2gsIHRhcmdldEF0dGFjaCkge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIGVsZW1lbnRBdHRhY2ggPSBlbGVtZW50QXR0YWNoIHx8IHRoaXMuYXR0YWNobWVudDtcbiAgICAgIHRhcmdldEF0dGFjaCA9IHRhcmdldEF0dGFjaCB8fCB0aGlzLnRhcmdldEF0dGFjaG1lbnQ7XG4gICAgICB2YXIgc2lkZXMgPSBbJ2xlZnQnLCAndG9wJywgJ2JvdHRvbScsICdyaWdodCcsICdtaWRkbGUnLCAnY2VudGVyJ107XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fYWRkQXR0YWNoQ2xhc3NlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gdXBkYXRlQXR0YWNoQ2xhc3NlcyBjYW4gYmUgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIGluIGEgcG9zaXRpb24gY2FsbCwgc29cbiAgICAgICAgLy8gd2UgbmVlZCB0byBjbGVhbiB1cCBhZnRlciBvdXJzZWx2ZXMgc3VjaCB0aGF0IHdoZW4gdGhlIGxhc3QgZGVmZXIgZ2V0c1xuICAgICAgICAvLyByYW4gaXQgZG9lc24ndCBhZGQgYW55IGV4dHJhIGNsYXNzZXMgZnJvbSBwcmV2aW91cyBjYWxscy5cbiAgICAgICAgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5zcGxpY2UoMCwgdGhpcy5fYWRkQXR0YWNoQ2xhc3Nlcy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2FkZEF0dGFjaENsYXNzZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBhZGQgPSB0aGlzLl9hZGRBdHRhY2hDbGFzc2VzO1xuXG4gICAgICBpZiAoZWxlbWVudEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygnZWxlbWVudC1hdHRhY2hlZCcpICsgJy0nICsgZWxlbWVudEF0dGFjaC50b3ApO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCdlbGVtZW50LWF0dGFjaGVkJykgKyAnLScgKyBlbGVtZW50QXR0YWNoLmxlZnQpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldEF0dGFjaC50b3ApIHtcbiAgICAgICAgYWRkLnB1c2godGhpcy5nZXRDbGFzcygndGFyZ2V0LWF0dGFjaGVkJykgKyAnLScgKyB0YXJnZXRBdHRhY2gudG9wKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRBdHRhY2gubGVmdCkge1xuICAgICAgICBhZGQucHVzaCh0aGlzLmdldENsYXNzKCd0YXJnZXQtYXR0YWNoZWQnKSArICctJyArIHRhcmdldEF0dGFjaC5sZWZ0KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFsbCA9IFtdO1xuICAgICAgc2lkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ2VsZW1lbnQtYXR0YWNoZWQnKSArICctJyArIHNpZGUpO1xuICAgICAgICBhbGwucHVzaChfdGhpczYuZ2V0Q2xhc3MoJ3RhcmdldC1hdHRhY2hlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgICB9KTtcblxuICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISh0eXBlb2YgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzNi5lbGVtZW50LCBfdGhpczYuX2FkZEF0dGFjaENsYXNzZXMsIGFsbCk7XG4gICAgICAgIGlmICghKF90aGlzNi5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICAgIHVwZGF0ZUNsYXNzZXMoX3RoaXM2LnRhcmdldCwgX3RoaXM2Ll9hZGRBdHRhY2hDbGFzc2VzLCBhbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIF90aGlzNi5fYWRkQXR0YWNoQ2xhc3NlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Bvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIGZsdXNoQ2hhbmdlcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIC8vIGZsdXNoQ2hhbmdlcyBjb21taXRzIHRoZSBjaGFuZ2VzIGltbWVkaWF0ZWx5LCBsZWF2ZSB0cnVlIHVubGVzcyB5b3UgYXJlIHBvc2l0aW9uaW5nIG11bHRpcGxlXG4gICAgICAvLyB0ZXRoZXJzIChpbiB3aGljaCBjYXNlIGNhbGwgVGV0aGVyLlV0aWxzLmZsdXNoIHlvdXJzZWxmIHdoZW4geW91J3JlIGRvbmUpXG5cbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XG5cbiAgICAgIC8vIFR1cm4gJ2F1dG8nIGF0dGFjaG1lbnRzIGludG8gdGhlIGFwcHJvcHJpYXRlIGNvcm5lciBvciBlZGdlXG4gICAgICB2YXIgdGFyZ2V0QXR0YWNobWVudCA9IGF1dG9Ub0ZpeGVkQXR0YWNobWVudCh0aGlzLnRhcmdldEF0dGFjaG1lbnQsIHRoaXMuYXR0YWNobWVudCk7XG5cbiAgICAgIHRoaXMudXBkYXRlQXR0YWNoQ2xhc3Nlcyh0aGlzLmF0dGFjaG1lbnQsIHRhcmdldEF0dGFjaG1lbnQpO1xuXG4gICAgICB2YXIgZWxlbWVudFBvcyA9IHRoaXMuY2FjaGUoJ2VsZW1lbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzNy5lbGVtZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgd2lkdGggPSBlbGVtZW50UG9zLndpZHRoO1xuICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnRQb3MuaGVpZ2h0O1xuXG4gICAgICBpZiAod2lkdGggPT09IDAgJiYgaGVpZ2h0ID09PSAwICYmIHR5cGVvZiB0aGlzLmxhc3RTaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgX2xhc3RTaXplID0gdGhpcy5sYXN0U2l6ZTtcblxuICAgICAgICAvLyBXZSBjYWNoZSB0aGUgaGVpZ2h0IGFuZCB3aWR0aCB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHBvc2l0aW9uIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgICAgIC8vIGdldHRpbmcgaGlkZGVuLlxuICAgICAgICB3aWR0aCA9IF9sYXN0U2l6ZS53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gX2xhc3RTaXplLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdFNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldFBvcyA9IHRoaXMuY2FjaGUoJ3RhcmdldC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczcuZ2V0VGFyZ2V0Qm91bmRzKCk7XG4gICAgICB9KTtcbiAgICAgIHZhciB0YXJnZXRTaXplID0gdGFyZ2V0UG9zO1xuXG4gICAgICAvLyBHZXQgYW4gYWN0dWFsIHB4IG9mZnNldCBmcm9tIHRoZSBhdHRhY2htZW50XG4gICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9QeChhdHRhY2htZW50VG9PZmZzZXQodGhpcy5hdHRhY2htZW50KSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgdmFyIHRhcmdldE9mZnNldCA9IG9mZnNldFRvUHgoYXR0YWNobWVudFRvT2Zmc2V0KHRhcmdldEF0dGFjaG1lbnQpLCB0YXJnZXRTaXplKTtcblxuICAgICAgdmFyIG1hbnVhbE9mZnNldCA9IG9mZnNldFRvUHgodGhpcy5vZmZzZXQsIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgIHZhciBtYW51YWxUYXJnZXRPZmZzZXQgPSBvZmZzZXRUb1B4KHRoaXMudGFyZ2V0T2Zmc2V0LCB0YXJnZXRTaXplKTtcblxuICAgICAgLy8gQWRkIHRoZSBtYW51YWxseSBwcm92aWRlZCBvZmZzZXRcbiAgICAgIG9mZnNldCA9IGFkZE9mZnNldChvZmZzZXQsIG1hbnVhbE9mZnNldCk7XG4gICAgICB0YXJnZXRPZmZzZXQgPSBhZGRPZmZzZXQodGFyZ2V0T2Zmc2V0LCBtYW51YWxUYXJnZXRPZmZzZXQpO1xuXG4gICAgICAvLyBJdCdzIG5vdyBvdXIgZ29hbCB0byBtYWtlIChlbGVtZW50IHBvc2l0aW9uICsgb2Zmc2V0KSA9PSAodGFyZ2V0IHBvc2l0aW9uICsgdGFyZ2V0IG9mZnNldClcbiAgICAgIHZhciBsZWZ0ID0gdGFyZ2V0UG9zLmxlZnQgKyB0YXJnZXRPZmZzZXQubGVmdCAtIG9mZnNldC5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IHRhcmdldFBvcy50b3AgKyB0YXJnZXRPZmZzZXQudG9wIC0gb2Zmc2V0LnRvcDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUZXRoZXJCYXNlLm1vZHVsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIF9tb2R1bGUyID0gVGV0aGVyQmFzZS5tb2R1bGVzW2ldO1xuICAgICAgICB2YXIgcmV0ID0gX21vZHVsZTIucG9zaXRpb24uY2FsbCh0aGlzLCB7XG4gICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiB0YXJnZXRBdHRhY2htZW50LFxuICAgICAgICAgIHRhcmdldFBvczogdGFyZ2V0UG9zLFxuICAgICAgICAgIGVsZW1lbnRQb3M6IGVsZW1lbnRQb3MsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgdGFyZ2V0T2Zmc2V0OiB0YXJnZXRPZmZzZXQsXG4gICAgICAgICAgbWFudWFsT2Zmc2V0OiBtYW51YWxPZmZzZXQsXG4gICAgICAgICAgbWFudWFsVGFyZ2V0T2Zmc2V0OiBtYW51YWxUYXJnZXRPZmZzZXQsXG4gICAgICAgICAgc2Nyb2xsYmFyU2l6ZTogc2Nyb2xsYmFyU2l6ZSxcbiAgICAgICAgICBhdHRhY2htZW50OiB0aGlzLmF0dGFjaG1lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHJldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3AgPSByZXQudG9wO1xuICAgICAgICAgIGxlZnQgPSByZXQubGVmdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBXZSBkZXNjcmliZSB0aGUgcG9zaXRpb24gdGhyZWUgZGlmZmVyZW50IHdheXMgdG8gZ2l2ZSB0aGUgb3B0aW1pemVyXG4gICAgICAvLyBhIGNoYW5jZSB0byBkZWNpZGUgdGhlIGJlc3QgcG9zc2libGUgd2F5IHRvIHBvc2l0aW9uIHRoZSBlbGVtZW50XG4gICAgICAvLyB3aXRoIHRoZSBmZXdlc3QgcmVwYWludHMuXG4gICAgICB2YXIgbmV4dCA9IHtcbiAgICAgICAgLy8gSXQncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgcGFnZSAoYWJzb2x1dGUgcG9zaXRpb25pbmcgd2hlblxuICAgICAgICAvLyB0aGUgZWxlbWVudCBpcyBhIGNoaWxkIG9mIHRoZSBib2R5KVxuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEl0J3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0IChmaXhlZCBwb3NpdGlvbmluZylcbiAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICB0b3A6IHRvcCAtIHBhZ2VZT2Zmc2V0LFxuICAgICAgICAgIGJvdHRvbTogcGFnZVlPZmZzZXQgLSB0b3AgLSBoZWlnaHQgKyBpbm5lckhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBsZWZ0IC0gcGFnZVhPZmZzZXQsXG4gICAgICAgICAgcmlnaHQ6IHBhZ2VYT2Zmc2V0IC0gbGVmdCAtIHdpZHRoICsgaW5uZXJXaWR0aFxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgc2Nyb2xsYmFyU2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuY2FjaGUoJ3Njcm9sbGJhci1zaXplJywgZ2V0U2Nyb2xsQmFyU2l6ZSk7XG4gICAgICAgIG5leHQudmlld3BvcnQuYm90dG9tIC09IHNjcm9sbGJhclNpemUuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuY2FjaGUoJ3Njcm9sbGJhci1zaXplJywgZ2V0U2Nyb2xsQmFyU2l6ZSk7XG4gICAgICAgIG5leHQudmlld3BvcnQucmlnaHQgLT0gc2Nyb2xsYmFyU2l6ZS53aWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKFsnJywgJ3N0YXRpYyddLmluZGV4T2YoZG9jdW1lbnQuYm9keS5zdHlsZS5wb3NpdGlvbikgPT09IC0xIHx8IFsnJywgJ3N0YXRpYyddLmluZGV4T2YoZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50LnN0eWxlLnBvc2l0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gQWJzb2x1dGUgcG9zaXRpb25pbmcgaW4gdGhlIGJvZHkgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGUgcGFnZSwgbm90IHRoZSAnaW5pdGlhbCBjb250YWluaW5nIGJsb2NrJ1xuICAgICAgICBuZXh0LnBhZ2UuYm90dG9tID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgLSB0b3AgLSBoZWlnaHQ7XG4gICAgICAgIG5leHQucGFnZS5yaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGggLSBsZWZ0IC0gd2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9wdGltaXphdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIHRoaXMub3B0aW9ucy5vcHRpbWl6YXRpb25zLm1vdmVFbGVtZW50ICE9PSBmYWxzZSAmJiAhKHR5cGVvZiB0aGlzLnRhcmdldE1vZGlmaWVyICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gX3RoaXM3LmNhY2hlKCd0YXJnZXQtb2Zmc2V0cGFyZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChfdGhpczcudGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UG9zaXRpb24gPSBfdGhpczcuY2FjaGUoJ3RhcmdldC1vZmZzZXRwYXJlbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEJvdW5kcyhvZmZzZXRQYXJlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50U2l6ZSA9IG9mZnNldFBvc2l0aW9uO1xuXG4gICAgICAgICAgdmFyIG9mZnNldEJvcmRlciA9IHt9O1xuICAgICAgICAgIFsnVG9wJywgJ0xlZnQnLCAnQm90dG9tJywgJ1JpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoc2lkZSkge1xuICAgICAgICAgICAgb2Zmc2V0Qm9yZGVyW3NpZGUudG9Mb3dlckNhc2UoKV0gPSBwYXJzZUZsb2F0KG9mZnNldFBhcmVudFN0eWxlWydib3JkZXInICsgc2lkZSArICdXaWR0aCddKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG9mZnNldFBvc2l0aW9uLnJpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCAtIG9mZnNldFBvc2l0aW9uLmxlZnQgLSBvZmZzZXRQYXJlbnRTaXplLndpZHRoICsgb2Zmc2V0Qm9yZGVyLnJpZ2h0O1xuICAgICAgICAgIG9mZnNldFBvc2l0aW9uLmJvdHRvbSA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0UG9zaXRpb24udG9wIC0gb2Zmc2V0UGFyZW50U2l6ZS5oZWlnaHQgKyBvZmZzZXRCb3JkZXIuYm90dG9tO1xuXG4gICAgICAgICAgaWYgKG5leHQucGFnZS50b3AgPj0gb2Zmc2V0UG9zaXRpb24udG9wICsgb2Zmc2V0Qm9yZGVyLnRvcCAmJiBuZXh0LnBhZ2UuYm90dG9tID49IG9mZnNldFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICAgICAgaWYgKG5leHQucGFnZS5sZWZ0ID49IG9mZnNldFBvc2l0aW9uLmxlZnQgKyBvZmZzZXRCb3JkZXIubGVmdCAmJiBuZXh0LnBhZ2UucmlnaHQgPj0gb2Zmc2V0UG9zaXRpb24ucmlnaHQpIHtcbiAgICAgICAgICAgICAgLy8gV2UncmUgd2l0aGluIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHRhcmdldCdzIHNjcm9sbCBwYXJlbnRcbiAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IG9mZnNldFBhcmVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gb2Zmc2V0UGFyZW50LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgICAgICAgLy8gSXQncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0J3Mgb2Zmc2V0IHBhcmVudCAoYWJzb2x1dGUgcG9zaXRpb25pbmcgd2hlblxuICAgICAgICAgICAgICAvLyB0aGUgZWxlbWVudCBpcyBtb3ZlZCB0byBiZSBhIGNoaWxkIG9mIHRoZSB0YXJnZXQncyBvZmZzZXQgcGFyZW50KS5cbiAgICAgICAgICAgICAgbmV4dC5vZmZzZXQgPSB7XG4gICAgICAgICAgICAgICAgdG9wOiBuZXh0LnBhZ2UudG9wIC0gb2Zmc2V0UG9zaXRpb24udG9wICsgc2Nyb2xsVG9wIC0gb2Zmc2V0Qm9yZGVyLnRvcCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBuZXh0LnBhZ2UubGVmdCAtIG9mZnNldFBvc2l0aW9uLmxlZnQgKyBzY3JvbGxMZWZ0IC0gb2Zmc2V0Qm9yZGVyLmxlZnRcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGNvdWxkIGFsc28gdHJhdmVsIHVwIHRoZSBET00gYW5kIHRyeSBlYWNoIGNvbnRhaW5pbmcgY29udGV4dCwgcmF0aGVyIHRoYW4gb25seVxuICAgICAgLy8gbG9va2luZyBhdCB0aGUgYm9keSwgYnV0IHdlJ3JlIGdvbm5hIGdldCBkaW1pbmlzaGluZyByZXR1cm5zLlxuXG4gICAgICB0aGlzLm1vdmUobmV4dCk7XG5cbiAgICAgIHRoaXMuaGlzdG9yeS51bnNoaWZ0KG5leHQpO1xuXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnBvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmx1c2hDaGFuZ2VzKSB7XG4gICAgICAgIGZsdXNoKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRIRSBJU1NVRVxuICB9LCB7XG4gICAga2V5OiAnbW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUocG9zKSB7XG4gICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgaWYgKCEodHlwZW9mIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2FtZSA9IHt9O1xuXG4gICAgICBmb3IgKHZhciB0eXBlIGluIHBvcykge1xuICAgICAgICBzYW1lW3R5cGVdID0ge307XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHBvc1t0eXBlXSkge1xuICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhpc3RvcnkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHRoaXMuaGlzdG9yeVtpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnRbdHlwZV0gIT09ICd1bmRlZmluZWQnICYmICF3aXRoaW4ocG9pbnRbdHlwZV1ba2V5XSwgcG9zW3R5cGVdW2tleV0pKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgc2FtZVt0eXBlXVtrZXldID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNzcyA9IHsgdG9wOiAnJywgbGVmdDogJycsIHJpZ2h0OiAnJywgYm90dG9tOiAnJyB9O1xuXG4gICAgICB2YXIgdHJhbnNjcmliZSA9IGZ1bmN0aW9uIHRyYW5zY3JpYmUoX3NhbWUsIF9wb3MpIHtcbiAgICAgICAgdmFyIGhhc09wdGltaXphdGlvbnMgPSB0eXBlb2YgX3RoaXM4Lm9wdGlvbnMub3B0aW1pemF0aW9ucyAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIHZhciBncHUgPSBoYXNPcHRpbWl6YXRpb25zID8gX3RoaXM4Lm9wdGlvbnMub3B0aW1pemF0aW9ucy5ncHUgOiBudWxsO1xuICAgICAgICBpZiAoZ3B1ICE9PSBmYWxzZSkge1xuICAgICAgICAgIHZhciB5UG9zID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICB4UG9zID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGlmIChfc2FtZS50b3ApIHtcbiAgICAgICAgICAgIGNzcy50b3AgPSAwO1xuICAgICAgICAgICAgeVBvcyA9IF9wb3MudG9wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjc3MuYm90dG9tID0gMDtcbiAgICAgICAgICAgIHlQb3MgPSAtX3Bvcy5ib3R0b207XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9zYW1lLmxlZnQpIHtcbiAgICAgICAgICAgIGNzcy5sZWZ0ID0gMDtcbiAgICAgICAgICAgIHhQb3MgPSBfcG9zLmxlZnQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5yaWdodCA9IDA7XG4gICAgICAgICAgICB4UG9zID0gLV9wb3MucmlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3NzW3RyYW5zZm9ybUtleV0gPSAndHJhbnNsYXRlWCgnICsgTWF0aC5yb3VuZCh4UG9zKSArICdweCkgdHJhbnNsYXRlWSgnICsgTWF0aC5yb3VuZCh5UG9zKSArICdweCknO1xuXG4gICAgICAgICAgaWYgKHRyYW5zZm9ybUtleSAhPT0gJ21zVHJhbnNmb3JtJykge1xuICAgICAgICAgICAgLy8gVGhlIFogdHJhbnNmb3JtIHdpbGwga2VlcCB0aGlzIGluIHRoZSBHUFUgKGZhc3RlciwgYW5kIHByZXZlbnRzIGFydGlmYWN0cyksXG4gICAgICAgICAgICAvLyBidXQgSUU5IGRvZXNuJ3Qgc3VwcG9ydCAzZCB0cmFuc2Zvcm1zIGFuZCB3aWxsIGNob2tlLlxuICAgICAgICAgICAgY3NzW3RyYW5zZm9ybUtleV0gKz0gXCIgdHJhbnNsYXRlWigwKVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3NhbWUudG9wKSB7XG4gICAgICAgICAgICBjc3MudG9wID0gX3Bvcy50b3AgKyAncHgnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjc3MuYm90dG9tID0gX3Bvcy5ib3R0b20gKyAncHgnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfc2FtZS5sZWZ0KSB7XG4gICAgICAgICAgICBjc3MubGVmdCA9IF9wb3MubGVmdCArICdweCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzcy5yaWdodCA9IF9wb3MucmlnaHQgKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIG1vdmVkID0gZmFsc2U7XG4gICAgICBpZiAoKHNhbWUucGFnZS50b3AgfHwgc2FtZS5wYWdlLmJvdHRvbSkgJiYgKHNhbWUucGFnZS5sZWZ0IHx8IHNhbWUucGFnZS5yaWdodCkpIHtcbiAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdHJhbnNjcmliZShzYW1lLnBhZ2UsIHBvcy5wYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoKHNhbWUudmlld3BvcnQudG9wIHx8IHNhbWUudmlld3BvcnQuYm90dG9tKSAmJiAoc2FtZS52aWV3cG9ydC5sZWZ0IHx8IHNhbWUudmlld3BvcnQucmlnaHQpKSB7XG4gICAgICAgIGNzcy5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIHRyYW5zY3JpYmUoc2FtZS52aWV3cG9ydCwgcG9zLnZpZXdwb3J0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNhbWUub2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBzYW1lLm9mZnNldC50b3AgJiYgc2FtZS5vZmZzZXQubGVmdCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNzcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgdmFyIG9mZnNldFBhcmVudCA9IF90aGlzOC5jYWNoZSgndGFyZ2V0LW9mZnNldHBhcmVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQoX3RoaXM4LnRhcmdldCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZ2V0T2Zmc2V0UGFyZW50KF90aGlzOC5lbGVtZW50KSAhPT0gb2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIF90aGlzOC5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX3RoaXM4LmVsZW1lbnQpO1xuICAgICAgICAgICAgICBvZmZzZXRQYXJlbnQuYXBwZW5kQ2hpbGQoX3RoaXM4LmVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJhbnNjcmliZShzYW1lLm9mZnNldCwgcG9zLm9mZnNldCk7XG4gICAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICB9KSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdHJhbnNjcmliZSh7IHRvcDogdHJ1ZSwgbGVmdDogdHJ1ZSB9LCBwb3MucGFnZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbW92ZWQpIHtcbiAgICAgICAgdmFyIG9mZnNldFBhcmVudElzQm9keSA9IHRydWU7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDEgJiYgY3VycmVudE5vZGUudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpLnBvc2l0aW9uICE9PSAnc3RhdGljJykge1xuICAgICAgICAgICAgb2Zmc2V0UGFyZW50SXNCb2R5ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9mZnNldFBhcmVudElzQm9keSkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFueSBjc3MgY2hhbmdlIHdpbGwgdHJpZ2dlciBhIHJlcGFpbnQsIHNvIGxldCdzIGF2b2lkIG9uZSBpZiBub3RoaW5nIGNoYW5nZWRcbiAgICAgIHZhciB3cml0ZUNTUyA9IHt9O1xuICAgICAgdmFyIHdyaXRlID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gY3NzKSB7XG4gICAgICAgIHZhciB2YWwgPSBjc3Nba2V5XTtcbiAgICAgICAgdmFyIGVsVmFsID0gdGhpcy5lbGVtZW50LnN0eWxlW2tleV07XG5cbiAgICAgICAgaWYgKGVsVmFsICE9PSB2YWwpIHtcbiAgICAgICAgICB3cml0ZSA9IHRydWU7XG4gICAgICAgICAgd3JpdGVDU1Nba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAod3JpdGUpIHtcbiAgICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4dGVuZChfdGhpczguZWxlbWVudC5zdHlsZSwgd3JpdGVDU1MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV0aGVyQ2xhc3M7XG59KShFdmVudGVkKTtcblxuVGV0aGVyQ2xhc3MubW9kdWxlcyA9IFtdO1xuXG5UZXRoZXJCYXNlLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbnZhciBUZXRoZXIgPSBleHRlbmQoVGV0aGVyQ2xhc3MsIFRldGhlckJhc2UpO1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfVGV0aGVyQmFzZSRVdGlscyA9IFRldGhlckJhc2UuVXRpbHM7XG52YXIgZ2V0Qm91bmRzID0gX1RldGhlckJhc2UkVXRpbHMuZ2V0Qm91bmRzO1xudmFyIGV4dGVuZCA9IF9UZXRoZXJCYXNlJFV0aWxzLmV4dGVuZDtcbnZhciB1cGRhdGVDbGFzc2VzID0gX1RldGhlckJhc2UkVXRpbHMudXBkYXRlQ2xhc3NlcztcbnZhciBkZWZlciA9IF9UZXRoZXJCYXNlJFV0aWxzLmRlZmVyO1xuXG52YXIgQk9VTkRTX0ZPUk1BVCA9IFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ107XG5cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdCh0ZXRoZXIsIHRvKSB7XG4gIGlmICh0byA9PT0gJ3Njcm9sbFBhcmVudCcpIHtcbiAgICB0byA9IHRldGhlci5zY3JvbGxQYXJlbnRzWzBdO1xuICB9IGVsc2UgaWYgKHRvID09PSAnd2luZG93Jykge1xuICAgIHRvID0gW3BhZ2VYT2Zmc2V0LCBwYWdlWU9mZnNldCwgaW5uZXJXaWR0aCArIHBhZ2VYT2Zmc2V0LCBpbm5lckhlaWdodCArIHBhZ2VZT2Zmc2V0XTtcbiAgfVxuXG4gIGlmICh0byA9PT0gZG9jdW1lbnQpIHtcbiAgICB0byA9IHRvLmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdG8ubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaXplID0gZ2V0Qm91bmRzKHRvKTtcbiAgICAgIHZhciBwb3MgPSBzaXplO1xuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0byk7XG5cbiAgICAgIHRvID0gW3Bvcy5sZWZ0LCBwb3MudG9wLCBzaXplLndpZHRoICsgcG9zLmxlZnQsIHNpemUuaGVpZ2h0ICsgcG9zLnRvcF07XG5cbiAgICAgIEJPVU5EU19GT1JNQVQuZm9yRWFjaChmdW5jdGlvbiAoc2lkZSwgaSkge1xuICAgICAgICBzaWRlID0gc2lkZVswXS50b1VwcGVyQ2FzZSgpICsgc2lkZS5zdWJzdHIoMSk7XG4gICAgICAgIGlmIChzaWRlID09PSAnVG9wJyB8fCBzaWRlID09PSAnTGVmdCcpIHtcbiAgICAgICAgICB0b1tpXSArPSBwYXJzZUZsb2F0KHN0eWxlWydib3JkZXInICsgc2lkZSArICdXaWR0aCddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b1tpXSAtPSBwYXJzZUZsb2F0KHN0eWxlWydib3JkZXInICsgc2lkZSArICdXaWR0aCddKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxuVGV0aGVyQmFzZS5tb2R1bGVzLnB1c2goe1xuICBwb3NpdGlvbjogZnVuY3Rpb24gcG9zaXRpb24oX3JlZikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgdG9wID0gX3JlZi50b3A7XG4gICAgdmFyIGxlZnQgPSBfcmVmLmxlZnQ7XG4gICAgdmFyIHRhcmdldEF0dGFjaG1lbnQgPSBfcmVmLnRhcmdldEF0dGFjaG1lbnQ7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jb25zdHJhaW50cykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIF9jYWNoZSA9IHRoaXMuY2FjaGUoJ2VsZW1lbnQtYm91bmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEJvdW5kcyhfdGhpcy5lbGVtZW50KTtcbiAgICB9KTtcblxuICAgIHZhciBoZWlnaHQgPSBfY2FjaGUuaGVpZ2h0O1xuICAgIHZhciB3aWR0aCA9IF9jYWNoZS53aWR0aDtcblxuICAgIGlmICh3aWR0aCA9PT0gMCAmJiBoZWlnaHQgPT09IDAgJiYgdHlwZW9mIHRoaXMubGFzdFNpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgX2xhc3RTaXplID0gdGhpcy5sYXN0U2l6ZTtcblxuICAgICAgLy8gSGFuZGxlIHRoZSBpdGVtIGdldHRpbmcgaGlkZGVuIGFzIGEgcmVzdWx0IG9mIG91ciBwb3NpdGlvbmluZyB3aXRob3V0IGdsaXRjaGluZ1xuICAgICAgLy8gdGhlIGNsYXNzZXMgaW4gYW5kIG91dFxuICAgICAgd2lkdGggPSBfbGFzdFNpemUud2lkdGg7XG4gICAgICBoZWlnaHQgPSBfbGFzdFNpemUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRTaXplID0gdGhpcy5jYWNoZSgndGFyZ2V0LWJvdW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5nZXRUYXJnZXRCb3VuZHMoKTtcbiAgICB9KTtcblxuICAgIHZhciB0YXJnZXRIZWlnaHQgPSB0YXJnZXRTaXplLmhlaWdodDtcbiAgICB2YXIgdGFyZ2V0V2lkdGggPSB0YXJnZXRTaXplLndpZHRoO1xuXG4gICAgdmFyIGFsbENsYXNzZXMgPSBbdGhpcy5nZXRDbGFzcygncGlubmVkJyksIHRoaXMuZ2V0Q2xhc3MoJ291dC1vZi1ib3VuZHMnKV07XG5cbiAgICB0aGlzLm9wdGlvbnMuY29uc3RyYWludHMuZm9yRWFjaChmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgdmFyIG91dE9mQm91bmRzQ2xhc3MgPSBjb25zdHJhaW50Lm91dE9mQm91bmRzQ2xhc3M7XG4gICAgICB2YXIgcGlubmVkQ2xhc3MgPSBjb25zdHJhaW50LnBpbm5lZENsYXNzO1xuXG4gICAgICBpZiAob3V0T2ZCb3VuZHNDbGFzcykge1xuICAgICAgICBhbGxDbGFzc2VzLnB1c2gob3V0T2ZCb3VuZHNDbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAocGlubmVkQ2xhc3MpIHtcbiAgICAgICAgYWxsQ2xhc3Nlcy5wdXNoKHBpbm5lZENsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFsbENsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7XG4gICAgICBbJ2xlZnQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbSddLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgYWxsQ2xhc3Nlcy5wdXNoKGNscyArICctJyArIHNpZGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgYWRkQ2xhc3NlcyA9IFtdO1xuXG4gICAgdmFyIHRBdHRhY2htZW50ID0gZXh0ZW5kKHt9LCB0YXJnZXRBdHRhY2htZW50KTtcbiAgICB2YXIgZUF0dGFjaG1lbnQgPSBleHRlbmQoe30sIHRoaXMuYXR0YWNobWVudCk7XG5cbiAgICB0aGlzLm9wdGlvbnMuY29uc3RyYWludHMuZm9yRWFjaChmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgdmFyIHRvID0gY29uc3RyYWludC50bztcbiAgICAgIHZhciBhdHRhY2htZW50ID0gY29uc3RyYWludC5hdHRhY2htZW50O1xuICAgICAgdmFyIHBpbiA9IGNvbnN0cmFpbnQucGluO1xuXG4gICAgICBpZiAodHlwZW9mIGF0dGFjaG1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGF0dGFjaG1lbnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgdmFyIGNoYW5nZUF0dGFjaFggPSB1bmRlZmluZWQsXG4gICAgICAgICAgY2hhbmdlQXR0YWNoWSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChhdHRhY2htZW50LmluZGV4T2YoJyAnKSA+PSAwKSB7XG4gICAgICAgIHZhciBfYXR0YWNobWVudCRzcGxpdCA9IGF0dGFjaG1lbnQuc3BsaXQoJyAnKTtcblxuICAgICAgICB2YXIgX2F0dGFjaG1lbnQkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX2F0dGFjaG1lbnQkc3BsaXQsIDIpO1xuXG4gICAgICAgIGNoYW5nZUF0dGFjaFkgPSBfYXR0YWNobWVudCRzcGxpdDJbMF07XG4gICAgICAgIGNoYW5nZUF0dGFjaFggPSBfYXR0YWNobWVudCRzcGxpdDJbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFuZ2VBdHRhY2hYID0gY2hhbmdlQXR0YWNoWSA9IGF0dGFjaG1lbnQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBib3VuZHMgPSBnZXRCb3VuZGluZ1JlY3QoX3RoaXMsIHRvKTtcblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFkgPT09ICd0YXJnZXQnIHx8IGNoYW5nZUF0dGFjaFkgPT09ICdib3RoJykge1xuICAgICAgICBpZiAodG9wIDwgYm91bmRzWzFdICYmIHRBdHRhY2htZW50LnRvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICB0b3AgKz0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSAmJiB0QXR0YWNobWVudC50b3AgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgdG9wIC09IHRhcmdldEhlaWdodDtcbiAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWSA9PT0gJ3RvZ2V0aGVyJykge1xuICAgICAgICBpZiAodEF0dGFjaG1lbnQudG9wID09PSAndG9wJykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC50b3AgPT09ICdib3R0b20nICYmIHRvcCA8IGJvdW5kc1sxXSkge1xuICAgICAgICAgICAgdG9wICs9IHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuXG4gICAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ3RvcCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChlQXR0YWNobWVudC50b3AgPT09ICd0b3AnICYmIHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSAmJiB0b3AgLSAoaGVpZ2h0IC0gdGFyZ2V0SGVpZ2h0KSA+PSBib3VuZHNbMV0pIHtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQgLSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcblxuICAgICAgICAgICAgZUF0dGFjaG1lbnQudG9wID0gJ2JvdHRvbSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQudG9wID09PSAndG9wJyAmJiB0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10pIHtcbiAgICAgICAgICAgIHRvcCAtPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB0QXR0YWNobWVudC50b3AgPSAndG9wJztcblxuICAgICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQudG9wID09PSAnYm90dG9tJyAmJiB0b3AgPCBib3VuZHNbMV0gJiYgdG9wICsgKGhlaWdodCAqIDIgLSB0YXJnZXRIZWlnaHQpIDw9IGJvdW5kc1szXSkge1xuICAgICAgICAgICAgdG9wICs9IGhlaWdodCAtIHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuXG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodEF0dGFjaG1lbnQudG9wID09PSAnbWlkZGxlJykge1xuICAgICAgICAgIGlmICh0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10gJiYgZUF0dGFjaG1lbnQudG9wID09PSAndG9wJykge1xuICAgICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICdib3R0b20nO1xuICAgICAgICAgIH0gZWxzZSBpZiAodG9wIDwgYm91bmRzWzFdICYmIGVBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAndG9wJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZUF0dGFjaFggPT09ICd0YXJnZXQnIHx8IGNoYW5nZUF0dGFjaFggPT09ICdib3RoJykge1xuICAgICAgICBpZiAobGVmdCA8IGJvdW5kc1swXSAmJiB0QXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICBsZWZ0ICs9IHRhcmdldFdpZHRoO1xuICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSAmJiB0QXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgbGVmdCAtPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICB0QXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VBdHRhY2hYID09PSAndG9nZXRoZXInKSB7XG4gICAgICAgIGlmIChsZWZ0IDwgYm91bmRzWzBdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBsZWZ0ICs9IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG5cbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBsZWZ0ICs9IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG5cbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGVmdCArIHdpZHRoID4gYm91bmRzWzJdICYmIHRBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgdEF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcblxuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZUF0dGFjaG1lbnQubGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgbGVmdCAtPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIHRBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG5cbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0QXR0YWNobWVudC5sZWZ0ID09PSAnY2VudGVyJykge1xuICAgICAgICAgIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0gJiYgZUF0dGFjaG1lbnQubGVmdCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdyaWdodCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChsZWZ0IDwgYm91bmRzWzBdICYmIGVBdHRhY2htZW50LmxlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWSA9PT0gJ2VsZW1lbnQnIHx8IGNoYW5nZUF0dGFjaFkgPT09ICdib3RoJykge1xuICAgICAgICBpZiAodG9wIDwgYm91bmRzWzFdICYmIGVBdHRhY2htZW50LnRvcCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgIGVBdHRhY2htZW50LnRvcCA9ICd0b3AnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcCArIGhlaWdodCA+IGJvdW5kc1szXSAmJiBlQXR0YWNobWVudC50b3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICBlQXR0YWNobWVudC50b3AgPSAnYm90dG9tJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlQXR0YWNoWCA9PT0gJ2VsZW1lbnQnIHx8IGNoYW5nZUF0dGFjaFggPT09ICdib3RoJykge1xuICAgICAgICBpZiAobGVmdCA8IGJvdW5kc1swXSkge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoO1xuICAgICAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoIC8gMjtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAnbGVmdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA+IGJvdW5kc1syXSkge1xuICAgICAgICAgIGlmIChlQXR0YWNobWVudC5sZWZ0ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgICBlQXR0YWNobWVudC5sZWZ0ID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGVBdHRhY2htZW50LmxlZnQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoIC8gMjtcbiAgICAgICAgICAgIGVBdHRhY2htZW50LmxlZnQgPSAncmlnaHQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHBpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGluID0gcGluLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgcmV0dXJuIHAudHJpbSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocGluID09PSB0cnVlKSB7XG4gICAgICAgIHBpbiA9IFsndG9wJywgJ2xlZnQnLCAncmlnaHQnLCAnYm90dG9tJ107XG4gICAgICB9XG5cbiAgICAgIHBpbiA9IHBpbiB8fCBbXTtcblxuICAgICAgdmFyIHBpbm5lZCA9IFtdO1xuICAgICAgdmFyIG9vYiA9IFtdO1xuXG4gICAgICBpZiAodG9wIDwgYm91bmRzWzFdKSB7XG4gICAgICAgIGlmIChwaW4uaW5kZXhPZigndG9wJykgPj0gMCkge1xuICAgICAgICAgIHRvcCA9IGJvdW5kc1sxXTtcbiAgICAgICAgICBwaW5uZWQucHVzaCgndG9wJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb29iLnB1c2goJ3RvcCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b3AgKyBoZWlnaHQgPiBib3VuZHNbM10pIHtcbiAgICAgICAgaWYgKHBpbi5pbmRleE9mKCdib3R0b20nKSA+PSAwKSB7XG4gICAgICAgICAgdG9wID0gYm91bmRzWzNdIC0gaGVpZ2h0O1xuICAgICAgICAgIHBpbm5lZC5wdXNoKCdib3R0b20nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgnYm90dG9tJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxlZnQgPCBib3VuZHNbMF0pIHtcbiAgICAgICAgaWYgKHBpbi5pbmRleE9mKCdsZWZ0JykgPj0gMCkge1xuICAgICAgICAgIGxlZnQgPSBib3VuZHNbMF07XG4gICAgICAgICAgcGlubmVkLnB1c2goJ2xlZnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvb2IucHVzaCgnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsZWZ0ICsgd2lkdGggPiBib3VuZHNbMl0pIHtcbiAgICAgICAgaWYgKHBpbi5pbmRleE9mKCdyaWdodCcpID49IDApIHtcbiAgICAgICAgICBsZWZ0ID0gYm91bmRzWzJdIC0gd2lkdGg7XG4gICAgICAgICAgcGlubmVkLnB1c2goJ3JpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb29iLnB1c2goJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBpbm5lZC5sZW5ndGgpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcGlubmVkQ2xhc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5vcHRpb25zLnBpbm5lZENsYXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGlubmVkQ2xhc3MgPSBfdGhpcy5vcHRpb25zLnBpbm5lZENsYXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwaW5uZWRDbGFzcyA9IF90aGlzLmdldENsYXNzKCdwaW5uZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhZGRDbGFzc2VzLnB1c2gocGlubmVkQ2xhc3MpO1xuICAgICAgICAgIHBpbm5lZC5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgICAgICBhZGRDbGFzc2VzLnB1c2gocGlubmVkQ2xhc3MgKyAnLScgKyBzaWRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9vYi5sZW5ndGgpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgb29iQ2xhc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5vcHRpb25zLm91dE9mQm91bmRzQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvb2JDbGFzcyA9IF90aGlzLm9wdGlvbnMub3V0T2ZCb3VuZHNDbGFzcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb29iQ2xhc3MgPSBfdGhpcy5nZXRDbGFzcygnb3V0LW9mLWJvdW5kcycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFkZENsYXNzZXMucHVzaChvb2JDbGFzcyk7XG4gICAgICAgICAgb29iLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXMucHVzaChvb2JDbGFzcyArICctJyArIHNpZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGlubmVkLmluZGV4T2YoJ2xlZnQnKSA+PSAwIHx8IHBpbm5lZC5pbmRleE9mKCdyaWdodCcpID49IDApIHtcbiAgICAgICAgZUF0dGFjaG1lbnQubGVmdCA9IHRBdHRhY2htZW50LmxlZnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwaW5uZWQuaW5kZXhPZigndG9wJykgPj0gMCB8fCBwaW5uZWQuaW5kZXhPZignYm90dG9tJykgPj0gMCkge1xuICAgICAgICBlQXR0YWNobWVudC50b3AgPSB0QXR0YWNobWVudC50b3AgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRBdHRhY2htZW50LnRvcCAhPT0gdGFyZ2V0QXR0YWNobWVudC50b3AgfHwgdEF0dGFjaG1lbnQubGVmdCAhPT0gdGFyZ2V0QXR0YWNobWVudC5sZWZ0IHx8IGVBdHRhY2htZW50LnRvcCAhPT0gX3RoaXMuYXR0YWNobWVudC50b3AgfHwgZUF0dGFjaG1lbnQubGVmdCAhPT0gX3RoaXMuYXR0YWNobWVudC5sZWZ0KSB7XG4gICAgICAgIF90aGlzLnVwZGF0ZUF0dGFjaENsYXNzZXMoZUF0dGFjaG1lbnQsIHRBdHRhY2htZW50KTtcbiAgICAgICAgX3RoaXMudHJpZ2dlcigndXBkYXRlJywge1xuICAgICAgICAgIGF0dGFjaG1lbnQ6IGVBdHRhY2htZW50LFxuICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6IHRBdHRhY2htZW50XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEoX3RoaXMub3B0aW9ucy5hZGRUYXJnZXRDbGFzc2VzID09PSBmYWxzZSkpIHtcbiAgICAgICAgdXBkYXRlQ2xhc3NlcyhfdGhpcy50YXJnZXQsIGFkZENsYXNzZXMsIGFsbENsYXNzZXMpO1xuICAgICAgfVxuICAgICAgdXBkYXRlQ2xhc3NlcyhfdGhpcy5lbGVtZW50LCBhZGRDbGFzc2VzLCBhbGxDbGFzc2VzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG4gIH1cbn0pO1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9UZXRoZXJCYXNlJFV0aWxzID0gVGV0aGVyQmFzZS5VdGlscztcbnZhciBnZXRCb3VuZHMgPSBfVGV0aGVyQmFzZSRVdGlscy5nZXRCb3VuZHM7XG52YXIgdXBkYXRlQ2xhc3NlcyA9IF9UZXRoZXJCYXNlJFV0aWxzLnVwZGF0ZUNsYXNzZXM7XG52YXIgZGVmZXIgPSBfVGV0aGVyQmFzZSRVdGlscy5kZWZlcjtcblxuVGV0aGVyQmFzZS5tb2R1bGVzLnB1c2goe1xuICBwb3NpdGlvbjogZnVuY3Rpb24gcG9zaXRpb24oX3JlZikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgdG9wID0gX3JlZi50b3A7XG4gICAgdmFyIGxlZnQgPSBfcmVmLmxlZnQ7XG5cbiAgICB2YXIgX2NhY2hlID0gdGhpcy5jYWNoZSgnZWxlbWVudC1ib3VuZHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0Qm91bmRzKF90aGlzLmVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgdmFyIGhlaWdodCA9IF9jYWNoZS5oZWlnaHQ7XG4gICAgdmFyIHdpZHRoID0gX2NhY2hlLndpZHRoO1xuXG4gICAgdmFyIHRhcmdldFBvcyA9IHRoaXMuZ2V0VGFyZ2V0Qm91bmRzKCk7XG5cbiAgICB2YXIgYm90dG9tID0gdG9wICsgaGVpZ2h0O1xuICAgIHZhciByaWdodCA9IGxlZnQgKyB3aWR0aDtcblxuICAgIHZhciBhYnV0dGVkID0gW107XG4gICAgaWYgKHRvcCA8PSB0YXJnZXRQb3MuYm90dG9tICYmIGJvdHRvbSA+PSB0YXJnZXRQb3MudG9wKSB7XG4gICAgICBbJ2xlZnQnLCAncmlnaHQnXS5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgIHZhciB0YXJnZXRQb3NTaWRlID0gdGFyZ2V0UG9zW3NpZGVdO1xuICAgICAgICBpZiAodGFyZ2V0UG9zU2lkZSA9PT0gbGVmdCB8fCB0YXJnZXRQb3NTaWRlID09PSByaWdodCkge1xuICAgICAgICAgIGFidXR0ZWQucHVzaChzaWRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGxlZnQgPD0gdGFyZ2V0UG9zLnJpZ2h0ICYmIHJpZ2h0ID49IHRhcmdldFBvcy5sZWZ0KSB7XG4gICAgICBbJ3RvcCcsICdib3R0b20nXS5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgIHZhciB0YXJnZXRQb3NTaWRlID0gdGFyZ2V0UG9zW3NpZGVdO1xuICAgICAgICBpZiAodGFyZ2V0UG9zU2lkZSA9PT0gdG9wIHx8IHRhcmdldFBvc1NpZGUgPT09IGJvdHRvbSkge1xuICAgICAgICAgIGFidXR0ZWQucHVzaChzaWRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGFsbENsYXNzZXMgPSBbXTtcbiAgICB2YXIgYWRkQ2xhc3NlcyA9IFtdO1xuXG4gICAgdmFyIHNpZGVzID0gWydsZWZ0JywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nXTtcbiAgICBhbGxDbGFzc2VzLnB1c2godGhpcy5nZXRDbGFzcygnYWJ1dHRlZCcpKTtcbiAgICBzaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICBhbGxDbGFzc2VzLnB1c2goX3RoaXMuZ2V0Q2xhc3MoJ2FidXR0ZWQnKSArICctJyArIHNpZGUpO1xuICAgIH0pO1xuXG4gICAgaWYgKGFidXR0ZWQubGVuZ3RoKSB7XG4gICAgICBhZGRDbGFzc2VzLnB1c2godGhpcy5nZXRDbGFzcygnYWJ1dHRlZCcpKTtcbiAgICB9XG5cbiAgICBhYnV0dGVkLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgIGFkZENsYXNzZXMucHVzaChfdGhpcy5nZXRDbGFzcygnYWJ1dHRlZCcpICsgJy0nICsgc2lkZSk7XG4gICAgfSk7XG5cbiAgICBkZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShfdGhpcy5vcHRpb25zLmFkZFRhcmdldENsYXNzZXMgPT09IGZhbHNlKSkge1xuICAgICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLnRhcmdldCwgYWRkQ2xhc3NlcywgYWxsQ2xhc3Nlcyk7XG4gICAgICB9XG4gICAgICB1cGRhdGVDbGFzc2VzKF90aGlzLmVsZW1lbnQsIGFkZENsYXNzZXMsIGFsbENsYXNzZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0pO1xuLyogZ2xvYmFscyBUZXRoZXJCYXNlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cblRldGhlckJhc2UubW9kdWxlcy5wdXNoKHtcbiAgcG9zaXRpb246IGZ1bmN0aW9uIHBvc2l0aW9uKF9yZWYpIHtcbiAgICB2YXIgdG9wID0gX3JlZi50b3A7XG4gICAgdmFyIGxlZnQgPSBfcmVmLmxlZnQ7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5zaGlmdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzaGlmdCA9IHRoaXMub3B0aW9ucy5zaGlmdDtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zaGlmdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2hpZnQgPSB0aGlzLm9wdGlvbnMuc2hpZnQuY2FsbCh0aGlzLCB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH0pO1xuICAgIH1cblxuICAgIHZhciBzaGlmdFRvcCA9IHVuZGVmaW5lZCxcbiAgICAgICAgc2hpZnRMZWZ0ID0gdW5kZWZpbmVkO1xuICAgIGlmICh0eXBlb2Ygc2hpZnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzaGlmdCA9IHNoaWZ0LnNwbGl0KCcgJyk7XG4gICAgICBzaGlmdFsxXSA9IHNoaWZ0WzFdIHx8IHNoaWZ0WzBdO1xuXG4gICAgICB2YXIgX3NoaWZ0ID0gc2hpZnQ7XG5cbiAgICAgIHZhciBfc2hpZnQyID0gX3NsaWNlZFRvQXJyYXkoX3NoaWZ0LCAyKTtcblxuICAgICAgc2hpZnRUb3AgPSBfc2hpZnQyWzBdO1xuICAgICAgc2hpZnRMZWZ0ID0gX3NoaWZ0MlsxXTtcblxuICAgICAgc2hpZnRUb3AgPSBwYXJzZUZsb2F0KHNoaWZ0VG9wLCAxMCk7XG4gICAgICBzaGlmdExlZnQgPSBwYXJzZUZsb2F0KHNoaWZ0TGVmdCwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlmdFRvcCA9IHNoaWZ0LnRvcDtcbiAgICAgIHNoaWZ0TGVmdCA9IHNoaWZ0LmxlZnQ7XG4gICAgfVxuXG4gICAgdG9wICs9IHNoaWZ0VG9wO1xuICAgIGxlZnQgKz0gc2hpZnRMZWZ0O1xuXG4gICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgfVxufSk7XG5yZXR1cm4gVGV0aGVyO1xuXG59KSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcbmltcG9ydCBzdHJpcERpYWNyaXRpY3MgZnJvbSAnLi91dGlscy9zdHJpcERpYWNyaXRpY3MnO1xuXG5sZXQgcmVxdWVzdElkID0gMDtcblxuZnVuY3Rpb24gaW5pdENhY2hlIChjYWNoZSkge1xuXHRpZiAoY2FjaGUgJiYgdHlwZW9mIGNhY2hlICE9PSAnb2JqZWN0Jykge1xuXHRcdGNhY2hlID0ge307XG5cdH1cblx0cmV0dXJuIGNhY2hlID8gY2FjaGUgOiBudWxsO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDYWNoZSAoY2FjaGUsIGlucHV0LCBkYXRhKSB7XG5cdGlmICghY2FjaGUpIHJldHVybjtcblx0Y2FjaGVbaW5wdXRdID0gZGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0RnJvbUNhY2hlIChjYWNoZSwgaW5wdXQpIHtcblx0aWYgKCFjYWNoZSkgcmV0dXJuO1xuXHRmb3IgKGxldCBpID0gaW5wdXQubGVuZ3RoOyBpID49IDA7IC0taSkge1xuXHRcdGxldCBjYWNoZUtleSA9IGlucHV0LnNsaWNlKDAsIGkpO1xuXHRcdGlmIChjYWNoZVtjYWNoZUtleV0gJiYgKGlucHV0ID09PSBjYWNoZUtleSB8fCBjYWNoZVtjYWNoZUtleV0uY29tcGxldGUpKSB7XG5cdFx0XHRyZXR1cm4gY2FjaGVbY2FjaGVLZXldO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB0aGVuUHJvbWlzZSAocHJvbWlzZSwgY2FsbGJhY2spIHtcblx0aWYgKCFwcm9taXNlIHx8IHR5cGVvZiBwcm9taXNlLnRoZW4gIT09ICdmdW5jdGlvbicpIHJldHVybjtcblx0cmV0dXJuIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuXHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuXHR9LCAoZXJyKSA9PiB7XG5cdFx0Y2FsbGJhY2soZXJyKTtcblx0fSk7XG59XG5cbmNvbnN0IHN0cmluZ09yTm9kZSA9IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuXHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRSZWFjdC5Qcm9wVHlwZXMubm9kZVxuXSk7XG5cbmNvbnN0IEFzeW5jID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRjYWNoZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3QgdG8gdXNlIHRvIGNhY2hlIHJlc3VsdHMsIGNhbiBiZSBudWxsIHRvIGRpc2FibGUgY2FjaGVcblx0XHRpZ25vcmVBY2NlbnRzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmcgKHNoYXJlZCB3aXRoIFNlbGVjdClcblx0XHRpZ25vcmVDYXNlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB3aGV0aGVyIHRvIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmcgKHNoYXJlZCB3aXRoIFNlbGVjdClcblx0XHRpc0xvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBvdmVycmlkZXMgdGhlIGlzTG9hZGluZyBzdGF0ZSB3aGVuIHNldCB0byB0cnVlXG5cdFx0bG9hZE9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsICAgLy8gZnVuY3Rpb24gdG8gY2FsbCB0byBsb2FkIG9wdGlvbnMgYXN5bmNocm9ub3VzbHlcblx0XHRsb2FkaW5nUGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRcdG1pbmltdW1JbnB1dDogUmVhY3QuUHJvcFR5cGVzLm51bWJlciwgICAgICAgICAgIC8vIHRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgdHJpZ2dlciBsb2FkT3B0aW9uc1xuXHRcdG5vUmVzdWx0c1RleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0cyAoc2hhcmVkIHdpdGggU2VsZWN0KVxuXHRcdG9uSW5wdXRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgIC8vIG9uSW5wdXRDaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdFx0cGxhY2Vob2xkZXI6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgICAgICAgLy8gZmllbGQgcGxhY2Vob2xkZXIsIGRpc3BsYXllZCB3aGVuIHRoZXJlJ3Mgbm8gdmFsdWUgKHNoYXJlZCB3aXRoIFNlbGVjdClcblx0XHRzZWFyY2hQcm9tcHRUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgIC8vIGxhYmVsIHRvIHByb21wdCBmb3Igc2VhcmNoIGlucHV0XG5cdFx0c2VhcmNoaW5nVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gbWVzc2FnZSB0byBkaXNwbGF5IHdoaWxlIG9wdGlvbnMgYXJlIGxvYWRpbmdcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRcdFx0aWdub3JlQ2FzZTogdHJ1ZSxcblx0XHRcdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRcdFx0bWluaW11bUlucHV0OiAwLFxuXHRcdFx0c2VhcmNoaW5nVGV4dDogJ1NlYXJjaGluZy4uLicsXG5cdFx0XHRzZWFyY2hQcm9tcHRUZXh0OiAnVHlwZSB0byBzZWFyY2gnLFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNhY2hlOiBpbml0Q2FjaGUodGhpcy5wcm9wcy5jYWNoZSksXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogW10sXG5cdFx0fTtcblx0fSxcblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcblx0XHR0aGlzLl9sYXN0SW5wdXQgPSAnJztcblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdHRoaXMubG9hZE9wdGlvbnMoJycpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRpZiAobmV4dFByb3BzLmNhY2hlICE9PSB0aGlzLnByb3BzLmNhY2hlKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y2FjaGU6IGluaXRDYWNoZShuZXh0UHJvcHMuY2FjaGUpLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRmb2N1cyAoKSB7XG5cdFx0dGhpcy5yZWZzLnNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXHRyZXNldFN0YXRlICgpIHtcblx0XHR0aGlzLl9jdXJyZW50UmVxdWVzdElkID0gLTE7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogW10sXG5cdFx0fSk7XG5cdH0sXG5cdGdldFJlc3BvbnNlSGFuZGxlciAoaW5wdXQpIHtcblx0XHRsZXQgX3JlcXVlc3RJZCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0SWQgPSByZXF1ZXN0SWQrKztcblx0XHRyZXR1cm4gKGVyciwgZGF0YSkgPT4ge1xuXHRcdFx0aWYgKGVycikgdGhyb3cgZXJyO1xuXHRcdFx0aWYgKCF0aGlzLmlzTW91bnRlZCgpKSByZXR1cm47XG5cdFx0XHR1cGRhdGVDYWNoZSh0aGlzLnN0YXRlLmNhY2hlLCBpbnB1dCwgZGF0YSk7XG5cdFx0XHRpZiAoX3JlcXVlc3RJZCAhPT0gdGhpcy5fY3VycmVudFJlcXVlc3RJZCkgcmV0dXJuO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdG9wdGlvbnM6IGRhdGEgJiYgZGF0YS5vcHRpb25zIHx8IFtdLFxuXHRcdFx0fSk7XG5cdFx0fTtcblx0fSxcblx0bG9hZE9wdGlvbnMgKGlucHV0KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xuXHRcdFx0bGV0IG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxuXHRcdFx0aWYgKG5leHRTdGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdGlucHV0ID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLmlnbm9yZUFjY2VudHMpIGlucHV0ID0gc3RyaXBEaWFjcml0aWNzKGlucHV0KTtcblx0XHRpZiAodGhpcy5wcm9wcy5pZ25vcmVDYXNlKSBpbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG5cblx0XHR0aGlzLl9sYXN0SW5wdXQgPSBpbnB1dDtcblx0XHRpZiAoaW5wdXQubGVuZ3RoIDwgdGhpcy5wcm9wcy5taW5pbXVtSW5wdXQpIHtcblx0XHRcdHJldHVybiB0aGlzLnJlc2V0U3RhdGUoKTtcblx0XHR9XG5cdFx0bGV0IGNhY2hlUmVzdWx0ID0gZ2V0RnJvbUNhY2hlKHRoaXMuc3RhdGUuY2FjaGUsIGlucHV0KTtcblx0XHRpZiAoY2FjaGVSZXN1bHQpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0b3B0aW9uczogY2FjaGVSZXN1bHQub3B0aW9ucyxcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGlzTG9hZGluZzogdHJ1ZSxcblx0XHR9KTtcblx0XHRsZXQgcmVzcG9uc2VIYW5kbGVyID0gdGhpcy5nZXRSZXNwb25zZUhhbmRsZXIoaW5wdXQpO1xuXHRcdGxldCBpbnB1dFByb21pc2UgPSB0aGVuUHJvbWlzZSh0aGlzLnByb3BzLmxvYWRPcHRpb25zKGlucHV0LCByZXNwb25zZUhhbmRsZXIpLCByZXNwb25zZUhhbmRsZXIpO1xuXHRcdHJldHVybiBpbnB1dFByb21pc2UgPyBpbnB1dFByb21pc2UudGhlbigoKSA9PiB7XG5cdFx0XHRyZXR1cm4gaW5wdXQ7XG5cdFx0fSkgOiBpbnB1dDtcblx0fSxcblx0b25PcGVuKCkge1xuXHRcdHRoaXMubG9hZE9wdGlvbnMoJycpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGxldCB7IG5vUmVzdWx0c1RleHQgfSA9IHRoaXMucHJvcHM7XG5cdFx0bGV0IHsgaXNMb2FkaW5nLCBvcHRpb25zIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmICh0aGlzLnByb3BzLmlzTG9hZGluZykgaXNMb2FkaW5nID0gdHJ1ZTtcblx0XHRsZXQgcGxhY2Vob2xkZXIgPSBpc0xvYWRpbmcgPyB0aGlzLnByb3BzLmxvYWRpbmdQbGFjZWhvbGRlciA6IHRoaXMucHJvcHMucGxhY2Vob2xkZXI7XG5cdFx0aWYgKGlzTG9hZGluZykge1xuXHRcdFx0bm9SZXN1bHRzVGV4dCA9IHRoaXMucHJvcHMuc2VhcmNoaW5nVGV4dDtcblx0XHR9IGVsc2UgaWYgKCFvcHRpb25zLmxlbmd0aCAmJiB0aGlzLl9sYXN0SW5wdXQubGVuZ3RoIDwgdGhpcy5wcm9wcy5taW5pbXVtSW5wdXQpIHtcblx0XHRcdG5vUmVzdWx0c1RleHQgPSB0aGlzLnByb3BzLnNlYXJjaFByb21wdFRleHQ7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfVxuXHRcdFx0XHRyZWY9XCJzZWxlY3RcIlxuXHRcdFx0XHRpc0xvYWRpbmc9e2lzTG9hZGluZ31cblx0XHRcdFx0bm9SZXN1bHRzVGV4dD17bm9SZXN1bHRzVGV4dH1cblx0XHRcdFx0b25JbnB1dENoYW5nZT17dGhpcy5sb2FkT3B0aW9uc31cblx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0b25PcGVuPXt0aGlzLm9uT3Blbn1cblx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHQvPlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzeW5jO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBPcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdFx0aW5zdGFuY2VQcmVmaXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgIC8vIHVuaXF1ZSBwcmVmaXggZm9yIHRoZSBpZHMgKHVzZWQgZm9yIGFyaWEpXG5cdFx0aXNEaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXG5cdFx0aXNGb2N1c2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGZvY3VzZWRcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRvbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VFbnRlciBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uVW5mb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUxlYXZlIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyBvYmplY3QgdGhhdCBpcyBiYXNlIGZvciB0aGF0IG9wdGlvblxuXHRcdG9wdGlvbkluZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG5cdH0sXG5cdGJsb2NrRXZlbnQgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRW50ZXIgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0b25Gb2N1cyAoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHsgb3B0aW9uLCBpbnN0YW5jZVByZWZpeCwgb3B0aW9uSW5kZXggfSA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIG9wdGlvbi5jbGFzc05hbWUpO1xuXG5cdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmJsb2NrRXZlbnR9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KSA6IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdHN0eWxlPXtvcHRpb24uc3R5bGV9XG5cdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRpZD17aW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgb3B0aW9uSW5kZXh9XG5cdFx0XHRcdHRpdGxlPXtvcHRpb24udGl0bGV9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY29uc3QgVmFsdWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdWYWx1ZScsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyBkaXNhYmxlZCBwcm9wIHBhc3NlZCB0byBSZWFjdFNlbGVjdFxuXHRcdGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgICAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSB2YWx1ZSAtIHVzZWQgZm9yIGFyaWFcblx0XHRvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiB2YWx1ZSBsYWJlbFxuXHRcdG9uUmVtb3ZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIHJlbW92YWwgb2YgdGhlIHZhbHVlXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMub25DbGljaykge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSwgZXZlbnQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5ocmVmKSB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH0sXG5cblx0b25SZW1vdmUgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMudmFsdWUpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kUmVtb3ZlIChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHR0aGlzLm9uUmVtb3ZlKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaFN0YXJ0IChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0fSxcblxuXHRyZW5kZXJSZW1vdmVJY29uICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5vblJlbW92ZSkgcmV0dXJuO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtaWNvblwiXG5cdFx0XHRcdGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLm9uUmVtb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlfVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfT5cblx0XHRcdFx0JnRpbWVzO1xuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyTGFiZWwgKCkge1xuXHRcdGxldCBjbGFzc05hbWUgPSAnU2VsZWN0LXZhbHVlLWxhYmVsJztcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrIHx8IHRoaXMucHJvcHMudmFsdWUuaHJlZiA/IChcblx0XHRcdDxhIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBocmVmPXt0aGlzLnByb3BzLnZhbHVlLmhyZWZ9IHRhcmdldD17dGhpcy5wcm9wcy52YWx1ZS50YXJnZXR9IG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0gb25Ub3VjaEVuZD17dGhpcy5oYW5kbGVNb3VzZURvd259PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvYT5cblx0XHQpIDogKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJvbGU9XCJvcHRpb25cIiBhcmlhLXNlbGVjdGVkPVwidHJ1ZVwiIGlkPXt0aGlzLnByb3BzLmlkfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnU2VsZWN0LXZhbHVlJywgdGhpcy5wcm9wcy52YWx1ZS5jbGFzc05hbWUpfVxuXHRcdFx0XHRzdHlsZT17dGhpcy5wcm9wcy52YWx1ZS5zdHlsZX1cblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMudmFsdWUudGl0bGV9XG5cdFx0XHRcdD5cblx0XHRcdFx0e3RoaXMucmVuZGVyUmVtb3ZlSWNvbigpfVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJMYWJlbCgpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZTtcbiIsInZhciBtYXAgPSBbXG5cdHsgJ2Jhc2UnOidBJywgJ2xldHRlcnMnOi9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LFxuXHR7ICdiYXNlJzonQUEnLCdsZXR0ZXJzJzovW1xcdUE3MzJdL2cgfSxcblx0eyAnYmFzZSc6J0FFJywnbGV0dGVycyc6L1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSxcblx0eyAnYmFzZSc6J0FPJywnbGV0dGVycyc6L1tcXHVBNzM0XS9nIH0sXG5cdHsgJ2Jhc2UnOidBVScsJ2xldHRlcnMnOi9bXFx1QTczNl0vZyB9LFxuXHR7ICdiYXNlJzonQVYnLCdsZXR0ZXJzJzovW1xcdUE3MzhcXHVBNzNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidBWScsJ2xldHRlcnMnOi9bXFx1QTczQ10vZyB9LFxuXHR7ICdiYXNlJzonQicsICdsZXR0ZXJzJzovW1xcdTAwNDJcXHUyNEI3XFx1RkYyMlxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTAyNDNcXHUwMTgyXFx1MDE4MV0vZyB9LFxuXHR7ICdiYXNlJzonQycsICdsZXR0ZXJzJzovW1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRV0vZyB9LFxuXHR7ICdiYXNlJzonRCcsICdsZXR0ZXJzJzovW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sXG5cdHsgJ2Jhc2UnOidEWicsJ2xldHRlcnMnOi9bXFx1MDFGMVxcdTAxQzRdL2cgfSxcblx0eyAnYmFzZSc6J0R6JywnbGV0dGVycyc6L1tcXHUwMUYyXFx1MDFDNV0vZyB9LFxuXHR7ICdiYXNlJzonRScsICdsZXR0ZXJzJzovW1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RV0vZyB9LFxuXHR7ICdiYXNlJzonRicsICdsZXR0ZXJzJzovW1xcdTAwNDZcXHUyNEJCXFx1RkYyNlxcdTFFMUVcXHUwMTkxXFx1QTc3Ql0vZyB9LFxuXHR7ICdiYXNlJzonRycsICdsZXR0ZXJzJzovW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LFxuXHR7ICdiYXNlJzonSCcsICdsZXR0ZXJzJzovW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nIH0sXG5cdHsgJ2Jhc2UnOidJJywgJ2xldHRlcnMnOi9bXFx1MDA0OVxcdTI0QkVcXHVGRjI5XFx1MDBDQ1xcdTAwQ0RcXHUwMENFXFx1MDEyOFxcdTAxMkFcXHUwMTJDXFx1MDEzMFxcdTAwQ0ZcXHUxRTJFXFx1MUVDOFxcdTAxQ0ZcXHUwMjA4XFx1MDIwQVxcdTFFQ0FcXHUwMTJFXFx1MUUyQ1xcdTAxOTddL2cgfSxcblx0eyAnYmFzZSc6J0onLCAnbGV0dGVycyc6L1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LFxuXHR7ICdiYXNlJzonSycsICdsZXR0ZXJzJzovW1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyXS9nIH0sXG5cdHsgJ2Jhc2UnOidMJywgJ2xldHRlcnMnOi9bXFx1MDA0Q1xcdTI0QzFcXHVGRjJDXFx1MDEzRlxcdTAxMzlcXHUwMTNEXFx1MUUzNlxcdTFFMzhcXHUwMTNCXFx1MUUzQ1xcdTFFM0FcXHUwMTQxXFx1MDIzRFxcdTJDNjJcXHUyQzYwXFx1QTc0OFxcdUE3NDZcXHVBNzgwXS9nIH0sXG5cdHsgJ2Jhc2UnOidMSicsJ2xldHRlcnMnOi9bXFx1MDFDN10vZyB9LFxuXHR7ICdiYXNlJzonTGonLCdsZXR0ZXJzJzovW1xcdTAxQzhdL2cgfSxcblx0eyAnYmFzZSc6J00nLCAnbGV0dGVycyc6L1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LFxuXHR7ICdiYXNlJzonTicsICdsZXR0ZXJzJzovW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSxcblx0eyAnYmFzZSc6J05KJywnbGV0dGVycyc6L1tcXHUwMUNBXS9nIH0sXG5cdHsgJ2Jhc2UnOidOaicsJ2xldHRlcnMnOi9bXFx1MDFDQl0vZyB9LFxuXHR7ICdiYXNlJzonTycsICdsZXR0ZXJzJzovW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2cgfSxcblx0eyAnYmFzZSc6J09JJywnbGV0dGVycyc6L1tcXHUwMUEyXS9nIH0sXG5cdHsgJ2Jhc2UnOidPTycsJ2xldHRlcnMnOi9bXFx1QTc0RV0vZyB9LFxuXHR7ICdiYXNlJzonT1UnLCdsZXR0ZXJzJzovW1xcdTAyMjJdL2cgfSxcblx0eyAnYmFzZSc6J1AnLCAnbGV0dGVycyc6L1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sXG5cdHsgJ2Jhc2UnOidRJywgJ2xldHRlcnMnOi9bXFx1MDA1MVxcdTI0QzZcXHVGRjMxXFx1QTc1NlxcdUE3NThcXHUwMjRBXS9nIH0sXG5cdHsgJ2Jhc2UnOidSJywgJ2xldHRlcnMnOi9bXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODJdL2cgfSxcblx0eyAnYmFzZSc6J1MnLCAnbGV0dGVycyc6L1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LFxuXHR7ICdiYXNlJzonVCcsICdsZXR0ZXJzJzovW1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nl0vZyB9LFxuXHR7ICdiYXNlJzonVFonLCdsZXR0ZXJzJzovW1xcdUE3MjhdL2cgfSxcblx0eyAnYmFzZSc6J1UnLCAnbGV0dGVycyc6L1tcXHUwMDU1XFx1MjRDQVxcdUZGMzVcXHUwMEQ5XFx1MDBEQVxcdTAwREJcXHUwMTY4XFx1MUU3OFxcdTAxNkFcXHUxRTdBXFx1MDE2Q1xcdTAwRENcXHUwMURCXFx1MDFEN1xcdTAxRDVcXHUwMUQ5XFx1MUVFNlxcdTAxNkVcXHUwMTcwXFx1MDFEM1xcdTAyMTRcXHUwMjE2XFx1MDFBRlxcdTFFRUFcXHUxRUU4XFx1MUVFRVxcdTFFRUNcXHUxRUYwXFx1MUVFNFxcdTFFNzJcXHUwMTcyXFx1MUU3NlxcdTFFNzRcXHUwMjQ0XS9nIH0sXG5cdHsgJ2Jhc2UnOidWJywgJ2xldHRlcnMnOi9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSxcblx0eyAnYmFzZSc6J1ZZJywnbGV0dGVycyc6L1tcXHVBNzYwXS9nIH0sXG5cdHsgJ2Jhc2UnOidXJywgJ2xldHRlcnMnOi9bXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Ml0vZyB9LFxuXHR7ICdiYXNlJzonWCcsICdsZXR0ZXJzJzovW1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDXS9nIH0sXG5cdHsgJ2Jhc2UnOidZJywgJ2xldHRlcnMnOi9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sXG5cdHsgJ2Jhc2UnOidaJywgJ2xldHRlcnMnOi9bXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjJdL2cgfSxcblx0eyAnYmFzZSc6J2EnLCAnbGV0dGVycyc6L1tcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MF0vZyB9LFxuXHR7ICdiYXNlJzonYWEnLCdsZXR0ZXJzJzovW1xcdUE3MzNdL2cgfSxcblx0eyAnYmFzZSc6J2FlJywnbGV0dGVycyc6L1tcXHUwMEU2XFx1MDFGRFxcdTAxRTNdL2cgfSxcblx0eyAnYmFzZSc6J2FvJywnbGV0dGVycyc6L1tcXHVBNzM1XS9nIH0sXG5cdHsgJ2Jhc2UnOidhdScsJ2xldHRlcnMnOi9bXFx1QTczN10vZyB9LFxuXHR7ICdiYXNlJzonYXYnLCdsZXR0ZXJzJzovW1xcdUE3MzlcXHVBNzNCXS9nIH0sXG5cdHsgJ2Jhc2UnOidheScsJ2xldHRlcnMnOi9bXFx1QTczRF0vZyB9LFxuXHR7ICdiYXNlJzonYicsICdsZXR0ZXJzJzovW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LFxuXHR7ICdiYXNlJzonYycsICdsZXR0ZXJzJzovW1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODRdL2cgfSxcblx0eyAnYmFzZSc6J2QnLCAnbGV0dGVycyc6L1tcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QV0vZyB9LFxuXHR7ICdiYXNlJzonZHonLCdsZXR0ZXJzJzovW1xcdTAxRjNcXHUwMUM2XS9nIH0sXG5cdHsgJ2Jhc2UnOidlJywgJ2xldHRlcnMnOi9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LFxuXHR7ICdiYXNlJzonZicsICdsZXR0ZXJzJzovW1xcdTAwNjZcXHUyNEQ1XFx1RkY0NlxcdTFFMUZcXHUwMTkyXFx1QTc3Q10vZyB9LFxuXHR7ICdiYXNlJzonZycsICdsZXR0ZXJzJzovW1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rl0vZyB9LFxuXHR7ICdiYXNlJzonaCcsICdsZXR0ZXJzJzovW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LFxuXHR7ICdiYXNlJzonaHYnLCdsZXR0ZXJzJzovW1xcdTAxOTVdL2cgfSxcblx0eyAnYmFzZSc6J2knLCAnbGV0dGVycyc6L1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LFxuXHR7ICdiYXNlJzonaicsICdsZXR0ZXJzJzovW1xcdTAwNkFcXHUyNEQ5XFx1RkY0QVxcdTAxMzVcXHUwMUYwXFx1MDI0OV0vZyB9LFxuXHR7ICdiYXNlJzonaycsICdsZXR0ZXJzJzovW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sXG5cdHsgJ2Jhc2UnOidsJywgJ2xldHRlcnMnOi9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LFxuXHR7ICdiYXNlJzonbGonLCdsZXR0ZXJzJzovW1xcdTAxQzldL2cgfSxcblx0eyAnYmFzZSc6J20nLCAnbGV0dGVycyc6L1tcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2Rl0vZyB9LFxuXHR7ICdiYXNlJzonbicsICdsZXR0ZXJzJzovW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sXG5cdHsgJ2Jhc2UnOiduaicsJ2xldHRlcnMnOi9bXFx1MDFDQ10vZyB9LFxuXHR7ICdiYXNlJzonbycsICdsZXR0ZXJzJzovW1xcdTAwNkZcXHUyNERFXFx1RkY0RlxcdTAwRjJcXHUwMEYzXFx1MDBGNFxcdTFFRDNcXHUxRUQxXFx1MUVEN1xcdTFFRDVcXHUwMEY1XFx1MUU0RFxcdTAyMkRcXHUxRTRGXFx1MDE0RFxcdTFFNTFcXHUxRTUzXFx1MDE0RlxcdTAyMkZcXHUwMjMxXFx1MDBGNlxcdTAyMkJcXHUxRUNGXFx1MDE1MVxcdTAxRDJcXHUwMjBEXFx1MDIwRlxcdTAxQTFcXHUxRUREXFx1MUVEQlxcdTFFRTFcXHUxRURGXFx1MUVFM1xcdTFFQ0RcXHUxRUQ5XFx1MDFFQlxcdTAxRURcXHUwMEY4XFx1MDFGRlxcdTAyNTRcXHVBNzRCXFx1QTc0RFxcdTAyNzVdL2cgfSxcblx0eyAnYmFzZSc6J29pJywnbGV0dGVycyc6L1tcXHUwMUEzXS9nIH0sXG5cdHsgJ2Jhc2UnOidvdScsJ2xldHRlcnMnOi9bXFx1MDIyM10vZyB9LFxuXHR7ICdiYXNlJzonb28nLCdsZXR0ZXJzJzovW1xcdUE3NEZdL2cgfSxcblx0eyAnYmFzZSc6J3AnLCAnbGV0dGVycyc6L1tcXHUwMDcwXFx1MjRERlxcdUZGNTBcXHUxRTU1XFx1MUU1N1xcdTAxQTVcXHUxRDdEXFx1QTc1MVxcdUE3NTNcXHVBNzU1XS9nIH0sXG5cdHsgJ2Jhc2UnOidxJywgJ2xldHRlcnMnOi9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sXG5cdHsgJ2Jhc2UnOidyJywgJ2xldHRlcnMnOi9bXFx1MDA3MlxcdTI0RTFcXHVGRjUyXFx1MDE1NVxcdTFFNTlcXHUwMTU5XFx1MDIxMVxcdTAyMTNcXHUxRTVCXFx1MUU1RFxcdTAxNTdcXHUxRTVGXFx1MDI0RFxcdTAyN0RcXHVBNzVCXFx1QTdBN1xcdUE3ODNdL2cgfSxcblx0eyAnYmFzZSc6J3MnLCAnbGV0dGVycyc6L1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2cgfSxcblx0eyAnYmFzZSc6J3QnLCAnbGV0dGVycyc6L1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sXG5cdHsgJ2Jhc2UnOid0eicsJ2xldHRlcnMnOi9bXFx1QTcyOV0vZyB9LFxuXHR7ICdiYXNlJzondScsICdsZXR0ZXJzJzovW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSxcblx0eyAnYmFzZSc6J3YnLCAnbGV0dGVycyc6L1tcXHUwMDc2XFx1MjRFNVxcdUZGNTZcXHUxRTdEXFx1MUU3RlxcdTAyOEJcXHVBNzVGXFx1MDI4Q10vZyB9LFxuXHR7ICdiYXNlJzondnknLCdsZXR0ZXJzJzovW1xcdUE3NjFdL2cgfSxcblx0eyAnYmFzZSc6J3cnLCAnbGV0dGVycyc6L1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LFxuXHR7ICdiYXNlJzoneCcsICdsZXR0ZXJzJzovW1xcdTAwNzhcXHUyNEU3XFx1RkY1OFxcdTFFOEJcXHUxRThEXS9nIH0sXG5cdHsgJ2Jhc2UnOid5JywgJ2xldHRlcnMnOi9bXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRl0vZyB9LFxuXHR7ICdiYXNlJzoneicsICdsZXR0ZXJzJzovW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH0sXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyAoc3RyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3RyID0gc3RyLnJlcGxhY2UobWFwW2ldLmxldHRlcnMsIG1hcFtpXS5iYXNlKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgSW5wdXQgZnJvbSBcInJlYWN0LWlucHV0LWF1dG9zaXplXCI7XG5pbXBvcnQgVGV0aGVyQ29tcG9uZW50IGZyb20gXCJyZWFjdC10ZXRoZXJcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gXCJibGFja2xpc3RcIjtcbmltcG9ydCBzdHJpcERpYWNyaXRpY3MgZnJvbSBcIi4vdXRpbHMvc3RyaXBEaWFjcml0aWNzXCI7XG5pbXBvcnQgQXN5bmMgZnJvbSBcIi4vQXN5bmNcIjtcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4vT3B0aW9uXCI7XG5pbXBvcnQgVmFsdWUgZnJvbSBcIi4vVmFsdWVcIjtcblxuZnVuY3Rpb24gc3RyaW5naWZ5VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmNvbnN0IHN0cmluZ09yTm9kZSA9IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgUmVhY3QuUHJvcFR5cGVzLm5vZGVcbl0pO1xuXG5sZXQgaW5zdGFuY2VJZCA9IDE7XG5cbmNvbnN0IFNlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIGRpc3BsYXlOYW1lOiAnU2VsZWN0JyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBhZGRMYWJlbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHlvdSB3YW50IHRvIGFkZCBhIGxhYmVsIG9uIGEgbXVsdGktdmFsdWUgaW5wdXRcbiAgICAgICAgYWxsb3dDcmVhdGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAvLyB3aGV0aGVyIHRvIGFsbG93IGNyZWF0aW9uIG9mIG5ldyBlbnRyaWVzXG4gICAgICAgICdhcmlhLWxhYmVsJzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcdFx0Ly8gQXJpYSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuICAgICAgICBhdXRvQmx1cjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgYmx1ciB0aGUgY29tcG9uZW50IHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkXG4gICAgICAgIGF1dG9mb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcbiAgICAgICAgYXV0b3NpemU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBhdXRvc2l6aW5nIG9yIG5vdFxuICAgICAgICBiYWNrc3BhY2VSZW1vdmVzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgIC8vIHdoZXRoZXIgYmFja3NwYWNlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG4gICAgICAgIGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgIC8vIE1lc3NhZ2UgdG8gdXNlIGZvciBzY3JlZW5yZWFkZXJzIHRvIHByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHtsYWJlbH0gaXMgcmVwbGFjZWQgd2l0aCB0aGUgaXRlbSBsYWJlbFxuICAgICAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIGNsYXNzTmFtZSBmb3IgdGhlIG91dGVyIGVsZW1lbnRcbiAgICAgICAgY2xlYXJBbGxUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sIHdoZW4gbXVsdGk6IHRydWVcbiAgICAgICAgY2xlYXJWYWx1ZVRleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sXG4gICAgICAgIGNsZWFyYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG4gICAgICAgIGRlbGltaXRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gZGVsaW1pdGVyIHRvIHVzZSB0byBqb2luIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhlIGhpZGRlbiBmaWVsZCB2YWx1ZVxuICAgICAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBkaXNhYmxlZCBvciBub3RcbiAgICAgICAgZXNjYXBlQ2xlYXJzVmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGVzY2FwZSBjbGVhcnMgdGhlIHZhbHVlIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG4gICAgICAgIGZpbHRlck9wdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb24gKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuICAgICAgICBmaWx0ZXJPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIGRlZmF1bHQgZmlsdGVyaW5nIG9yIGZ1bmN0aW9uIHRvIGZpbHRlciB0aGUgb3B0aW9ucyBhcnJheSAoW29wdGlvbnNdLCBmaWx0ZXJTdHJpbmcsIFt2YWx1ZXNdKVxuICAgICAgICBpZ25vcmVBY2NlbnRzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgIC8vIHdoZXRoZXIgdG8gc3RyaXAgZGlhY3JpdGljcyB3aGVuIGZpbHRlcmluZ1xuICAgICAgICBpZ25vcmVDYXNlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZ1xuICAgICAgICBpbnB1dFByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAgICAgICAgIC8vIGN1c3RvbSBhdHRyaWJ1dGVzIGZvciB0aGUgSW5wdXRcbiAgICAgICAgaW5wdXRSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyByZXR1cm5zIGEgY3VzdG9tIGlucHV0IGNvbXBvbmVudFxuICAgICAgICBpc0xvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBsb2FkaW5nIGV4dGVybmFsbHkgb3Igbm90IChzdWNoIGFzIG9wdGlvbnMgYmVpbmcgbG9hZGVkKVxuICAgICAgICBqb2luVmFsdWVzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcbiAgICAgICAgbGFiZWxLZXk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuICAgICAgICBtYXRjaFBvczogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIChhbnl8c3RhcnQpIG1hdGNoIHRoZSBzdGFydCBvciBlbnRpcmUgc3RyaW5nIHdoZW4gZmlsdGVyaW5nXG4gICAgICAgIG1hdGNoUHJvcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gKGFueXxsYWJlbHx2YWx1ZSkgd2hpY2ggb3B0aW9uIHByb3BlcnR5IHRvIGZpbHRlciBvblxuICAgICAgICBtZW51QnVmZmVyOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCAgICAgICAgIC8vIG9wdGlvbmFsIGJ1ZmZlciAoaW4gcHgpIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgYW5kIHRoZSBib3R0b20gb2YgdGhlIG1lbnVcbiAgICAgICAgbWVudUNvbnRhaW5lclN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudSBjb250YWluZXJcbiAgICAgICAgbWVudVJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG4gICAgICAgIG1lbnVTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnVcbiAgICAgICAgbXVsdGk6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIGhpZGRlbiA8aW5wdXQgLz4gdGFnIHdpdGggdGhpcyBmaWVsZCBuYW1lIGZvciBodG1sIGZvcm1zXG4gICAgICAgIG5ld09wdGlvbkNyZWF0b3I6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgLy8gZmFjdG9yeSB0byBjcmVhdGUgbmV3IG9wdGlvbnMgd2hlbiBhbGxvd0NyZWF0ZSBzZXRcbiAgICAgICAgbm9SZXN1bHRzVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hpbmcgc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgb25CbHVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBvbkJsdXIgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuICAgICAgICBvbkJsdXJSZXNldHNJbnB1dDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBibHVyXG4gICAgICAgIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuICAgICAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG4gICAgICAgIG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgLy8gb25Gb2N1cyBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG4gICAgICAgIG9uSW5wdXRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gb25JbnB1dENoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cbiAgICAgICAgb25NZW51U2Nyb2xsVG9Cb3R0b206IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b207IGNhbiBiZSB1c2VkIHRvIHBhZ2luYXRlIG9wdGlvbnNcbiAgICAgICAgb25PcGVuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIG9wZW5lZFxuICAgICAgICBvblZhbHVlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgIC8vIG9uQ2xpY2sgaGFuZGxlciBmb3IgdmFsdWUgbGFiZWxzOiBmdW5jdGlvbiAodmFsdWUsIGV2ZW50KSB7fVxuICAgICAgICBvcGVuQWZ0ZXJGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHRcdC8vIGJvb2xlYW4gdG8gZW5hYmxlIG9wZW5pbmcgZHJvcGRvd24gd2hlbiBmb2N1c2VkXG4gICAgICAgIG9wZW5PbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgLy8gYWx3YXlzIG9wZW4gb3B0aW9ucyBtZW51IG9uIGZvY3VzXG4gICAgICAgIG9wdGlvbkNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgLy8gYWRkaXRpb25hbCBjbGFzcyhlcykgdG8gYXBwbHkgdG8gdGhlIDxPcHRpb24gLz4gZWxlbWVudHNcbiAgICAgICAgb3B0aW9uQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAvLyBvcHRpb24gY29tcG9uZW50IHRvIHJlbmRlciBpbiBkcm9wZG93blxuICAgICAgICBvcHRpb25SZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIG9wdGlvblJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuICAgICAgICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9wdGlvbnNcbiAgICAgICAgcGFnZVNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgICAvLyBudW1iZXIgb2YgZW50cmllcyB0byBwYWdlIHdoZW4gdXNpbmcgcGFnZSB1cC9kb3duIGtleXNcbiAgICAgICAgcGxhY2Vob2xkZXI6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxuICAgICAgICByZXF1aXJlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIGFwcGxpZXMgSFRNTDUgcmVxdWlyZWQgYXR0cmlidXRlIHdoZW4gbmVlZGVkXG4gICAgICAgIHJlc2V0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgLy8gdmFsdWUgdG8gdXNlIHdoZW4geW91IGNsZWFyIHRoZSBjb250cm9sXG4gICAgICAgIHNjcm9sbE1lbnVJbnRvVmlldzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgLy8gYm9vbGVhbiB0byBlbmFibGUgdGhlIHZpZXdwb3J0IHRvIHNoaWZ0IHNvIHRoYXQgdGhlIGZ1bGwgbWVudSBmdWxseSB2aXNpYmxlIHdoZW4gZW5nYWdlZFxuICAgICAgICBzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gZW5hYmxlIHNlYXJjaGluZyBmZWF0dXJlIG9yIG5vdFxuICAgICAgICBzaW1wbGVWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlIHRvIG9uQ2hhbmdlIGFzIGEgc2ltcGxlIHZhbHVlIChsZWdhY3kgcHJlIDEuMCBtb2RlKSwgZGVmYXVsdHMgdG8gZmFsc2VcbiAgICAgICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29udHJvbFxuICAgICAgICB0YWJJbmRleDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIG9wdGlvbmFsIHRhYiBpbmRleCBvZiB0aGUgY29udHJvbFxuICAgICAgICB0YWJTZWxlY3RzVmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgIC8vIHdoZXRoZXIgdG8gdHJlYXQgdGFiYmluZyBvdXQgd2hpbGUgZm9jdXNlZCB0byBiZSB2YWx1ZSBzZWxlY3Rpb25cbiAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG4gICAgICAgIHZhbHVlQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gdmFsdWUgY29tcG9uZW50IHRvIHJlbmRlclxuICAgICAgICB2YWx1ZUtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG4gICAgICAgIHZhbHVlUmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gdmFsdWVSZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cbiAgICAgICAgd3JhcHBlclN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdyYXBwZXJcbiAgICB9LFxuXG4gICAgc3RhdGljczoge0FzeW5jfSxcblxuICAgIGdldERlZmF1bHRQcm9wcyAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZGRMYWJlbFRleHQ6ICdBZGQgXCJ7bGFiZWx9XCI/JyxcbiAgICAgICAgICAgIGF1dG9zaXplOiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dDcmVhdGU6IGZhbHNlLFxuICAgICAgICAgICAgYmFja3NwYWNlUmVtb3ZlczogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogJ1ByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUge2xhYmVsfScsXG4gICAgICAgICAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjbGVhckFsbFRleHQ6ICdDbGVhciBhbGwnLFxuICAgICAgICAgICAgY2xlYXJWYWx1ZVRleHQ6ICdDbGVhciB2YWx1ZScsXG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGVzY2FwZUNsZWFyc1ZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IHRydWUsXG4gICAgICAgICAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgICAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgam9pblZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbEtleTogJ2xhYmVsJyxcbiAgICAgICAgICAgIG1hdGNoUG9zOiAnYW55JyxcbiAgICAgICAgICAgIG1hdGNoUHJvcDogJ2FueScsXG4gICAgICAgICAgICBtZW51QnVmZmVyOiAwLFxuICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxuICAgICAgICAgICAgb25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG4gICAgICAgICAgICBvcGVuQWZ0ZXJGb2N1czogZmFsc2UsXG4gICAgICAgICAgICBvcHRpb25Db21wb25lbnQ6IE9wdGlvbixcbiAgICAgICAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVzZXRWYWx1ZTogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbE1lbnVJbnRvVmlldzogdHJ1ZSxcbiAgICAgICAgICAgIHNlYXJjaGFibGU6IHRydWUsXG4gICAgICAgICAgICBzaW1wbGVWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZUNvbXBvbmVudDogVmFsdWUsXG4gICAgICAgICAgICB2YWx1ZUtleTogJ3ZhbHVlJyxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgICAgICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgaXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAoKytpbnN0YW5jZUlkKSArICctJztcbiAgICAgICAgY29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucG9zaXRpb25NZW51Q29udGFpbmVyLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnBvc2l0aW9uTWVudUNvbnRhaW5lcik7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkobmV4dFByb3BzLnZhbHVlLCBuZXh0UHJvcHMpO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICBpZiAobmV4dFN0YXRlLmlzT3BlbiAhPT0gdGhpcy5zdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXh0U3RhdGUuaXNPcGVuID8gbmV4dFByb3BzLm9uT3BlbiA6IG5leHRQcm9wcy5vbkNsb3NlO1xuICAgICAgICAgICAgaGFuZGxlciAmJiBoYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICAvLyBmb2N1cyB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgIGlmICh0aGlzLnJlZnMubWVudSAmJiB0aGlzLnJlZnMuZm9jdXNlZCAmJiB0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uKSB7XG4gICAgICAgICAgICBsZXQgZm9jdXNlZE9wdGlvbk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZm9jdXNlZCk7XG4gICAgICAgICAgICBsZXQgbWVudU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWVudSk7XG4gICAgICAgICAgICBtZW51Tm9kZS5zY3JvbGxUb3AgPSBmb2N1c2VkT3B0aW9uTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICB0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgJiYgdGhpcy5yZWZzLmZvY3VzZWQgJiYgdGhpcy5yZWZzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZm9jdXNlZERPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5mb2N1c2VkKTtcbiAgICAgICAgICAgIHZhciBtZW51RE9NID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1lbnUpO1xuICAgICAgICAgICAgdmFyIGZvY3VzZWRSZWN0ID0gZm9jdXNlZERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBtZW51UmVjdCA9IG1lbnVET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoZm9jdXNlZFJlY3QuYm90dG9tID4gbWVudVJlY3QuYm90dG9tIHx8IGZvY3VzZWRSZWN0LnRvcCA8IG1lbnVSZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgIG1lbnVET00uc2Nyb2xsVG9wID0gKGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2Nyb2xsTWVudUludG9WaWV3ICYmIHRoaXMucmVmcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgbWVudUNvbnRhaW5lclJlY3QgPSB0aGlzLnJlZnMubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyIC0gd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldlByb3BzLmRpc2FibGVkICE9PSB0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IGZhbHNlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3NpdGlvbk1lbnVDb250YWluZXIoKTtcbiAgICB9LFxuXG4gICAgcG9zaXRpb25NZW51Q29udGFpbmVyKCkge1xuICAgICAgICAvLyBUZXRoZXJlZCBjb250YWluZXIgd2lkdGhcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICBsZXQgbWVudUNvbnRhaW5lck5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWVudUNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udHJvbE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udHJvbCk7XG4gICAgICAgICAgICBtZW51Q29udGFpbmVyTm9kZS5zdHlsZS53aWR0aCA9IGNvbnRyb2xOb2RlLm9mZnNldFdpZHRoICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvY3VzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlZnMuaW5wdXQpIHJldHVybjtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3BlbkFmdGVyRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsdXJJbnB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlZnMuaW5wdXQpIHJldHVybjtcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmJsdXIoKTtcbiAgICB9LFxuXG4gICAgaGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuICAgICAgICAvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgaGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcbiAgICAgICAgLy8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGFuZGxlVG91Y2hFbmQgKGV2ZW50KSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgICAgIC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuICAgICAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoRW5kQ2xlYXJWYWx1ZSAoZXZlbnQpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG4gICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIHZhbHVlXG4gICAgICAgIHRoaXMuY2xlYXJWYWx1ZShldmVudCk7XG4gICAgfSxcblxuICAgIGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuICAgICAgICAvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGZvciB0aGUgbm9uLXNlYXJjaGFibGUgc2VsZWN0LCB0b2dnbGUgdGhlIG1lbnVcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICAvLyBPbiBpT1MsIHdlIGNhbiBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHdlIHRoaW5rIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGJ1dCBpdCBpc24ndCByZWFsbHksXG4gICAgICAgICAgICAvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG4gICAgICAgICAgICAvLyBDYWxsIGZvY3VzKCkgYWdhaW4gaGVyZSB0byBiZSBzYWZlLlxuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgICAgICAvLyBjbGVhcnMgdmFsdWUgc28gdGhhdCB0aGUgY3Vyc29yIHdpbGwgYmUgYSB0aGUgZW5kIG9mIGlucHV0IHRoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXG4gICAgICAgICAgICB0aGlzLnJlZnMuaW5wdXQuZ2V0SW5wdXQoKS52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaW5wdXQgaXMgZm9jdXNlZCwgZW5zdXJlIHRoZSBtZW51IGlzIG9wZW5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGZvY3VzIHRoZSBpbnB1dCBhbmQgb3BlbiB0aGUgbWVudVxuICAgICAgICAgICAgdGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZU1vdXNlRG93bk9uQXJyb3cgKGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcbiAgICAgICAgLy8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNsb3NlIHRoZSBtZW51XG4gICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XG4gICAgfSxcblxuICAgIGhhbmRsZU1vdXNlRG93bk9uTWVudSAoZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuICAgICAgICAvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9LFxuXG4gICAgY2xvc2VNZW51ICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgaXNQc2V1ZG9Gb2N1c2VkOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiAhdGhpcy5wcm9wcy5tdWx0aSxcbiAgICAgICAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGhhbmRsZUlucHV0Rm9jdXMgKGV2ZW50KSB7XG4gICAgICAgIHZhciBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbiB8fCB0aGlzLl9vcGVuQWZ0ZXJGb2N1cyB8fCB0aGlzLnByb3BzLm9wZW5PbkZvY3VzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNGb2N1c2VkOiB0cnVlLFxuICAgICAgICAgICAgaXNPcGVuOiBpc09wZW5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGhhbmRsZUlucHV0Qmx1ciAoZXZlbnQpIHtcbiAgICAgICAgLy8gVGhlIGNoZWNrIGZvciBtZW51LmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IElFMTEncyBzY3JvbGxiYXIgZnJvbSBjbG9zaW5nIHRoZSBtZW51IGluIGNlcnRhaW4gY29udGV4dHMuXG4gICAgICAgIGlmICh0aGlzLnJlZnMubWVudSAmJiAodGhpcy5yZWZzLm1lbnUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy5yZWZzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb25CbHVycmVkU3RhdGUgPSB7XG4gICAgICAgICAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XG4gICAgICAgICAgICBvbkJsdXJyZWRTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShvbkJsdXJyZWRTdGF0ZSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUlucHV0Q2hhbmdlIChldmVudCkge1xuICAgICAgICBsZXQgbmV3SW5wdXRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlICYmIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xuICAgICAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShuZXdJbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIC8vIE5vdGU6ICE9IHVzZWQgZGVsaWJlcmF0ZWx5IGhlcmUgdG8gY2F0Y2ggdW5kZWZpbmVkIGFuZCBudWxsXG4gICAgICAgICAgICBpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgdHlwZW9mIG5leHRTdGF0ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJbnB1dFZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc09wZW46IHRydWUsXG4gICAgICAgICAgICBpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlS2V5RG93biAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDg6IC8vIGJhY2tzcGFjZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgOTogLy8gdGFiXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5IHx8ICF0aGlzLnN0YXRlLmlzT3BlbiB8fCAhdGhpcy5wcm9wcy50YWJTZWxlY3RzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHJldHVybjtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjc6IC8vIGVzY2FwZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2xlYXJhYmxlICYmIHRoaXMucHJvcHMuZXNjYXBlQ2xlYXJzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODogLy8gdXBcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXNPcHRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6IC8vIGRvd25cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzMzogLy8gcGFnZSB1cFxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNQYWdlVXBPcHRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vIHBhZ2UgZG93blxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNQYWdlRG93bk9wdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzNTogLy8gZW5kIGtleVxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNFbmRPcHRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzY6IC8vIGhvbWUga2V5XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c1N0YXJ0T3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBjYXNlIDE4ODogLy8gLFxuICAgICAgICAgICAgLy8gXHRpZiAodGhpcy5wcm9wcy5hbGxvd0NyZWF0ZSAmJiB0aGlzLnByb3BzLm11bHRpKSB7XG4gICAgICAgICAgICAvLyBcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIC8vIFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcbiAgICAgICAgICAgIC8vIFx0fSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx0XHRyZXR1cm47XG4gICAgICAgICAgICAvLyBcdH1cbiAgICAgICAgICAgIC8vIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuXG4gICAgaGFuZGxlVmFsdWVDbGljayAob3B0aW9uLCBldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMub25WYWx1ZUNsaWNrKSByZXR1cm47XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZUNsaWNrKG9wdGlvbiwgZXZlbnQpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVNZW51U2Nyb2xsIChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMub25NZW51U2Nyb2xsVG9Cb3R0b20pIHJldHVybjtcbiAgICAgICAgbGV0IHt0YXJnZXR9ID0gZXZlbnQ7XG4gICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsSGVpZ2h0ID4gdGFyZ2V0Lm9mZnNldEhlaWdodCAmJiAhKHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQub2Zmc2V0SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbFRvcCkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25NZW51U2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVSZXF1aXJlZCAodmFsdWUsIG11bHRpKSB7XG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gKG11bHRpID8gdmFsdWUubGVuZ3RoID09PSAwIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcblxuICAgIGdldE9wdGlvbkxhYmVsIChvcCkge1xuICAgICAgICByZXR1cm4gb3BbdGhpcy5wcm9wcy5sYWJlbEtleV07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGEgdmFsdWUgaW50byBhbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zXG4gICAgICogQHBhcmFtICAgIHtTdHJpbmd8TnVtYmVyfEFycmF5fSAgICB2YWx1ZSAgICAgICAgLSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBpbnB1dFxuICAgICAqIEBwYXJhbSAgICB7T2JqZWN0fSAgICAgICAgbmV4dFByb3BzICAgIC0gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBuZXh0UHJvcHMgc28gdGhlIHJldHVybmVkIGFycmF5IHVzZXMgdGhlIGxhdGVzdCBjb25maWd1cmF0aW9uXG4gICAgICogQHJldHVybnMgICAge0FycmF5fSAgICB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCByZXByZXNlbnRlZCBpbiBhbiBhcnJheVxuICAgICAqL1xuICAgIGdldFZhbHVlQXJyYXkgKHZhbHVlLCBuZXh0UHJvcHMpIHtcbiAgICAgICAgLyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG4gICAgICAgIGNvbnN0IHByb3BzID0gdHlwZW9mIG5leHRQcm9wcyA9PT0gJ29iamVjdCcgPyBuZXh0UHJvcHMgOiB0aGlzLnByb3BzO1xuICAgICAgICBpZiAocHJvcHMubXVsdGkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB2YWx1ZSA9IHZhbHVlLnNwbGl0KHByb3BzLmRlbGltaXRlcik7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKHZhbHVlID0+IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSkuZmlsdGVyKGkgPT4gaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4cGFuZGVkVmFsdWUgPSB0aGlzLmV4cGFuZFZhbHVlKHZhbHVlLCBwcm9wcyk7XG4gICAgICAgIHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgdmFsdWVLZXlcbiAgICAgKiBAcGFyYW0gICAge1N0cmluZ3xOdW1iZXJ8QXJyYXl9ICAgIHZhbHVlICAgIC0gdGhlIHNlbGVjdGVkIHZhbHVlKHMpXG4gICAgICogQHBhcmFtICAgIHtPYmplY3R9ICAgICAgICBwcm9wcyAgICAtIHRoZSBTZWxlY3QgY29tcG9uZW50J3MgcHJvcHMgKG9yIG5leHRQcm9wcylcbiAgICAgKi9cbiAgICBleHBhbmRWYWx1ZSAodmFsdWUsIHByb3BzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgbGV0IHtvcHRpb25zLCB2YWx1ZUtleX0gPSBwcm9wcztcbiAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV1bdmFsdWVLZXldID09PSB2YWx1ZSkgcmV0dXJuIG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0VmFsdWUgKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9CbHVyKSB7XG4gICAgICAgICAgICB0aGlzLmJsdXJJbnB1dCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5vbkNoYW5nZSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlcXVpcmVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2ltcGxlVmFsdWUgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlLm1hcChpID0+IGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpIDogdmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIHNlbGVjdFZhbHVlICh2YWx1ZSkge1xuICAgICAgICAvL05PVEU6IHVwZGF0ZSB2YWx1ZSBpbiB0aGUgY2FsbGJhY2sgdG8gbWFrZSBzdXJlIHRoZSBpbnB1dCB2YWx1ZSBpcyBlbXB0eSBzbyB0aGF0IHRoZXJlIGFyZSBubyBzdHR5bGluZyBpc3N1ZXMgKENocm9tZSBoYWQgaXNzdWUgb3RoZXJ3aXNlKVxuICAgICAgICB0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGZvY3VzZWRJbmRleDogbnVsbFxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgICAgICAgICAgIGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRWYWx1ZSAodmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5jb25jYXQodmFsdWUpKTtcbiAgICB9LFxuXG4gICAgcG9wVmFsdWUgKCkge1xuICAgICAgICB2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgICAgaWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAodmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdLmNsZWFyYWJsZVZhbHVlID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuc2xpY2UoMCwgdmFsdWVBcnJheS5sZW5ndGggLSAxKSk7XG4gICAgfSxcblxuICAgIHJlbW92ZVZhbHVlICh2YWx1ZSkge1xuICAgICAgICB2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmZpbHRlcihpID0+IGkgIT09IHZhbHVlKSk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9LFxuXG4gICAgY2xlYXJWYWx1ZSAoZXZlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuICAgICAgICAvLyBidXR0b24sIGlnbm9yZSBpdC5cbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMucHJvcHMucmVzZXRWYWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgICB9LCB0aGlzLmZvY3VzKTtcbiAgICB9LFxuXG4gICAgZm9jdXNPcHRpb24gKG9wdGlvbikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGZvY3VzZWRPcHRpb246IG9wdGlvblxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZm9jdXNOZXh0T3B0aW9uICgpIHtcbiAgICAgICAgdGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG4gICAgfSxcblxuICAgIGZvY3VzUHJldmlvdXNPcHRpb24gKCkge1xuICAgICAgICB0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG4gICAgfSxcblxuICAgIGZvY3VzUGFnZVVwT3B0aW9uICgpIHtcbiAgICAgICAgdGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX3VwJyk7XG4gICAgfSxcblxuICAgIGZvY3VzUGFnZURvd25PcHRpb24gKCkge1xuICAgICAgICB0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfZG93bicpO1xuICAgIH0sXG5cbiAgICBmb2N1c1N0YXJ0T3B0aW9uICgpIHtcbiAgICAgICAgdGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdzdGFydCcpO1xuICAgIH0sXG5cbiAgICBmb2N1c0VuZE9wdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignZW5kJyk7XG4gICAgfSxcblxuICAgIGZvY3VzQWRqYWNlbnRPcHRpb24gKGRpcikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zXG4gICAgICAgICAgICAubWFwKChvcHRpb24sIGluZGV4KSA9PiAoe29wdGlvbiwgaW5kZXh9KSlcbiAgICAgICAgICAgIC5maWx0ZXIob3B0aW9uID0+ICFvcHRpb24ub3B0aW9uLmRpc2FibGVkKTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpc09wZW46IHRydWUsXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHZhciBmb2N1c2VkSW5kZXggPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcbiAgICAgICAgICAgICAgICBmb2N1c2VkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkaXIgPT09ICduZXh0JyAmJiBmb2N1c2VkSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBmb2N1c2VkSW5kZXggPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcbiAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICBmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV91cCcpIHtcbiAgICAgICAgICAgIHZhciBwb3RlbnRpYWxJbmRleCA9IGZvY3VzZWRJbmRleCAtIHRoaXMucHJvcHMucGFnZVNpemU7XG4gICAgICAgICAgICBpZiAocG90ZW50aWFsSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV9kb3duJykge1xuICAgICAgICAgICAgdmFyIHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4ICsgdGhpcy5wcm9wcy5wYWdlU2l6ZTtcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWxJbmRleCA+IG9wdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgZm9jdXNlZEluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZm9jdXNlZEluZGV4OiBvcHRpb25zW2ZvY3VzZWRJbmRleF0uaW5kZXgsXG4gICAgICAgICAgICBmb2N1c2VkT3B0aW9uOiBvcHRpb25zW2ZvY3VzZWRJbmRleF0ub3B0aW9uXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZWxlY3RGb2N1c2VkT3B0aW9uICgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMucHJvcHMuYWxsb3dDcmVhdGUgJiYgIXRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbikge1xuICAgICAgICAvLyBcdHJldHVybiB0aGlzLnNlbGVjdFZhbHVlKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFZhbHVlKHRoaXMuX2ZvY3VzZWRPcHRpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlckxvYWRpbmcgKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtbG9hZGluZy16b25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nXCIvPlxuXHRcdFx0PC9zcGFuPlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXJWYWx1ZSAodmFsdWVBcnJheSwgaXNPcGVuKSB7XG4gICAgICAgIGxldCByZW5kZXJMYWJlbCA9IHRoaXMucHJvcHMudmFsdWVSZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsO1xuICAgICAgICBsZXQgVmFsdWVDb21wb25lbnQgPSB0aGlzLnByb3BzLnZhbHVlQ29tcG9uZW50O1xuICAgICAgICBpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA/IDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXBsYWNlaG9sZGVyXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9PC9kaXY+IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb25DbGljayA9IHRoaXMucHJvcHMub25WYWx1ZUNsaWNrID8gdGhpcy5oYW5kbGVWYWx1ZUNsaWNrIDogbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZUFycmF5Lm1hcCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8VmFsdWVDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtJyArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVByZWZpeD17dGhpcy5faW5zdGFuY2VQcmVmaXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB2YWx1ZS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2B2YWx1ZS0ke2l9LSR7dmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV19YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17dGhpcy5yZW1vdmVWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JlbmRlckxhYmVsKHZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1hcmlhLW9ubHlcIj4mbmJzcDs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvVmFsdWVDb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc09wZW4pIG9uQ2xpY2sgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VmFsdWVDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS1pdGVtJ31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlQXJyYXlbMF19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVyTGFiZWwodmFsdWVBcnJheVswXSl9XG4gICAgICAgICAgICAgICAgPC9WYWx1ZUNvbXBvbmVudD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVySW5wdXQgKHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0LWlucHV0JywgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBpc09wZW4gPSAhIXRoaXMuc3RhdGUuaXNPcGVuO1xuXG4gICAgICAgICAgICBjb25zdCBhcmlhT3ducyA9IGNsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICAgIFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXG4gICAgICAgICAgICAgICAgW3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1iYWNrc3BhY2UtcmVtb3ZlLW1lc3NhZ2UnXTogdGhpcy5wcm9wcy5tdWx0aVxuICAgICAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcbiAgICAgICAgICAgICAgICAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaG93IHRoaXMgcHJvamVjdCBpbmNsdWRlcyBPYmplY3QuYXNzaWduKClcbiAgICAgICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLmlucHV0UHJvcHMsIHtcbiAgICAgICAgICAgICAgICByb2xlOiAnY29tYm9ib3gnLFxuICAgICAgICAgICAgICAgICdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG4gICAgICAgICAgICAgICAgJ2FyaWEtb3ducyc6IGFyaWFPd25zLFxuICAgICAgICAgICAgICAgICdhcmlhLWhhc3BvcHVwJzogJycgKyBpc09wZW4sXG4gICAgICAgICAgICAgICAgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG4gICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuICAgICAgICAgICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdGhpcy5zdGF0ZS5yZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdlByb3BzID0gYmxhY2tsaXN0KHRoaXMucHJvcHMuaW5wdXRQcm9wcywgJ2lucHV0Q2xhc3NOYW1lJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmRpdlByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtb3ducz17aXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnIDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17aXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXggfHwgMH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVJbnB1dEJsdXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLXJlYWRvbmx5PXsnJyArICEhdGhpcy5wcm9wcy5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Ym9yZGVyOiAwLCB3aWR0aDogMSwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9fS8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b3NpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgey4uLmlucHV0UHJvcHN9IG1pbldpZHRoPVwiNXB4XCIvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRQcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyQ2xlYXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuY2xlYXJhYmxlIHx8ICF0aGlzLnByb3BzLnZhbHVlIHx8ICh0aGlzLnByb3BzLm11bHRpICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCkgfHwgdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0aGlzLnByb3BzLmlzTG9hZGluZykgcmV0dXJuO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWNsZWFyLXpvbmVcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHR9XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXt0aGlzLnByb3BzLm11bHRpID8gdGhpcy5wcm9wcy5jbGVhckFsbFRleHQgOiB0aGlzLnByb3BzLmNsZWFyVmFsdWVUZXh0fVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuY2xlYXJWYWx1ZX1cbiAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWV9XG4gICAgICAgICAgICA+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhclwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiAnJnRpbWVzOyd9fS8+XG5cdFx0XHQ8L3NwYW4+XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIHJlbmRlckFycm93ICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvdy16b25lXCIgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvd30+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvd1wiIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3d9Lz5cblx0XHRcdDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgZmlsdGVyT3B0aW9ucyAoZXhjbHVkZU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyB8fCBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zLCBmaWx0ZXJWYWx1ZSwgZXhjbHVkZU9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaWdub3JlQWNjZW50cykge1xuICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlID0gc3RyaXBEaWFjcml0aWNzKGZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZSA9IGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhjbHVkZU9wdGlvbnMpIGV4Y2x1ZGVPcHRpb25zID0gZXhjbHVkZU9wdGlvbnMubWFwKGkgPT4gaVt0aGlzLnByb3BzLnZhbHVlS2V5XSk7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhjbHVkZU9wdGlvbnMgJiYgZXhjbHVkZU9wdGlvbnMuaW5kZXhPZihvcHRpb25bdGhpcy5wcm9wcy52YWx1ZUtleV0pID4gLTEpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJPcHRpb24pIHJldHVybiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbiwgZmlsdGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghZmlsdGVyVmFsdWUpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZVRlc3QgPSBTdHJpbmcob3B0aW9uW3RoaXMucHJvcHMudmFsdWVLZXldKTtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWxUZXN0ID0gU3RyaW5nKG9wdGlvblt0aGlzLnByb3BzLmxhYmVsS2V5XSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaWdub3JlQWNjZW50cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHN0cmlwRGlhY3JpdGljcyh2YWx1ZVRlc3QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IHN0cmlwRGlhY3JpdGljcyhsYWJlbFRlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gdmFsdWVUZXN0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gbGFiZWxUZXN0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1hdGNoUG9zID09PSAnc3RhcnQnID8gKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnICYmIGxhYmVsVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUpXG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKSB8fFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyTWVudSAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMubWVudVJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWVudVJlbmRlcmVyKHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNlZE9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNPcHRpb246IHRoaXMuZm9jdXNPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsS2V5OiB0aGlzLnByb3BzLmxhYmVsS2V5LFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZTogdGhpcy5zZWxlY3RWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVBcnJheSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IE9wdGlvbiA9IHRoaXMucHJvcHMub3B0aW9uQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGxldCByZW5kZXJMYWJlbCA9IHRoaXMucHJvcHMub3B0aW9uUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gdmFsdWVBcnJheSAmJiB2YWx1ZUFycmF5LmluZGV4T2Yob3B0aW9uKSA+IC0xO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXNGb2N1c2VkID0gb3B0aW9uID09PSBmb2N1c2VkT3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uUmVmID0gaXNGb2N1c2VkID8gJ2ZvY3VzZWQnIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbkNsYXNzID0gY2xhc3NOYW1lcyh0aGlzLnByb3BzLm9wdGlvbkNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlbGVjdC1vcHRpb24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPE9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25JbmRleD17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e29wdGlvbkNsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e29wdGlvbi5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZvY3VzZWQ9e2lzRm9jdXNlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BvcHRpb24tJHtpfS0ke29wdGlvblt0aGlzLnByb3BzLnZhbHVlS2V5XX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuZm9jdXNPcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uPXtvcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e29wdGlvblJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyTGFiZWwob3B0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvT3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC1ub3Jlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubm9SZXN1bHRzVGV4dH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXJIaWRkZW5GaWVsZCAodmFsdWVBcnJheSkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMubmFtZSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5qb2luVmFsdWVzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUFycmF5Lm1hcChpID0+IHN0cmluZ2lmeVZhbHVlKGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pKS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH0vPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVBcnJheS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8aW5wdXQga2V5PXsnaGlkZGVuLicgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICByZWY9eyd2YWx1ZScgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0cmluZ2lmeVZhbHVlKGl0ZW1bdGhpcy5wcm9wcy52YWx1ZUtleV0pfVxuICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfS8+XG4gICAgICAgICkpO1xuICAgIH0sXG5cbiAgICBnZXRGb2N1c2FibGVPcHRpb25JbmRleCAoc2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucztcbiAgICAgICAgaWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gfHwgc2VsZWN0ZWRPcHRpb247XG4gICAgICAgIGlmIChmb2N1c2VkT3B0aW9uICYmICFmb2N1c2VkT3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSBvcHRpb25zLmluZGV4T2YoZm9jdXNlZE9wdGlvbik7XG4gICAgICAgICAgICBpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb2N1c2VkT3B0aW9uSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1tpXS5kaXNhYmxlZCkgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlck91dGVyIChvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKSB7XG4gICAgICAgIGxldCBtZW51ID0gdGhpcy5yZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pO1xuICAgICAgICBpZiAoIW1lbnUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPVwibWVudUNvbnRhaW5lclwiIGNsYXNzTmFtZT1cIlNlbGVjdC1tZW51LW91dGVyXCIgc3R5bGU9e3RoaXMucHJvcHMubWVudUNvbnRhaW5lclN0eWxlfT5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cIm1lbnVcIiByb2xlPVwibGlzdGJveFwiIGNsYXNzTmFtZT1cIlNlbGVjdC1tZW51XCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1saXN0J31cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLm1lbnVTdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgIG9uU2Nyb2xsPXt0aGlzLmhhbmRsZU1lbnVTY3JvbGx9XG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnV9PlxuICAgICAgICAgICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBsZXQgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucyh0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwpO1xuICAgICAgICBsZXQgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm11bHRpICYmICFvcHRpb25zLmxlbmd0aCAmJiB2YWx1ZUFycmF5Lmxlbmd0aCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKSBpc09wZW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcblxuICAgICAgICBsZXQgZm9jdXNlZE9wdGlvbiA9IG51bGw7XG4gICAgICAgIGlmIChmb2N1c2VkT3B0aW9uSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gdGhpcy5fdmlzaWJsZU9wdGlvbnNbZm9jdXNlZE9wdGlvbkluZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICAgICdTZWxlY3QtLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcbiAgICAgICAgICAgICdTZWxlY3QtLXNpbmdsZSc6ICF0aGlzLnByb3BzLm11bHRpLFxuICAgICAgICAgICAgJ2lzLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXG4gICAgICAgICAgICAnaXMtbG9hZGluZyc6IHRoaXMucHJvcHMuaXNMb2FkaW5nLFxuICAgICAgICAgICAgJ2lzLW9wZW4nOiBpc09wZW4sXG4gICAgICAgICAgICAnaXMtcHNldWRvLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzUHNldWRvRm9jdXNlZCxcbiAgICAgICAgICAgICdpcy1zZWFyY2hhYmxlJzogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuICAgICAgICAgICAgJ2hhcy12YWx1ZSc6IHZhbHVlQXJyYXkubGVuZ3RoLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVtb3ZlTWVzc2FnZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm11bHRpICYmICF0aGlzLnByb3BzLmRpc2FibGVkICYmXG4gICAgICAgICAgICB2YWx1ZUFycmF5Lmxlbmd0aCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG4gICAgICAgICAgICByZW1vdmVNZXNzYWdlID0gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJ30gY2xhc3NOYW1lPVwiU2VsZWN0LWFyaWEtb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuYmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlLnJlcGxhY2UoJ3tsYWJlbH0nLCB2YWx1ZUFycmF5W3ZhbHVlQXJyYXkubGVuZ3RoIC0gMV1bdGhpcy5wcm9wcy5sYWJlbEtleV0pfVxuXHRcdFx0XHQ8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRldGhlclN0eWxlID0ge1xuICAgICAgICAgICAgekluZGV4OiAnMjAwMCcsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj1cIndyYXBwZXJcIlxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMud3JhcHBlclN0eWxlfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KX1cbiAgICAgICAgICAgICAgICA8VGV0aGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ9XCJ0b3AgbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ9XCJib3R0b20gbGVmdFwiXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE1vZGlmaWVyPVwidmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0ZXRoZXJTdHlsZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwiY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU2VsZWN0LWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cbiAgICAgICAgICAgICAgICAgICAgPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1tdWx0aS12YWx1ZS13cmFwcGVyXCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9PlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUodmFsdWVBcnJheSwgaXNPcGVuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCl9XG5cdFx0XHRcdFx0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3JlbW92ZU1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMb2FkaW5nKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDbGVhcigpfVxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJyb3coKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsICF0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwsIGZvY3VzZWRPcHRpb24pIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L1RldGhlckNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcbiJdfQ==
