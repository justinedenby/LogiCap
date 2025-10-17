"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveButton = exports.MonitorButton = exports.DoublyButton = exports.CircleTargetArrowhead = exports.CircleSourceArrowhead = void 0;
var joint = _interopRequireWildcard(require("jointjs"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const circleArrowhead = {
  tagName: 'circle',
  attributes: {
    'r': 7,
    'fill': 'black',
    'fill-opacity': 0.3,
    'stroke': 'black',
    'stroke-width': 2,
    'cursor': 'move'
  }
};
const CircleSourceArrowhead = exports.CircleSourceArrowhead = joint.linkTools.SourceArrowhead.extend(_lodash.default.merge({}, circleArrowhead));
const CircleTargetArrowhead = exports.CircleTargetArrowhead = joint.linkTools.TargetArrowhead.extend(_lodash.default.merge({}, circleArrowhead));
const DoublyButton = exports.DoublyButton = joint.linkTools.Button.extend({
  update() {
    if (this.relatedView.isShortWire()) {
      this.options.distance = this.options.distanceShort || this.options.distance;
      if (this.options.secondary) this.hide();
    } else {
      this.options.distance = this.options.distanceLong || this.options.distance;
    }
    return joint.linkTools.Button.prototype.update.apply(this, arguments);
  }
});
const RemoveButton = exports.RemoveButton = DoublyButton.extend({
  name: 'remove',
  children: joint.linkTools.Remove.prototype.children,
  options: joint.linkTools.Remove.prototype.options
});
const MonitorButton = exports.MonitorButton = DoublyButton.extend({
  name: 'monitor',
  children: [{
    tagName: 'circle',
    selector: 'button',
    attributes: {
      'r': 7,
      'fill': '#001DFF',
      'cursor': 'pointer'
    }
  }, {
    tagName: 'path',
    selector: 'icon',
    attributes: {
      'd': 'm -2.5,-0.5 a 2,2 0 1 0 4,0 2,2 0 1 0 -4,0 M 1,1 3,3',
      'fill': 'none',
      'stroke': '#FFFFFF',
      'stroke-width': 2,
      'pointer-events': 'none'
    }
  }],
  options: {
    action(evt) {
      this.notify('link:monitor');
    }
  }
});