// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/frappe-charts/dist/frappe-charts.min.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChart = exports.PercentageChart = exports.Heatmap = exports.Chart = exports.AxisChart = void 0;
function styleInject(t, e) {
  void 0 === e && (e = {});
  var n = e.insertAt;
  if (t && "undefined" != typeof document) {
    var i = document.head || document.getElementsByTagName("head")[0],
      a = document.createElement("style");
    a.type = "text/css", "top" === n && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t));
  }
}
function $(t, e) {
  return "string" == typeof t ? (e || document).querySelector(t) : t || null;
}
function getOffset(t) {
  var e = t.getBoundingClientRect();
  return {
    top: e.top + (document.documentElement.scrollTop || document.body.scrollTop),
    left: e.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
  };
}
function isHidden(t) {
  return null === t.offsetParent;
}
function isElementInViewport(t) {
  var e = t.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function getElementContentWidth(t) {
  var e = window.getComputedStyle(t),
    n = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
  return t.clientWidth - n;
}
function fire(t, e, n) {
  var i = document.createEvent("HTMLEvents");
  i.initEvent(e, !0, !0);
  for (var a in n) i[a] = n[a];
  return t.dispatchEvent(i);
}
function getTopOffset(t) {
  return t.titleHeight + t.margins.top + t.paddings.top;
}
function getLeftOffset(t) {
  return t.margins.left + t.paddings.left;
}
function getExtraHeight(t) {
  return t.margins.top + t.margins.bottom + t.paddings.top + t.paddings.bottom + t.titleHeight + t.legendHeight;
}
function getExtraWidth(t) {
  return t.margins.left + t.margins.right + t.paddings.left + t.paddings.right;
}
function _classCallCheck$4(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function floatTwo(t) {
  return parseFloat(t.toFixed(2));
}
function fillArray(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  n || (n = i ? t[0] : t[t.length - 1]);
  var a = new Array(Math.abs(e)).fill(n);
  return t = i ? a.concat(t) : t.concat(a);
}
function getStringWidth(t, e) {
  return (t + "").length * e;
}
function getPositionByAngle(t, e) {
  return {
    x: Math.sin(t * ANGLE_RATIO) * e,
    y: Math.cos(t * ANGLE_RATIO) * e
  };
}
function isValidNumber(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return !Number.isNaN(t) && void 0 !== t && !!Number.isFinite(t) && !(e && t < 0);
}
function round(t) {
  return Number(Math.round(t + "e4") + "e-4");
}
function deepClone(t) {
  var e = void 0,
    n = void 0,
    i = void 0;
  if (t instanceof Date) return new Date(t.getTime());
  if ("object" !== (void 0 === t ? "undefined" : _typeof$2(t)) || null === t) return t;
  e = Array.isArray(t) ? [] : {};
  for (i in t) n = t[i], e[i] = deepClone(n);
  return e;
}
function getBarHeightAndYAttr(t, e) {
  var n = void 0,
    i = void 0;
  return t <= e ? (n = e - t, i = t) : (n = t - e, i = e), [n, i];
}
function equilizeNoOfElements(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length - t.length;
  return n > 0 ? t = fillArray(t, n) : e = fillArray(e, n), [t, e];
}
function truncateString(t, e) {
  if (t) return t.length > e ? t.slice(0, e - 3) + "..." : t;
}
function shortenLargeNumber(t) {
  var e = void 0;
  if ("number" == typeof t) e = t;else if ("string" == typeof t && (e = Number(t), Number.isNaN(e))) return t;
  var n = Math.floor(Math.log10(Math.abs(e)));
  if (n <= 2) return e;
  var i = Math.floor(n / 3),
    a = Math.pow(10, n - 3 * i) * +(e / Math.pow(10, n)).toFixed(1);
  return Math.round(100 * a) / 100 + " " + ["", "K", "M", "B", "T"][i];
}
function getSplineCurvePointsStr(t, e) {
  for (var n = [], i = 0; i < t.length; i++) n.push([t[i], e[i]]);
  var a = function (t, e) {
      var n = e[0] - t[0],
        i = e[1] - t[1];
      return {
        length: Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)),
        angle: Math.atan2(i, n)
      };
    },
    r = function (t, e, n, i) {
      var r = a(e || t, n || t),
        o = r.angle + (i ? Math.PI : 0),
        s = .2 * r.length;
      return [t[0] + Math.cos(o) * s, t[1] + Math.sin(o) * s];
    };
  return function (t, e) {
    return t.reduce(function (t, n, i, a) {
      return 0 === i ? n[0] + "," + n[1] : t + " " + e(n, i, a);
    }, "");
  }(n, function (t, e, n) {
    var i = r(n[e - 1], n[e - 2], t),
      a = r(t, n[e - 1], n[e + 1], !0);
    return "C " + i[0] + "," + i[1] + " " + a[0] + "," + a[1] + " " + t[0] + "," + t[1];
  });
}
function limitColor(t) {
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function lightenDarkenColor(t, e) {
  var n = getColor(t),
    i = !1;
  "#" == n[0] && (n = n.slice(1), i = !0);
  var a = parseInt(n, 16),
    r = limitColor((a >> 16) + e),
    o = limitColor((a >> 8 & 255) + e),
    s = limitColor((255 & a) + e);
  return (i ? "#" : "") + (s | o << 8 | r << 16).toString(16);
}
function isValidColor(t) {
  var e = /(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i;
  return /(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(t) || e.test(t);
}
function $$1(t, e) {
  return "string" == typeof t ? (e || document).querySelector(t) : t || null;
}
function createSVG(t, e) {
  var n = document.createElementNS("http://www.w3.org/2000/svg", t);
  for (var i in e) {
    var a = e[i];
    if ("inside" === i) $$1(a).appendChild(n);else if ("around" === i) {
      var r = $$1(a);
      r.parentNode.insertBefore(n, r), n.appendChild(r);
    } else "styles" === i ? "object" === (void 0 === a ? "undefined" : _typeof$1(a)) && Object.keys(a).map(function (t) {
      n.style[t] = a[t];
    }) : ("className" === i && (i = "class"), "innerHTML" === i ? n.textContent = a : n.setAttribute(i, a));
  }
  return n;
}
function renderVerticalGradient(t, e) {
  return createSVG("linearGradient", {
    inside: t,
    id: e,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1
  });
}
function setGradientStop(t, e, n, i) {
  return createSVG("stop", {
    inside: t,
    style: "stop-color: " + n,
    offset: e,
    "stop-opacity": i
  });
}
function makeSVGContainer(t, e, n, i) {
  return createSVG("svg", {
    className: e,
    inside: t,
    width: n,
    height: i
  });
}
function makeSVGDefs(t) {
  return createSVG("defs", {
    inside: t
  });
}
function makeSVGGroup(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
    i = {
      className: t,
      transform: e
    };
  return n && (i.inside = n), createSVG("g", i);
}
function makePath(t) {
  return createSVG("path", {
    className: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    d: t,
    styles: {
      stroke: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none",
      fill: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
      "stroke-width": arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2
    }
  });
}
function makeArcPathStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = n.y + e.y;
  return "M" + n.x + " " + n.y + "\n\t\tL" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + " z";
}
function makeCircleStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = 2 * n.y,
    c = n.y + e.y;
  return "M" + n.x + " " + n.y + "\n\t\tL" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + " z\n\t\tL" + o + " " + u + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + c + " z";
}
function makeArcStrokePathStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = n.y + e.y;
  return "M" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u;
}
function makeStrokeCircleStr(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = n.x + t.x,
    s = n.y + t.y,
    l = n.x + e.x,
    u = 2 * i + s,
    c = n.y + t.y;
  return "M" + o + " " + s + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + u + "\n\t\tM" + o + " " + u + "\n\t\tA " + i + " " + i + " 0 " + r + " " + (a ? 1 : 0) + "\n\t\t" + l + " " + c;
}
function makeGradient(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    i = "path-fill-gradient-" + e + "-" + (n ? "lighter" : "default"),
    a = renderVerticalGradient(t, i),
    r = [1, .6, .2];
  return n && (r = [.4, .2, 0]), setGradientStop(a, "0%", e, r[0]), setGradientStop(a, "50%", e, r[1]), setGradientStop(a, "100%", e, r[2]), i;
}
function percentageBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : PERCENTAGE_BAR_DEFAULT_DEPTH,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none";
  return createSVG("rect", {
    className: "percentage-bar",
    x: t,
    y: e,
    width: n,
    height: i,
    fill: r,
    styles: {
      stroke: lightenDarkenColor(r, -25),
      "stroke-dasharray": "0, " + (i + n) + ", " + n + ", " + i,
      "stroke-width": a
    }
  });
}
function heatSquare(t, e, n, i, a) {
  var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none",
    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : {},
    s = {
      className: t,
      x: e,
      y: n,
      width: i,
      height: i,
      rx: a,
      fill: r
    };
  return Object.keys(o).map(function (t) {
    s[t] = o[t];
  }), createSVG("rect", s);
}
function legendBar(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
    a = arguments[4];
  a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? truncateString(a, LABEL_MAX_CHARS) : a;
  var r = {
      className: "legend-bar",
      x: 0,
      y: 0,
      width: n,
      height: "2px",
      fill: i
    },
    o = createSVG("text", {
      className: "legend-dataset-text",
      x: 0,
      y: 0,
      dy: 2 * FONT_SIZE + "px",
      "font-size": 1.2 * FONT_SIZE + "px",
      "text-anchor": "start",
      fill: FONT_FILL,
      innerHTML: a
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", " + e + ")"
    });
  return s.appendChild(createSVG("rect", r)), s.appendChild(o), s;
}
function legendDot(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
    a = arguments[4];
  a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5] ? truncateString(a, LABEL_MAX_CHARS) : a;
  var r = {
      className: "legend-dot",
      cx: 0,
      cy: 0,
      r: n,
      fill: i
    },
    o = createSVG("text", {
      className: "legend-dataset-text",
      x: 0,
      y: 0,
      dx: FONT_SIZE + "px",
      dy: FONT_SIZE / 3 + "px",
      "font-size": 1.2 * FONT_SIZE + "px",
      "text-anchor": "start",
      fill: FONT_FILL,
      innerHTML: a
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", " + e + ")"
    });
  return s.appendChild(createSVG("circle", r)), s.appendChild(o), s;
}
function makeText(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = a.fontSize || FONT_SIZE;
  return createSVG("text", {
    className: t,
    x: e,
    y: n,
    dy: (void 0 !== a.dy ? a.dy : r / 2) + "px",
    "font-size": r + "px",
    fill: a.fill || FONT_FILL,
    "text-anchor": a.textAnchor || "start",
    innerHTML: i
  });
}
function makeVertLine(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  a.stroke || (a.stroke = BASE_LINE_COLOR);
  var r = createSVG("line", {
      className: "line-vertical " + a.className,
      x1: 0,
      x2: 0,
      y1: n,
      y2: i,
      styles: {
        stroke: a.stroke
      }
    }),
    o = createSVG("text", {
      x: 0,
      y: n > i ? n + LABEL_MARGIN : n - LABEL_MARGIN - FONT_SIZE,
      dy: FONT_SIZE + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "middle",
      innerHTML: e + ""
    }),
    s = createSVG("g", {
      transform: "translate(" + t + ", 0)"
    });
  return s.appendChild(r), s.appendChild(o), s;
}
function makeHoriLine(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
  a.stroke || (a.stroke = BASE_LINE_COLOR), a.lineType || (a.lineType = ""), a.shortenNumbers && (e = shortenLargeNumber(e));
  var r = createSVG("line", {
      className: "line-horizontal " + a.className + ("dashed" === a.lineType ? "dashed" : ""),
      x1: n,
      x2: i,
      y1: 0,
      y2: 0,
      styles: {
        stroke: a.stroke
      }
    }),
    o = createSVG("text", {
      x: n < i ? n - LABEL_MARGIN : n + LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / 2 - 2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": n < i ? "end" : "start",
      innerHTML: e + ""
    }),
    s = createSVG("g", {
      transform: "translate(0, " + t + ")",
      "stroke-opacity": 1
    });
  return 0 !== o && "0" !== o || (s.style.stroke = "rgba(27, 31, 35, 0.6)"), s.appendChild(r), s.appendChild(o), s;
}
function yLine(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  isValidNumber(t) || (t = 0), i.pos || (i.pos = "left"), i.offset || (i.offset = 0), i.mode || (i.mode = "span"), i.stroke || (i.stroke = BASE_LINE_COLOR), i.className || (i.className = "");
  var a = -1 * AXIS_TICK_LENGTH,
    r = "span" === i.mode ? n + AXIS_TICK_LENGTH : 0;
  return "tick" === i.mode && "right" === i.pos && (a = n + AXIS_TICK_LENGTH, r = n), a += i.offset, r += i.offset, makeHoriLine(t, e, a, r, {
    stroke: i.stroke,
    className: i.className,
    lineType: i.lineType,
    shortenNumbers: i.shortenNumbers
  });
}
function xLine(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  isValidNumber(t) || (t = 0), i.pos || (i.pos = "bottom"), i.offset || (i.offset = 0), i.mode || (i.mode = "span"), i.stroke || (i.stroke = BASE_LINE_COLOR), i.className || (i.className = "");
  var a = n + AXIS_TICK_LENGTH,
    r = "span" === i.mode ? -1 * AXIS_TICK_LENGTH : n;
  return "tick" === i.mode && "top" === i.pos && (a = -1 * AXIS_TICK_LENGTH, r = 0), makeVertLine(t, e, a, r, {
    stroke: i.stroke,
    className: i.className,
    lineType: i.lineType
  });
}
function yMarker(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  i.labelPos || (i.labelPos = "right");
  var a = createSVG("text", {
      className: "chart-label",
      x: "left" === i.labelPos ? LABEL_MARGIN : n - getStringWidth(e, 5) - LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / -2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "start",
      innerHTML: e + ""
    }),
    r = makeHoriLine(t, "", 0, n, {
      stroke: i.stroke || BASE_LINE_COLOR,
      className: i.className || "",
      lineType: i.lineType
    });
  return r.appendChild(a), r;
}
function yRegion(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = t - e,
    o = createSVG("rect", {
      className: "bar mini",
      styles: {
        fill: "rgba(228, 234, 239, 0.49)",
        stroke: BASE_LINE_COLOR,
        "stroke-dasharray": n + ", " + r
      },
      x: 0,
      y: 0,
      width: n,
      height: r
    });
  a.labelPos || (a.labelPos = "right");
  var s = createSVG("text", {
      className: "chart-label",
      x: "left" === a.labelPos ? LABEL_MARGIN : n - getStringWidth(i + "", 4.5) - LABEL_MARGIN,
      y: 0,
      dy: FONT_SIZE / -2 + "px",
      "font-size": FONT_SIZE + "px",
      "text-anchor": "start",
      innerHTML: i + ""
    }),
    l = createSVG("g", {
      transform: "translate(0, " + e + ")"
    });
  return l.appendChild(o), l.appendChild(s), l;
}
function datasetBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
    s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {},
    l = getBarHeightAndYAttr(e, s.zeroLine),
    u = _slicedToArray(l, 2),
    c = u[0],
    h = u[1];
  h -= o, 0 === c && (c = s.minHeight, h -= s.minHeight), isValidNumber(t) || (t = 0), isValidNumber(h) || (h = 0), isValidNumber(c, !0) || (c = 0), isValidNumber(n, !0) || (n = 0);
  var d = createSVG("rect", {
    className: "bar mini",
    style: "fill: " + i,
    "data-point-index": r,
    x: t,
    y: h,
    width: n,
    height: c
  });
  if ((a += "") || a.length) {
    d.setAttribute("y", 0), d.setAttribute("x", 0);
    var f = createSVG("text", {
        className: "data-point-value",
        x: n / 2,
        y: 0,
        dy: FONT_SIZE / 2 * -1 + "px",
        "font-size": FONT_SIZE + "px",
        "text-anchor": "middle",
        innerHTML: a
      }),
      p = createSVG("g", {
        "data-point-index": r,
        transform: "translate(" + t + ", " + h + ")"
      });
    return p.appendChild(d), p.appendChild(f), p;
  }
  return d;
}
function datasetDot(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
    o = createSVG("circle", {
      style: "fill: " + i,
      "data-point-index": r,
      cx: t,
      cy: e,
      r: n
    });
  if ((a += "") || a.length) {
    o.setAttribute("cy", 0), o.setAttribute("cx", 0);
    var s = createSVG("text", {
        className: "data-point-value",
        x: 0,
        y: 0,
        dy: FONT_SIZE / 2 * -1 - n + "px",
        "font-size": FONT_SIZE + "px",
        "text-anchor": "middle",
        innerHTML: a
      }),
      l = createSVG("g", {
        "data-point-index": r,
        transform: "translate(" + t + ", " + e + ")"
      });
    return l.appendChild(o), l.appendChild(s), l;
  }
  return o;
}
function getPaths(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    r = e.map(function (e, n) {
      return t[n] + "," + e;
    }).join("L");
  i.spline && (r = getSplineCurvePointsStr(t, e));
  var o = makePath("M" + r, "line-graph-path", n);
  if (i.heatline) {
    var s = makeGradient(a.svgDefs, n);
    o.style.stroke = "url(#" + s + ")";
  }
  var l = {
    path: o
  };
  if (i.regionFill) {
    var u = makeGradient(a.svgDefs, n, !0),
      c = "M" + t[0] + "," + a.zeroLine + "L" + r + "L" + t.slice(-1)[0] + "," + a.zeroLine;
    l.region = makePath(c, "region-fill", "none", "url(#" + u + ")");
  }
  return l;
}
function translate(t, e, n, i) {
  var a = "string" == typeof e ? e : e.join(", ");
  return [t, {
    transform: n.join(", ")
  }, i, STD_EASING, "translate", {
    transform: a
  }];
}
function translateVertLine(t, e, n) {
  return translate(t, [n, 0], [e, 0], MARKER_LINE_ANIM_DUR);
}
function translateHoriLine(t, e, n) {
  return translate(t, [0, n], [0, e], MARKER_LINE_ANIM_DUR);
}
function animateRegion(t, e, n, i) {
  var a = e - n,
    r = t.childNodes[0];
  return [[r, {
    height: a,
    "stroke-dasharray": r.getAttribute("width") + ", " + a
  }, MARKER_LINE_ANIM_DUR, STD_EASING], translate(t, [0, i], [0, n], MARKER_LINE_ANIM_DUR)];
}
function animateBar(t, e, n, i) {
  var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
    r = getBarHeightAndYAttr(n, (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}).zeroLine),
    o = _slicedToArray$2(r, 2),
    s = o[0],
    l = o[1];
  return l -= a, "rect" !== t.nodeName ? [[t.childNodes[0], {
    width: i,
    height: s
  }, UNIT_ANIM_DUR, STD_EASING], translate(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, l], MARKER_LINE_ANIM_DUR)] : [[t, {
    width: i,
    height: s,
    x: e,
    y: l
  }, UNIT_ANIM_DUR, STD_EASING]];
}
function animateDot(t, e, n) {
  return "circle" !== t.nodeName ? [translate(t, t.getAttribute("transform").split("(")[1].slice(0, -1), [e, n], MARKER_LINE_ANIM_DUR)] : [[t, {
    cx: e,
    cy: n
  }, UNIT_ANIM_DUR, STD_EASING]];
}
function animatePath(t, e, n, i, a) {
  var r = [],
    o = n.map(function (t, n) {
      return e[n] + "," + t;
    }).join("L");
  a && (o = getSplineCurvePointsStr(e, n));
  var s = [t.path, {
    d: "M" + o
  }, PATH_ANIM_DUR, STD_EASING];
  if (r.push(s), t.region) {
    var l = e[0] + "," + i + "L",
      u = "L" + e.slice(-1)[0] + ", " + i,
      c = [t.region, {
        d: "M" + l + o + u
      }, PATH_ANIM_DUR, STD_EASING];
    r.push(c);
  }
  return r;
}
function animatePathStr(t, e) {
  return [t, {
    d: e
  }, UNIT_ANIM_DUR, STD_EASING];
}
function _toConsumableArray$1(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function animateSVGElement(t, e, n) {
  var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "linear",
    a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0,
    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
    o = t.cloneNode(!0),
    s = t.cloneNode(!0);
  for (var l in e) {
    var u = void 0;
    u = "transform" === l ? document.createElementNS("http://www.w3.org/2000/svg", "animateTransform") : document.createElementNS("http://www.w3.org/2000/svg", "animate");
    var c = r[l] || t.getAttribute(l),
      h = e[l],
      d = {
        attributeName: l,
        from: c,
        to: h,
        begin: "0s",
        dur: n / 1e3 + "s",
        values: c + ";" + h,
        keySplines: EASING[i],
        keyTimes: "0;1",
        calcMode: "spline",
        fill: "freeze"
      };
    a && (d.type = a);
    for (var f in d) u.setAttribute(f, d[f]);
    o.appendChild(u), a ? s.setAttribute(l, "translate(" + h + ")") : s.setAttribute(l, h);
  }
  return [o, s];
}
function transform(t, e) {
  t.style.transform = e, t.style.webkitTransform = e, t.style.msTransform = e, t.style.mozTransform = e, t.style.oTransform = e;
}
function animateSVG(t, e) {
  var n = [],
    i = [];
  e.map(function (t) {
    var e = t[0],
      a = e.parentNode,
      r = void 0,
      o = void 0;
    t[0] = e;
    var s = animateSVGElement.apply(void 0, _toConsumableArray$1(t)),
      l = _slicedToArray$1(s, 2);
    r = l[0], o = l[1], n.push(o), i.push([r, a]), a && a.replaceChild(r, e);
  });
  var a = t.cloneNode(!0);
  return i.map(function (t, i) {
    t[1] && (t[1].replaceChild(n[i], t[0]), e[i][0] = n[i]);
  }), a;
}
function runSMILAnimation(t, e, n) {
  if (0 !== n.length) {
    var i = animateSVG(e, n);
    e.parentNode == t && (t.removeChild(e), t.appendChild(i)), setTimeout(function () {
      i.parentNode == t && (t.removeChild(i), t.appendChild(e));
    }, REPLACE_ALL_NEW_DUR);
  }
}
function downloadFile(t, e) {
  var n = document.createElement("a");
  n.style = "display: none";
  var i = new Blob(e, {
      type: "image/svg+xml; charset=utf-8"
    }),
    a = window.URL.createObjectURL(i);
  n.href = a, n.download = t, document.body.appendChild(n), n.click(), setTimeout(function () {
    document.body.removeChild(n), window.URL.revokeObjectURL(a);
  }, 300);
}
function prepareForExport(t) {
  var e = t.cloneNode(!0);
  e.classList.add("chart-container"), e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  var n = $.create("style", {
    innerHTML: CSSTEXT
  });
  e.insertBefore(n, e.firstChild);
  var i = $.create("div");
  return i.appendChild(e), i.innerHTML;
}
function _classCallCheck$3(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _classCallCheck$2(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$1(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$1(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function treatAsUtc(t) {
  var e = new Date(t);
  return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e;
}
function getYyyyMmDd(t) {
  var e = t.getDate(),
    n = t.getMonth() + 1;
  return [t.getFullYear(), (n > 9 ? "" : "0") + n, (e > 9 ? "" : "0") + e].join("-");
}
function clone(t) {
  return new Date(t.getTime());
}
function getWeeksBetween(t, e) {
  var n = setDayToSunday(t);
  return Math.ceil(getDaysBetween(n, e) / NO_OF_DAYS_IN_WEEK);
}
function getDaysBetween(t, e) {
  var n = SEC_IN_DAY * NO_OF_MILLIS;
  return (treatAsUtc(e) - treatAsUtc(t)) / n;
}
function areInSameMonth(t, e) {
  return t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
}
function getMonthName(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    n = MONTH_NAMES[t];
  return e ? n.slice(0, 3) : n;
}
function getLastDateInMonth(t, e) {
  return new Date(e, t + 1, 0);
}
function setDayToSunday(t) {
  var e = clone(t),
    n = e.getDay();
  return 0 !== n && addDays(e, -1 * n), e;
}
function addDays(t, e) {
  t.setDate(t.getDate() + e);
}
function _classCallCheck$5(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function getComponent(t, e, n) {
  var i = Object.keys(componentConfigs).filter(function (e) {
      return t.includes(e);
    }),
    a = componentConfigs[i[0]];
  return Object.assign(a, {
    constants: e,
    getData: n
  }), new ChartComponent(a);
}
function _toConsumableArray(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$1(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$2(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$6(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$2(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$2(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$4(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function normalize(t) {
  if (0 === t) return [0, 0];
  if (isNaN(t)) return {
    mantissa: -6755399441055744,
    exponent: 972
  };
  var e = t > 0 ? 1 : -1;
  if (!isFinite(t)) return {
    mantissa: 4503599627370496 * e,
    exponent: 972
  };
  t = Math.abs(t);
  var n = Math.floor(Math.log10(t));
  return [e * (t / Math.pow(10, n)), n];
}
function getChartRangeIntervals(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = Math.ceil(t),
    i = Math.floor(e),
    a = n - i,
    r = a,
    o = 1;
  a > 5 && (a % 2 != 0 && (a = ++n - i), r = a / 2, o = 2), a <= 2 && (o = a / (r = 4)), 0 === a && (r = 5, o = 1);
  for (var s = [], l = 0; l <= r; l++) s.push(i + o * l);
  return s;
}
function getChartIntervals(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = normalize(t),
    i = _slicedToArray$4(n, 2),
    a = i[0],
    r = i[1],
    o = e ? e / Math.pow(10, r) : 0,
    s = getChartRangeIntervals(a = a.toFixed(6), o);
  return s = s.map(function (t) {
    return t * Math.pow(10, r);
  });
}
function calcChartIntervals(t) {
  function e(t, e) {
    for (var n = getChartIntervals(t), i = n[1] - n[0], a = 0, r = 1; a < e; r++) a += i, n.unshift(-1 * a);
    return n;
  }
  var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    i = Math.max.apply(Math, _toConsumableArray$4(t)),
    a = Math.min.apply(Math, _toConsumableArray$4(t)),
    r = [];
  if (i >= 0 && a >= 0) normalize(i)[1], r = n ? getChartIntervals(i, a) : getChartIntervals(i);else if (i > 0 && a < 0) {
    var o = Math.abs(a);
    i >= o ? (normalize(i)[1], r = e(i, o)) : (normalize(o)[1], r = e(o, i).reverse().map(function (t) {
      return -1 * t;
    }));
  } else if (i <= 0 && a <= 0) {
    var s = Math.abs(a),
      l = Math.abs(i);
    normalize(s)[1], r = (r = n ? getChartIntervals(s, l) : getChartIntervals(s)).reverse().map(function (t) {
      return -1 * t;
    });
  }
  return r;
}
function getZeroIndex(t) {
  var e = getIntervalSize(t);
  return t.indexOf(0) >= 0 ? t.indexOf(0) : t[0] > 0 ? -1 * t[0] / e : -1 * t[t.length - 1] / e + (t.length - 1);
}
function getIntervalSize(t) {
  return t[1] - t[0];
}
function getValueRange(t) {
  return t[t.length - 1] - t[0];
}
function scale(t, e) {
  return floatTwo(e.zeroLine - t * e.scaleMultiplier);
}
function getClosestInArray(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    i = e.reduce(function (e, n) {
      return Math.abs(n - t) < Math.abs(e - t) ? n : e;
    }, []);
  return n ? e.indexOf(i) : i;
}
function calcDistribution(t, e) {
  for (var n = Math.max.apply(Math, _toConsumableArray$4(t)), i = 1 / (e - 1), a = [], r = 0; r < e; r++) {
    var o = n * (i * r);
    a.push(o);
  }
  return a;
}
function getMaxCheckpoint(t, e) {
  return e.filter(function (e) {
    return e < t;
  }).length;
}
function _toConsumableArray$3(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$7(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$3(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$3(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$6(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function dataPrep(t, e) {
  t.labels = t.labels || [];
  var n = t.labels.length,
    i = t.datasets,
    a = new Array(n).fill(0);
  return i || (i = [{
    values: a
  }]), i.map(function (t) {
    if (t.values) {
      var i = t.values;
      i = (i = i.map(function (t) {
        return isNaN(t) ? 0 : t;
      })).length > n ? i.slice(0, n) : fillArray(i, n - i.length, 0), t.values = i;
    } else t.values = a;
    t.chartType || (AXIS_DATASET_CHART_TYPES.includes(e), t.chartType = e);
  }), t.yRegions && t.yRegions.map(function (t) {
    if (t.end < t.start) {
      var e = [t.end, t.start];
      t.start = e[0], t.end = e[1];
    }
  }), t;
}
function zeroDataPrep(t) {
  var e = t.labels.length,
    n = new Array(e).fill(0),
    i = {
      labels: t.labels.slice(0, -1),
      datasets: t.datasets.map(function (t) {
        return {
          name: "",
          values: n.slice(0, -1),
          chartType: t.chartType
        };
      })
    };
  return t.yMarkers && (i.yMarkers = [{
    value: 0,
    label: ""
  }]), t.yRegions && (i.yRegions = [{
    start: 0,
    end: 0,
    label: ""
  }]), i;
}
function getShortenedLabels(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
    i = t / e.length;
  i <= 0 && (i = 1);
  var a = i / DEFAULT_CHAR_WIDTH,
    r = void 0;
  if (n) {
    var o = Math.max.apply(Math, _toConsumableArray$6(e.map(function (t) {
      return t.length;
    })));
    r = Math.ceil(o / a);
  }
  return e.map(function (t, e) {
    return (t += "").length > a && (n ? e % r != 0 && (t = "") : t = a - 3 > 0 ? t.slice(0, a - 3) + " ..." : t.slice(0, a) + ".."), t;
  });
}
function _toConsumableArray$5(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$8(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$4(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$4(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _toConsumableArray$7(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
  return Array.from(t);
}
function _classCallCheck$9(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn$5(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function _inherits$5(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function getChartByType() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "line",
    e = arguments[1],
    n = arguments[2];
  return "axis-mixed" === t ? (n.type = "line", new AxisChart(e, n)) : chartTypes[t] ? new chartTypes[t](e, n) : void console.error("Undefined chart type: " + t);
}
var css_248z = '.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}';
styleInject(css_248z);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
$.create = function (t, e) {
  var n = document.createElement(t);
  for (var i in e) {
    var a = e[i];
    if ("inside" === i) $(a).appendChild(n);else if ("around" === i) {
      var r = $(a);
      r.parentNode.insertBefore(n, r), n.appendChild(r);
    } else "styles" === i ? "object" === (void 0 === a ? "undefined" : _typeof(a)) && Object.keys(a).map(function (t) {
      n.style[t] = a[t];
    }) : i in n ? n[i] = a : n.setAttribute(i, a);
  }
  return n;
};
var BASE_MEASURES = {
    margins: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20
    },
    paddings: {
      top: 20,
      bottom: 40,
      left: 30,
      right: 10
    },
    baseHeight: 240,
    titleHeight: 20,
    legendHeight: 30,
    titleFontSize: 12
  },
  INIT_CHART_UPDATE_TIMEOUT = 700,
  CHART_POST_ANIMATE_TIMEOUT = 400,
  DEFAULT_AXIS_CHART_TYPE = "line",
  AXIS_DATASET_CHART_TYPES = ["line", "bar"],
  AXIS_LEGEND_BAR_SIZE = 100,
  BAR_CHART_SPACE_RATIO = .5,
  MIN_BAR_PERCENT_HEIGHT = 0,
  LINE_CHART_DOT_SIZE = 4,
  DOT_OVERLAY_SIZE_INCR = 4,
  PERCENTAGE_BAR_DEFAULT_HEIGHT = 20,
  PERCENTAGE_BAR_DEFAULT_DEPTH = 2,
  HEATMAP_DISTRIBUTION_SIZE = 5,
  HEATMAP_SQUARE_SIZE = 10,
  HEATMAP_GUTTER_SIZE = 2,
  DEFAULT_CHAR_WIDTH = 7,
  TOOLTIP_POINTER_TRIANGLE_HEIGHT = 5,
  DEFAULT_CHART_COLORS = ["light-blue", "blue", "violet", "red", "orange", "yellow", "green", "light-green", "purple", "magenta", "light-grey", "dark-grey"],
  HEATMAP_COLORS_GREEN = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  DEFAULT_COLORS = {
    bar: DEFAULT_CHART_COLORS,
    line: DEFAULT_CHART_COLORS,
    pie: DEFAULT_CHART_COLORS,
    percentage: DEFAULT_CHART_COLORS,
    heatmap: HEATMAP_COLORS_GREEN,
    donut: DEFAULT_CHART_COLORS
  },
  ANGLE_RATIO = Math.PI / 180,
  FULL_ANGLE = 360,
  _createClass$3 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  SvgTip = function () {
    function t(e) {
      var n = e.parent,
        i = void 0 === n ? null : n,
        a = e.colors,
        r = void 0 === a ? [] : a;
      _classCallCheck$4(this, t), this.parent = i, this.colors = r, this.titleName = "", this.titleValue = "", this.listValues = [], this.titleValueFirst = 0, this.x = 0, this.y = 0, this.top = 0, this.left = 0, this.setup();
    }
    return _createClass$3(t, [{
      key: "setup",
      value: function () {
        this.makeTooltip();
      }
    }, {
      key: "refresh",
      value: function () {
        this.fill(), this.calcPosition();
      }
    }, {
      key: "makeTooltip",
      value: function () {
        var t = this;
        this.container = $.create("div", {
          inside: this.parent,
          className: "graph-svg-tip comparison",
          innerHTML: '<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'
        }), this.hideTip(), this.title = this.container.querySelector(".title"), this.dataPointList = this.container.querySelector(".data-point-list"), this.parent.addEventListener("mouseleave", function () {
          t.hideTip();
        });
      }
    }, {
      key: "fill",
      value: function () {
        var t = this,
          e = void 0;
        this.index && this.container.setAttribute("data-point-index", this.index), e = this.titleValueFirst ? "<strong>" + this.titleValue + "</strong>" + this.titleName : this.titleName + "<strong>" + this.titleValue + "</strong>", this.title.innerHTML = e, this.dataPointList.innerHTML = "", this.listValues.map(function (e, n) {
          var i = t.colors[n] || "black",
            a = 0 === e.formatted || e.formatted ? e.formatted : e.value,
            r = $.create("li", {
              styles: {
                "border-top": "3px solid " + i
              },
              innerHTML: '<strong style="display: block;">' + (0 === a || a ? a : "") + "</strong>\n\t\t\t\t\t" + (e.title ? e.title : "")
            });
          t.dataPointList.appendChild(r);
        });
      }
    }, {
      key: "calcPosition",
      value: function () {
        var t = this.container.offsetWidth;
        this.top = this.y - this.container.offsetHeight - TOOLTIP_POINTER_TRIANGLE_HEIGHT, this.left = this.x - t / 2;
        var e = this.parent.offsetWidth - t,
          n = this.container.querySelector(".svg-pointer");
        if (this.left < 0) n.style.left = "calc(50% - " + -1 * this.left + "px)", this.left = 0;else if (this.left > e) {
          var i = "calc(50% + " + (this.left - e) + "px)";
          n.style.left = i, this.left = e;
        } else n.style.left = "50%";
      }
    }, {
      key: "setValues",
      value: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
          a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1;
        this.titleName = n.name, this.titleValue = n.value, this.listValues = i, this.x = t, this.y = e, this.titleValueFirst = n.valueFirst || 0, this.index = a, this.refresh();
      }
    }, {
      key: "hideTip",
      value: function () {
        this.container.style.top = "0px", this.container.style.left = "0px", this.container.style.opacity = "0";
      }
    }, {
      key: "showTip",
      value: function () {
        this.container.style.top = this.top + "px", this.container.style.left = this.left + "px", this.container.style.opacity = "1";
      }
    }]), t;
  }(),
  _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
  PRESET_COLOR_MAP = {
    "light-blue": "#7cd6fd",
    blue: "#5e64ff",
    violet: "#743ee2",
    red: "#ff5858",
    orange: "#ffa00a",
    yellow: "#feef72",
    green: "#28a745",
    "light-green": "#98d85b",
    purple: "#b554ff",
    magenta: "#ffa3ef",
    black: "#36114C",
    grey: "#bdd3e6",
    "light-grey": "#f0f4f7",
    "dark-grey": "#b8c2cc"
  },
  getColor = function (t) {
    return /rgb[a]{0,1}\([\d, ]+\)/gim.test(t) ? /\D+(\d*)\D+(\d*)\D+(\d*)/gim.exec(t).map(function (t, e) {
      return 0 !== e ? Number(t).toString(16) : "#";
    }).reduce(function (t, e) {
      return "" + t + e;
    }) : PRESET_COLOR_MAP[t] || t;
  },
  _slicedToArray = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  },
  AXIS_TICK_LENGTH = 6,
  LABEL_MARGIN = 4,
  LABEL_MAX_CHARS = 15,
  FONT_SIZE = 10,
  BASE_LINE_COLOR = "#dadada",
  FONT_FILL = "#555b51",
  makeOverlay = {
    bar: function (t) {
      var e = void 0;
      "rect" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode();
      return n.style.fill = "#000000", n.style.opacity = "0.4", e && n.setAttribute("transform", e), n;
    },
    dot: function (t) {
      var e = void 0;
      "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode(),
        i = t.getAttribute("r"),
        a = t.getAttribute("fill");
      return n.setAttribute("r", parseInt(i) + DOT_OVERLAY_SIZE_INCR), n.setAttribute("fill", a), n.style.opacity = "0.6", e && n.setAttribute("transform", e), n;
    },
    heat_square: function (t) {
      var e = void 0;
      "circle" !== t.nodeName && (e = t.getAttribute("transform"), t = t.childNodes[0]);
      var n = t.cloneNode(),
        i = t.getAttribute("r"),
        a = t.getAttribute("fill");
      return n.setAttribute("r", parseInt(i) + DOT_OVERLAY_SIZE_INCR), n.setAttribute("fill", a), n.style.opacity = "0.6", e && n.setAttribute("transform", e), n;
    }
  },
  updateOverlay = {
    bar: function (t, e) {
      var n = void 0;
      "rect" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["x", "y", "width", "height"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    },
    dot: function (t, e) {
      var n = void 0;
      "circle" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["cx", "cy"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    },
    heat_square: function (t, e) {
      var n = void 0;
      "circle" !== t.nodeName && (n = t.getAttribute("transform"), t = t.childNodes[0]);
      var i = ["cx", "cy"];
      Object.values(t.attributes).filter(function (t) {
        return i.includes(t.name) && t.specified;
      }).map(function (t) {
        e.setAttribute(t.name, t.nodeValue);
      }), n && e.setAttribute("transform", n);
    }
  },
  _slicedToArray$2 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  UNIT_ANIM_DUR = 350,
  PATH_ANIM_DUR = 350,
  MARKER_LINE_ANIM_DUR = UNIT_ANIM_DUR,
  REPLACE_ALL_NEW_DUR = 250,
  STD_EASING = "easein",
  _slicedToArray$1 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  EASING = {
    ease: "0.25 0.1 0.25 1",
    linear: "0 0 1 1",
    easein: "0.1 0.8 0.2 1",
    easeout: "0 0 0.58 1",
    easeinout: "0.42 0 0.58 1"
  },
  CSSTEXT = ".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",
  _createClass$2 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  BaseChart = function () {
    function t(e, n) {
      if (_classCallCheck$3(this, t), n = deepClone(n), this.parent = "string" == typeof e ? document.querySelector(e) : e, !(this.parent instanceof HTMLElement)) throw new Error("No `parent` element to render on was provided.");
      this.rawChartArgs = n, this.title = n.title || "", this.type = n.type || "", this.realData = this.prepareData(n.data), this.data = this.prepareFirstData(this.realData), this.colors = this.validateColors(n.colors, this.type), this.config = {
        showTooltip: 1,
        showLegend: 1,
        isNavigable: n.isNavigable || 0,
        animate: void 0 !== n.animate ? n.animate : 1,
        truncateLegends: n.truncateLegends || 1
      }, this.measures = JSON.parse(JSON.stringify(BASE_MEASURES));
      var i = this.measures;
      this.setMeasures(n), this.title.length || (i.titleHeight = 0), this.config.showLegend || (i.legendHeight = 0), this.argHeight = n.height || i.baseHeight, this.state = {}, this.options = {}, this.initTimeout = INIT_CHART_UPDATE_TIMEOUT, this.config.isNavigable && (this.overlays = []), this.configure(n);
    }
    return _createClass$2(t, [{
      key: "prepareData",
      value: function (t) {
        return t;
      }
    }, {
      key: "prepareFirstData",
      value: function (t) {
        return t;
      }
    }, {
      key: "validateColors",
      value: function (t, e) {
        var n = [];
        return (t = (t || []).concat(DEFAULT_COLORS[e])).forEach(function (t) {
          var e = getColor(t);
          isValidColor(e) ? n.push(e) : console.warn('"' + t + '" is not a valid color.');
        }), n;
      }
    }, {
      key: "setMeasures",
      value: function () {}
    }, {
      key: "configure",
      value: function () {
        var t = this,
          e = this.argHeight;
        this.baseHeight = e, this.height = e - getExtraHeight(this.measures), this.boundDrawFn = function () {
          return t.draw(!0);
        }, ResizeObserver && (this.resizeObserver = new ResizeObserver(this.boundDrawFn), this.resizeObserver.observe(this.parent)), window.addEventListener("resize", this.boundDrawFn), window.addEventListener("orientationchange", this.boundDrawFn);
      }
    }, {
      key: "destroy",
      value: function () {
        this.resizeObserver && this.resizeObserver.disconnect(), window.removeEventListener("resize", this.boundDrawFn), window.removeEventListener("orientationchange", this.boundDrawFn);
      }
    }, {
      key: "setup",
      value: function () {
        this.makeContainer(), this.updateWidth(), this.makeTooltip(), this.draw(!1, !0);
      }
    }, {
      key: "makeContainer",
      value: function () {
        this.parent.innerHTML = "";
        var t = {
          inside: this.parent,
          className: "chart-container"
        };
        this.independentWidth && (t.styles = {
          width: this.independentWidth + "px"
        }), this.container = $.create("div", t);
      }
    }, {
      key: "makeTooltip",
      value: function () {
        this.tip = new SvgTip({
          parent: this.container,
          colors: this.colors
        }), this.bindTooltip();
      }
    }, {
      key: "bindTooltip",
      value: function () {}
    }, {
      key: "draw",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        e && isHidden(this.parent) || (this.updateWidth(), this.calc(e), this.makeChartArea(), this.setupComponents(), this.components.forEach(function (e) {
          return e.setup(t.drawArea);
        }), this.render(this.components, !1), n && (this.data = this.realData, setTimeout(function () {
          t.update(t.data);
        }, this.initTimeout)), this.renderLegend(), this.setupNavigation(n));
      }
    }, {
      key: "calc",
      value: function () {}
    }, {
      key: "updateWidth",
      value: function () {
        this.baseWidth = getElementContentWidth(this.parent), this.width = this.baseWidth - getExtraWidth(this.measures);
      }
    }, {
      key: "makeChartArea",
      value: function () {
        this.svg && this.container.removeChild(this.svg);
        var t = this.measures;
        this.svg = makeSVGContainer(this.container, "frappe-chart chart", this.baseWidth, this.baseHeight), this.svgDefs = makeSVGDefs(this.svg), this.title.length && (this.titleEL = makeText("title", t.margins.left, t.margins.top, this.title, {
          fontSize: t.titleFontSize,
          fill: "#666666",
          dy: t.titleFontSize
        }));
        var e = getTopOffset(t);
        this.drawArea = makeSVGGroup(this.type + "-chart chart-draw-area", "translate(" + getLeftOffset(t) + ", " + e + ")"), this.config.showLegend && (e += this.height + t.paddings.bottom, this.legendArea = makeSVGGroup("chart-legend", "translate(" + getLeftOffset(t) + ", " + e + ")")), this.title.length && this.svg.appendChild(this.titleEL), this.svg.appendChild(this.drawArea), this.config.showLegend && this.svg.appendChild(this.legendArea), this.updateTipOffset(getLeftOffset(t), getTopOffset(t));
      }
    }, {
      key: "updateTipOffset",
      value: function (t, e) {
        this.tip.offset = {
          x: t,
          y: e
        };
      }
    }, {
      key: "setupComponents",
      value: function () {
        this.components = new Map();
      }
    }, {
      key: "update",
      value: function (t) {
        t || console.error("No data to update."), this.data = this.prepareData(t), this.calc(), this.render(this.components, this.config.animate), this.renderLegend();
      }
    }, {
      key: "render",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.components,
          n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.config.isNavigable && this.overlays.map(function (t) {
          return t.parentNode.removeChild(t);
        });
        var i = [];
        e.forEach(function (t) {
          i = i.concat(t.update(n));
        }), i.length > 0 ? (runSMILAnimation(this.container, this.svg, i), setTimeout(function () {
          e.forEach(function (t) {
            return t.make();
          }), t.updateNav();
        }, CHART_POST_ANIMATE_TIMEOUT)) : (e.forEach(function (t) {
          return t.make();
        }), this.updateNav());
      }
    }, {
      key: "updateNav",
      value: function () {
        this.config.isNavigable && (this.makeOverlay(), this.bindUnits());
      }
    }, {
      key: "renderLegend",
      value: function () {}
    }, {
      key: "setupNavigation",
      value: function () {
        var t = this,
          e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.config.isNavigable && e && (this.bindOverlay(), this.keyActions = {
          13: this.onEnterKey.bind(this),
          37: this.onLeftArrow.bind(this),
          38: this.onUpArrow.bind(this),
          39: this.onRightArrow.bind(this),
          40: this.onDownArrow.bind(this)
        }, document.addEventListener("keydown", function (e) {
          isElementInViewport(t.container) && (e = e || window.event, t.keyActions[e.keyCode] && t.keyActions[e.keyCode]());
        }));
      }
    }, {
      key: "makeOverlay",
      value: function () {}
    }, {
      key: "updateOverlay",
      value: function () {}
    }, {
      key: "bindOverlay",
      value: function () {}
    }, {
      key: "bindUnits",
      value: function () {}
    }, {
      key: "onLeftArrow",
      value: function () {}
    }, {
      key: "onRightArrow",
      value: function () {}
    }, {
      key: "onUpArrow",
      value: function () {}
    }, {
      key: "onDownArrow",
      value: function () {}
    }, {
      key: "onEnterKey",
      value: function () {}
    }, {
      key: "addDataPoint",
      value: function () {}
    }, {
      key: "removeDataPoint",
      value: function () {}
    }, {
      key: "getDataPoint",
      value: function () {}
    }, {
      key: "setCurrentDataPoint",
      value: function () {}
    }, {
      key: "updateDataset",
      value: function () {}
    }, {
      key: "export",
      value: function () {
        var t = prepareForExport(this.svg);
        downloadFile(this.title || "Chart", [t]);
      }
    }]), t;
  }(),
  _createClass$1 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$1 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  AggregationChart = function (t) {
    function e(t, n) {
      return _classCallCheck$2(this, e), _possibleConstructorReturn$1(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    }
    return _inherits$1(e, t), _createClass$1(e, [{
      key: "configure",
      value: function (t) {
        _get$1(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.config.formatTooltipY = (t.tooltipOptions || {}).formatTooltipY, this.config.maxSlices = t.maxSlices || 20, this.config.maxLegendPoints = t.maxLegendPoints || 20;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this,
          e = this.state,
          n = this.config.maxSlices;
        e.sliceTotals = [];
        var i = this.data.labels.map(function (e, n) {
            var i = 0;
            return t.data.datasets.map(function (t) {
              i += t.values[n];
            }), [i, e];
          }).filter(function (t) {
            return t[0] >= 0;
          }),
          a = i;
        if (i.length > n) {
          i.sort(function (t, e) {
            return e[0] - t[0];
          }), a = i.slice(0, n - 1);
          var r = 0;
          i.slice(n - 1).map(function (t) {
            r += t[0];
          }), a.push([r, "Rest"]), this.colors[n - 1] = "grey";
        }
        e.labels = [], a.map(function (t) {
          e.sliceTotals.push(round(t[0])), e.labels.push(t[1]);
        }), e.grandTotal = e.sliceTotals.reduce(function (t, e) {
          return t + e;
        }, 0), this.center = {
          x: this.width / 2,
          y: this.height / 2
        };
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this,
          e = this.state;
        this.legendArea.textContent = "", this.legendTotals = e.sliceTotals.slice(0, this.config.maxLegendPoints);
        var n = 0,
          i = 0;
        this.legendTotals.map(function (a, r) {
          var o = 150,
            s = Math.floor((t.width - getExtraWidth(t.measures)) / o);
          t.legendTotals.length < s && (o = t.width / t.legendTotals.length), n > s && (n = 0, i += 20);
          var l = o * n + 5,
            u = t.config.truncateLegends ? truncateString(e.labels[r], o / 10) : e.labels[r],
            c = t.config.formatTooltipY ? t.config.formatTooltipY(a) : a,
            h = legendDot(l, i, 5, t.colors[r], u + ": " + c, !1);
          t.legendArea.appendChild(h), n++;
        });
      }
    }]), e;
  }(BaseChart),
  NO_OF_YEAR_MONTHS = 12,
  NO_OF_DAYS_IN_WEEK = 7,
  NO_OF_MILLIS = 1e3,
  SEC_IN_DAY = 86400,
  MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  _slicedToArray$3 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _createClass$4 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  ChartComponent = function () {
    function t(e) {
      var n = e.layerClass,
        i = void 0 === n ? "" : n,
        a = e.layerTransform,
        r = void 0 === a ? "" : a,
        o = e.constants,
        s = e.getData,
        l = e.makeElements,
        u = e.animateElements;
      _classCallCheck$5(this, t), this.layerTransform = r, this.constants = o, this.makeElements = l, this.getData = s, this.animateElements = u, this.store = [], this.labels = [], this.layerClass = i, this.layerClass = "function" == typeof this.layerClass ? this.layerClass() : this.layerClass, this.refresh();
    }
    return _createClass$4(t, [{
      key: "refresh",
      value: function (t) {
        this.data = t || this.getData();
      }
    }, {
      key: "setup",
      value: function (t) {
        this.layer = makeSVGGroup(this.layerClass, this.layerTransform, t);
      }
    }, {
      key: "make",
      value: function () {
        this.render(this.data), this.oldData = this.data;
      }
    }, {
      key: "render",
      value: function (t) {
        var e = this;
        this.store = this.makeElements(t), this.layer.textContent = "", this.store.forEach(function (t) {
          e.layer.appendChild(t);
        }), this.labels.forEach(function (t) {
          e.layer.appendChild(t);
        });
      }
    }, {
      key: "update",
      value: function () {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.refresh();
        var e = [];
        return t && (e = this.animateElements(this.data) || []), e;
      }
    }]), t;
  }(),
  componentConfigs = {
    donutSlices: {
      layerClass: "donut-slices",
      makeElements: function (t) {
        return t.sliceStrings.map(function (e, n) {
          var i = makePath(e, "donut-path", t.colors[n], "none", t.strokeWidth);
          return i.style.transition = "transform .3s;", i;
        });
      },
      animateElements: function (t) {
        return this.store.map(function (e, n) {
          return animatePathStr(e, t.sliceStrings[n]);
        });
      }
    },
    pieSlices: {
      layerClass: "pie-slices",
      makeElements: function (t) {
        return t.sliceStrings.map(function (e, n) {
          var i = makePath(e, "pie-path", "none", t.colors[n]);
          return i.style.transition = "transform .3s;", i;
        });
      },
      animateElements: function (t) {
        return this.store.map(function (e, n) {
          return animatePathStr(e, t.sliceStrings[n]);
        });
      }
    },
    percentageBars: {
      layerClass: "percentage-bars",
      makeElements: function (t) {
        var e = this;
        return t.xPositions.map(function (n, i) {
          return percentageBar(n, 0, t.widths[i], e.constants.barHeight, e.constants.barDepth, t.colors[i]);
        });
      },
      animateElements: function (t) {
        if (t) return [];
      }
    },
    yAxis: {
      layerClass: "y axis",
      makeElements: function (t) {
        var e = this;
        return t.positions.map(function (n, i) {
          return yLine(n, t.labels[i], e.constants.width, {
            mode: e.constants.mode,
            pos: e.constants.pos,
            shortenNumbers: e.constants.shortenNumbers
          });
        });
      },
      animateElements: function (t) {
        var e = t.positions,
          n = t.labels,
          i = this.oldData.positions,
          a = this.oldData.labels,
          r = equilizeNoOfElements(i, e),
          o = _slicedToArray$3(r, 2);
        i = o[0], e = o[1];
        var s = equilizeNoOfElements(a, n),
          l = _slicedToArray$3(s, 2);
        return a = l[0], n = l[1], this.render({
          positions: i,
          labels: n
        }), this.store.map(function (t, n) {
          return translateHoriLine(t, e[n], i[n]);
        });
      }
    },
    xAxis: {
      layerClass: "x axis",
      makeElements: function (t) {
        var e = this;
        return t.positions.map(function (n, i) {
          return xLine(n, t.calcLabels[i], e.constants.height, {
            mode: e.constants.mode,
            pos: e.constants.pos
          });
        });
      },
      animateElements: function (t) {
        var e = t.positions,
          n = t.calcLabels,
          i = this.oldData.positions,
          a = this.oldData.calcLabels,
          r = equilizeNoOfElements(i, e),
          o = _slicedToArray$3(r, 2);
        i = o[0], e = o[1];
        var s = equilizeNoOfElements(a, n),
          l = _slicedToArray$3(s, 2);
        return a = l[0], n = l[1], this.render({
          positions: i,
          calcLabels: n
        }), this.store.map(function (t, n) {
          return translateVertLine(t, e[n], i[n]);
        });
      }
    },
    yMarkers: {
      layerClass: "y-markers",
      makeElements: function (t) {
        var e = this;
        return t.map(function (t) {
          return yMarker(t.position, t.label, e.constants.width, {
            labelPos: t.options.labelPos,
            mode: "span",
            lineType: "dashed"
          });
        });
      },
      animateElements: function (t) {
        var e = equilizeNoOfElements(this.oldData, t),
          n = _slicedToArray$3(e, 2);
        this.oldData = n[0];
        var i = (t = n[1]).map(function (t) {
            return t.position;
          }),
          a = t.map(function (t) {
            return t.label;
          }),
          r = t.map(function (t) {
            return t.options;
          }),
          o = this.oldData.map(function (t) {
            return t.position;
          });
        return this.render(o.map(function (t, e) {
          return {
            position: o[e],
            label: a[e],
            options: r[e]
          };
        })), this.store.map(function (t, e) {
          return translateHoriLine(t, i[e], o[e]);
        });
      }
    },
    yRegions: {
      layerClass: "y-regions",
      makeElements: function (t) {
        var e = this;
        return t.map(function (t) {
          return yRegion(t.startPos, t.endPos, e.constants.width, t.label, {
            labelPos: t.options.labelPos
          });
        });
      },
      animateElements: function (t) {
        var e = equilizeNoOfElements(this.oldData, t),
          n = _slicedToArray$3(e, 2);
        this.oldData = n[0];
        var i = (t = n[1]).map(function (t) {
            return t.endPos;
          }),
          a = t.map(function (t) {
            return t.label;
          }),
          r = t.map(function (t) {
            return t.startPos;
          }),
          o = t.map(function (t) {
            return t.options;
          }),
          s = this.oldData.map(function (t) {
            return t.endPos;
          }),
          l = this.oldData.map(function (t) {
            return t.startPos;
          });
        this.render(s.map(function (t, e) {
          return {
            startPos: l[e],
            endPos: s[e],
            label: a[e],
            options: o[e]
          };
        }));
        var u = [];
        return this.store.map(function (t, e) {
          u = u.concat(animateRegion(t, r[e], i[e], s[e]));
        }), u;
      }
    },
    heatDomain: {
      layerClass: function () {
        return "heat-domain domain-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this,
          n = this.constants,
          i = n.index,
          a = n.colWidth,
          r = n.rowHeight,
          o = n.squareSize,
          s = n.radius,
          l = n.xTranslate,
          u = 0;
        return this.serializedSubDomains = [], t.cols.map(function (t, n) {
          1 === n && e.labels.push(makeText("domain-name", l, -12, getMonthName(i, !0).toUpperCase(), {
            fontSize: 9
          })), t.map(function (t, n) {
            if (t.fill) {
              var i = {
                  "data-date": t.yyyyMmDd,
                  "data-value": t.dataValue,
                  "data-day": n
                },
                a = heatSquare("day", l, u, o, s, t.fill, i);
              e.serializedSubDomains.push(a);
            }
            u += r;
          }), u = 0, l += a;
        }), this.serializedSubDomains;
      },
      animateElements: function (t) {
        if (t) return [];
      }
    },
    barGraph: {
      layerClass: function () {
        return "dataset-units dataset-bars dataset-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this.constants;
        return this.unitType = "bar", this.units = t.yPositions.map(function (n, i) {
          return datasetBar(t.xPositions[i], n, t.barWidth, e.color, t.labels[i], i, t.offsets[i], {
            zeroLine: t.zeroLine,
            barsWidth: t.barsWidth,
            minHeight: e.minHeight
          });
        }), this.units;
      },
      animateElements: function (t) {
        var e = t.xPositions,
          n = t.yPositions,
          i = t.offsets,
          a = t.labels,
          r = this.oldData.xPositions,
          o = this.oldData.yPositions,
          s = this.oldData.offsets,
          l = this.oldData.labels,
          u = equilizeNoOfElements(r, e),
          c = _slicedToArray$3(u, 2);
        r = c[0], e = c[1];
        var h = equilizeNoOfElements(o, n),
          d = _slicedToArray$3(h, 2);
        o = d[0], n = d[1];
        var f = equilizeNoOfElements(s, i),
          p = _slicedToArray$3(f, 2);
        s = p[0], i = p[1];
        var v = equilizeNoOfElements(l, a),
          g = _slicedToArray$3(v, 2);
        l = g[0], a = g[1], this.render({
          xPositions: r,
          yPositions: o,
          offsets: s,
          labels: a,
          zeroLine: this.oldData.zeroLine,
          barsWidth: this.oldData.barsWidth,
          barWidth: this.oldData.barWidth
        });
        var y = [];
        return this.store.map(function (a, r) {
          y = y.concat(animateBar(a, e[r], n[r], t.barWidth, i[r], {
            zeroLine: t.zeroLine
          }));
        }), y;
      }
    },
    lineGraph: {
      layerClass: function () {
        return "dataset-units dataset-line dataset-" + this.constants.index;
      },
      makeElements: function (t) {
        var e = this.constants;
        return this.unitType = "dot", this.paths = {}, e.hideLine || (this.paths = getPaths(t.xPositions, t.yPositions, e.color, {
          heatline: e.heatline,
          regionFill: e.regionFill,
          spline: e.spline
        }, {
          svgDefs: e.svgDefs,
          zeroLine: t.zeroLine
        })), this.units = [], e.hideDots || (this.units = t.yPositions.map(function (n, i) {
          return datasetDot(t.xPositions[i], n, t.radius, e.color, e.valuesOverPoints ? t.values[i] : "", i);
        })), Object.values(this.paths).concat(this.units);
      },
      animateElements: function (t) {
        var e = t.xPositions,
          n = t.yPositions,
          i = t.values,
          a = this.oldData.xPositions,
          r = this.oldData.yPositions,
          o = this.oldData.values,
          s = equilizeNoOfElements(a, e),
          l = _slicedToArray$3(s, 2);
        a = l[0], e = l[1];
        var u = equilizeNoOfElements(r, n),
          c = _slicedToArray$3(u, 2);
        r = c[0], n = c[1];
        var h = equilizeNoOfElements(o, i),
          d = _slicedToArray$3(h, 2);
        o = d[0], i = d[1], this.render({
          xPositions: a,
          yPositions: r,
          values: i,
          zeroLine: this.oldData.zeroLine,
          radius: this.oldData.radius
        });
        var f = [];
        return Object.keys(this.paths).length && (f = f.concat(animatePath(this.paths, e, n, t.zeroLine, this.constants.spline))), this.units.length && this.units.map(function (t, i) {
          f = f.concat(animateDot(t, e[i], n[i]));
        }), f;
      }
    }
  },
  _createClass = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  PercentageChart = function (t) {
    function e(t, n) {
      _classCallCheck$1(this, e);
      var i = _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "percentage", i.setup(), i;
    }
    return _inherits(e, t), _createClass(e, [{
      key: "setMeasures",
      value: function (t) {
        var e = this.measures;
        this.barOptions = t.barOptions || {};
        var n = this.barOptions;
        n.height = n.height || PERCENTAGE_BAR_DEFAULT_HEIGHT, n.depth = n.depth || PERCENTAGE_BAR_DEFAULT_DEPTH, e.paddings.right = 30, e.legendHeight = 60, e.baseHeight = 8 * (n.height + .5 * n.depth);
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["percentageBars", {
            barHeight: this.barOptions.height,
            barDepth: this.barOptions.depth
          }, function () {
            return {
              xPositions: t.xPositions,
              widths: t.widths,
              colors: this.colors
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        n.xPositions = [], n.widths = [];
        var i = 0;
        n.sliceTotals.map(function (e) {
          var a = t.width * e / n.grandTotal;
          n.widths.push(a), n.xPositions.push(i), i += a;
        });
      }
    }, {
      key: "makeDataByIndex",
      value: function () {}
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this,
          e = this.state;
        this.container.addEventListener("mousemove", function (n) {
          var i = t.components.get("percentageBars").store,
            a = n.target;
          if (i.includes(a)) {
            var r = i.indexOf(a),
              o = getOffset(t.container),
              s = getOffset(a),
              l = s.left - o.left + parseInt(a.getAttribute("width")) / 2,
              u = s.top - o.top,
              c = (t.formattedLabels && t.formattedLabels.length > 0 ? t.formattedLabels[r] : t.state.labels[r]) + ": ",
              h = e.sliceTotals[r] / e.grandTotal;
            t.tip.setValues(l, u, {
              name: c,
              value: (100 * h).toFixed(1) + "%"
            }), t.tip.showTip();
          }
        });
      }
    }]), e;
  }(AggregationChart),
  _createClass$5 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$2 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  PieChart = function (t) {
    function e(t, n) {
      _classCallCheck$6(this, e);
      var i = _possibleConstructorReturn$2(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "pie", i.initTimeout = 0, i.init = 1, i.setup(), i;
    }
    return _inherits$2(e, t), _createClass$5(e, [{
      key: "configure",
      value: function (t) {
        _get$2(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.mouseMove = this.mouseMove.bind(this), this.mouseLeave = this.mouseLeave.bind(this), this.hoverRadio = t.hoverRadio || .1, this.config.startAngle = t.startAngle || 0, this.clockWise = t.clockWise || !1;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get$2(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        this.radius = this.height > this.width ? this.center.x : this.center.y;
        var i = this.radius,
          a = this.clockWise,
          r = n.slicesProperties || [];
        n.sliceStrings = [], n.slicesProperties = [];
        var o = 180 - this.config.startAngle;
        n.sliceTotals.map(function (e, s) {
          var l = o,
            u = e / n.grandTotal * FULL_ANGLE,
            c = u > 180 ? 1 : 0,
            h = a ? -u : u,
            d = o += h,
            f = getPositionByAngle(l, i),
            p = getPositionByAngle(d, i),
            v = t.init && r[s],
            g = void 0,
            y = void 0;
          t.init ? (g = v ? v.startPosition : f, y = v ? v.endPosition : f) : (g = f, y = p);
          var m = 360 === u ? makeCircleStr(g, y, t.center, t.radius, a, c) : makeArcPathStr(g, y, t.center, t.radius, a, c);
          n.sliceStrings.push(m), n.slicesProperties.push({
            startPosition: f,
            endPosition: p,
            value: e,
            total: n.grandTotal,
            startAngle: l,
            endAngle: d,
            angle: h
          });
        }), this.init = 0;
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["pieSlices", {}, function () {
            return {
              sliceStrings: t.sliceStrings,
              colors: this.colors
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray$2(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calTranslateByAngle",
      value: function (t) {
        var e = this.radius,
          n = this.hoverRadio,
          i = getPositionByAngle(t.startAngle + t.angle / 2, e);
        return "translate3d(" + i.x * n + "px," + i.y * n + "px,0)";
      }
    }, {
      key: "hoverSlice",
      value: function (t, e, n, i) {
        if (t) {
          var a = this.colors[e];
          if (n) {
            transform(t, this.calTranslateByAngle(this.state.slicesProperties[e])), t.style.fill = lightenDarkenColor(a, 50);
            var r = getOffset(this.svg),
              o = i.pageX - r.left + 10,
              s = i.pageY - r.top - 10,
              l = (this.formatted_labels && this.formatted_labels.length > 0 ? this.formatted_labels[e] : this.state.labels[e]) + ": ",
              u = (100 * this.state.sliceTotals[e] / this.state.grandTotal).toFixed(1);
            this.tip.setValues(o, s, {
              name: l,
              value: u + "%"
            }), this.tip.showTip();
          } else transform(t, "translate3d(0,0,0)"), this.tip.hideTip(), t.style.fill = a;
        }
      }
    }, {
      key: "bindTooltip",
      value: function () {
        this.container.addEventListener("mousemove", this.mouseMove), this.container.addEventListener("mouseleave", this.mouseLeave);
      }
    }, {
      key: "mouseMove",
      value: function (t) {
        var e = t.target,
          n = this.components.get("pieSlices").store,
          i = this.curActiveSliceIndex,
          a = this.curActiveSlice;
        if (n.includes(e)) {
          var r = n.indexOf(e);
          this.hoverSlice(a, i, !1), this.curActiveSlice = e, this.curActiveSliceIndex = r, this.hoverSlice(e, r, !0, t);
        } else this.mouseLeave();
      }
    }, {
      key: "mouseLeave",
      value: function () {
        this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
      }
    }]), e;
  }(AggregationChart),
  _slicedToArray$4 = function () {
    function t(t, e) {
      var n = [],
        i = !0,
        a = !1,
        r = void 0;
      try {
        for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
      } catch (t) {
        a = !0, r = t;
      } finally {
        try {
          !i && s.return && s.return();
        } finally {
          if (a) throw r;
        }
      }
      return n;
    }
    return function (e, n) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  _createClass$6 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  COL_WIDTH = HEATMAP_SQUARE_SIZE + HEATMAP_GUTTER_SIZE,
  ROW_HEIGHT = COL_WIDTH,
  Heatmap = function (t) {
    function e(t, n) {
      _classCallCheck$7(this, e);
      var i = _possibleConstructorReturn$3(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      i.type = "heatmap", i.countLabel = n.countLabel || "";
      var a = ["Sunday", "Monday"],
        r = a.includes(n.startSubDomain) ? n.startSubDomain : "Sunday";
      return i.startSubDomainIndex = a.indexOf(r), i.setup(), i;
    }
    return _inherits$3(e, t), _createClass$6(e, [{
      key: "setMeasures",
      value: function (t) {
        var e = this.measures;
        this.discreteDomains = 0 === t.discreteDomains ? 0 : 1, e.paddings.top = 3 * ROW_HEIGHT, e.paddings.bottom = 0, e.legendHeight = 2 * ROW_HEIGHT, e.baseHeight = ROW_HEIGHT * NO_OF_DAYS_IN_WEEK + getExtraHeight(e);
        var n = this.data,
          i = this.discreteDomains ? NO_OF_YEAR_MONTHS : 0;
        this.independentWidth = (getWeeksBetween(n.start, n.end) + i) * COL_WIDTH + getExtraWidth(e);
      }
    }, {
      key: "updateWidth",
      value: function () {
        var t = this.discreteDomains ? NO_OF_YEAR_MONTHS : 0,
          e = this.state.noOfWeeks ? this.state.noOfWeeks : 52;
        this.baseWidth = (e + t) * COL_WIDTH + getExtraWidth(this.measures);
      }
    }, {
      key: "prepareData",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data;
        if (t.start && t.end && t.start > t.end) throw new Error("Start date cannot be greater than end date.");
        if (t.start || (t.start = new Date(), t.start.setFullYear(t.start.getFullYear() - 1)), t.end || (t.end = new Date()), t.dataPoints = t.dataPoints || {}, parseInt(Object.keys(t.dataPoints)[0]) > 1e5) {
          var e = {};
          Object.keys(t.dataPoints).forEach(function (n) {
            var i = new Date(n * NO_OF_MILLIS);
            e[getYyyyMmDd(i)] = t.dataPoints[n];
          }), t.dataPoints = e;
        }
        return t;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this.state;
        t.start = clone(this.data.start), t.end = clone(this.data.end), t.firstWeekStart = clone(t.start), t.noOfWeeks = getWeeksBetween(t.start, t.end), t.distribution = calcDistribution(Object.values(this.data.dataPoints), HEATMAP_DISTRIBUTION_SIZE), t.domainConfigs = this.getDomains();
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this,
          e = this.state,
          n = this.discreteDomains ? 0 : 1,
          i = e.domainConfigs.map(function (i, a) {
            return ["heatDomain", {
              index: i.index,
              colWidth: COL_WIDTH,
              rowHeight: ROW_HEIGHT,
              squareSize: HEATMAP_SQUARE_SIZE,
              radius: t.rawChartArgs.radius || 0,
              xTranslate: e.domainConfigs.filter(function (t, e) {
                return e < a;
              }).map(function (t) {
                return t.cols.length - n;
              }).reduce(function (t, e) {
                return t + e;
              }, 0) * COL_WIDTH
            }, function () {
              return e.domainConfigs[a];
            }.bind(t)];
          });
        this.components = new Map(i.map(function (t, e) {
          var n = getComponent.apply(void 0, _toConsumableArray$3(t));
          return [t[0] + "-" + e, n];
        }));
        var a = 0;
        DAY_NAMES_SHORT.forEach(function (e, n) {
          if ([1, 3, 5].includes(n)) {
            var i = makeText("subdomain-name", -COL_WIDTH / 2, a, e, {
              fontSize: HEATMAP_SQUARE_SIZE,
              dy: 8,
              textAnchor: "end"
            });
            t.drawArea.appendChild(i);
          }
          a += ROW_HEIGHT;
        });
      }
    }, {
      key: "update",
      value: function (t) {
        t || console.error("No data to update."), this.data = this.prepareData(t), this.draw(), this.bindTooltip();
      }
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this;
        this.container.addEventListener("mousemove", function (e) {
          t.components.forEach(function (n) {
            var i = n.store,
              a = e.target;
            if (i.includes(a)) {
              var r = a.getAttribute("data-value"),
                o = a.getAttribute("data-date").split("-"),
                s = getMonthName(parseInt(o[1]) - 1, !0),
                l = t.container.getBoundingClientRect(),
                u = a.getBoundingClientRect(),
                c = parseInt(e.target.getAttribute("width")),
                h = u.left - l.left + c / 2,
                d = u.top - l.top,
                f = r + " " + t.countLabel,
                p = " on " + s + " " + o[0] + ", " + o[2];
              t.tip.setValues(h, d, {
                name: p,
                value: f,
                valueFirst: 1
              }, []), t.tip.showTip();
            }
          });
        });
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this;
        this.legendArea.textContent = "";
        var e = 0,
          n = ROW_HEIGHT,
          i = this.rawChartArgs.radius || 0,
          a = makeText("subdomain-name", e, n, "Less", {
            fontSize: HEATMAP_SQUARE_SIZE + 1,
            dy: 9
          });
        e = 2 * COL_WIDTH + COL_WIDTH / 2, this.legendArea.appendChild(a), this.colors.slice(0, HEATMAP_DISTRIBUTION_SIZE).map(function (a, r) {
          var o = heatSquare("heatmap-legend-unit", e + (COL_WIDTH + 3) * r, n, HEATMAP_SQUARE_SIZE, i, a);
          t.legendArea.appendChild(o);
        });
        var r = makeText("subdomain-name", e + HEATMAP_DISTRIBUTION_SIZE * (COL_WIDTH + 3) + COL_WIDTH / 4, n, "More", {
          fontSize: HEATMAP_SQUARE_SIZE + 1,
          dy: 9
        });
        this.legendArea.appendChild(r);
      }
    }, {
      key: "getDomains",
      value: function () {
        for (var t = this.state, e = [t.start.getMonth(), t.start.getFullYear()], n = e[0], i = e[1], a = [t.end.getMonth(), t.end.getFullYear()], r = a[0] - n + 1 + 12 * (a[1] - i), o = [], s = clone(t.start), l = 0; l < r; l++) {
          var u = t.end;
          if (!areInSameMonth(s, t.end)) {
            var c = [s.getMonth(), s.getFullYear()];
            u = getLastDateInMonth(c[0], c[1]);
          }
          o.push(this.getDomainConfig(s, u)), addDays(u, 1), s = u;
        }
        return o;
      }
    }, {
      key: "getDomainConfig",
      value: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = [t.getMonth(), t.getFullYear()],
          i = n[0],
          a = n[1],
          r = setDayToSunday(t),
          o = {
            index: i,
            cols: []
          };
        addDays(e = clone(e) || getLastDateInMonth(i, a), 1);
        for (var s = getWeeksBetween(r, e), l = [], u = void 0, c = 0; c < s; c++) u = this.getCol(r, i), l.push(u), addDays(r = new Date(u[NO_OF_DAYS_IN_WEEK - 1].yyyyMmDd), 1);
        return void 0 !== u[NO_OF_DAYS_IN_WEEK - 1].dataValue && (addDays(r, 1), l.push(this.getCol(r, i, !0))), o.cols = l, o;
      }
    }, {
      key: "getCol",
      value: function (t, e) {
        for (var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = this.state, a = clone(t), r = [], o = 0; o < NO_OF_DAYS_IN_WEEK; o++, addDays(a, 1)) {
          var s = {},
            l = a >= i.start && a <= i.end;
          n || a.getMonth() !== e || !l ? s.yyyyMmDd = getYyyyMmDd(a) : s = this.getSubDomainConfig(a), r.push(s);
        }
        return r;
      }
    }, {
      key: "getSubDomainConfig",
      value: function (t) {
        var e = getYyyyMmDd(t),
          n = this.data.dataPoints[e];
        return {
          yyyyMmDd: e,
          dataValue: n || 0,
          fill: this.colors[getMaxCheckpoint(n, this.state.distribution)]
        };
      }
    }]), e;
  }(BaseChart),
  _createClass$7 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$3 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  AxisChart = function (t) {
    function e(t, n) {
      _classCallCheck$8(this, e);
      var i = _possibleConstructorReturn$4(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.barOptions = n.barOptions || {}, i.lineOptions = n.lineOptions || {}, i.type = n.type || "line", i.init = 1, i.setup(), i;
    }
    return _inherits$4(e, t), _createClass$7(e, [{
      key: "setMeasures",
      value: function () {
        this.data.datasets.length <= 1 && (this.config.showLegend = 0, this.measures.paddings.bottom = 30);
      }
    }, {
      key: "configure",
      value: function (t) {
        _get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), t.axisOptions = t.axisOptions || {}, t.tooltipOptions = t.tooltipOptions || {}, this.config.xAxisMode = t.axisOptions.xAxisMode || "span", this.config.yAxisMode = t.axisOptions.yAxisMode || "span", this.config.xIsSeries = t.axisOptions.xIsSeries || 0, this.config.shortenYAxisNumbers = t.axisOptions.shortenYAxisNumbers || 0, this.config.formatTooltipX = t.tooltipOptions.formatTooltipX, this.config.formatTooltipY = t.tooltipOptions.formatTooltipY, this.config.valuesOverPoints = t.valuesOverPoints;
      }
    }, {
      key: "prepareData",
      value: function () {
        return dataPrep(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data, this.type);
      }
    }, {
      key: "prepareFirstData",
      value: function () {
        return zeroDataPrep(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data);
      }
    }, {
      key: "calc",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.calcXPositions(), t || this.calcYAxisParameters(this.getAllYValues(), "line" === this.type), this.makeDataByIndex();
      }
    }, {
      key: "calcXPositions",
      value: function () {
        var t = this.state,
          e = this.data.labels;
        t.datasetLength = e.length, t.unitWidth = this.width / t.datasetLength, t.xOffset = t.unitWidth / 2, t.xAxis = {
          labels: e,
          positions: e.map(function (e, n) {
            return floatTwo(t.xOffset + n * t.unitWidth);
          })
        };
      }
    }, {
      key: "calcYAxisParameters",
      value: function (t) {
        var e = calcChartIntervals(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "false"),
          n = this.height / getValueRange(e),
          i = getIntervalSize(e) * n,
          a = this.height - getZeroIndex(e) * i;
        this.state.yAxis = {
          labels: e,
          positions: e.map(function (t) {
            return a - t * n;
          }),
          scaleMultiplier: n,
          zeroLine: a
        }, this.calcDatasetPoints(), this.calcYExtremes(), this.calcYRegions();
      }
    }, {
      key: "calcDatasetPoints",
      value: function () {
        var t = this.state,
          e = function (e) {
            return e.map(function (e) {
              return scale(e, t.yAxis);
            });
          };
        t.datasets = this.data.datasets.map(function (t, n) {
          var i = t.values,
            a = t.cumulativeYs || [];
          return {
            name: t.name && t.name.replace(/<|>|&/g, function (t) {
              return "&" == t ? "&amp;" : "<" == t ? "&lt;" : "&gt;";
            }),
            index: n,
            chartType: t.chartType,
            values: i,
            yPositions: e(i),
            cumulativeYs: a,
            cumulativeYPos: e(a)
          };
        });
      }
    }, {
      key: "calcYExtremes",
      value: function () {
        var t = this.state;
        if (this.barOptions.stacked) return void (t.yExtremes = t.datasets[t.datasets.length - 1].cumulativeYPos);
        t.yExtremes = new Array(t.datasetLength).fill(9999), t.datasets.map(function (e) {
          e.yPositions.map(function (e, n) {
            e < t.yExtremes[n] && (t.yExtremes[n] = e);
          });
        });
      }
    }, {
      key: "calcYRegions",
      value: function () {
        var t = this.state;
        this.data.yMarkers && (this.state.yMarkers = this.data.yMarkers.map(function (e) {
          return e.position = scale(e.value, t.yAxis), e.options || (e.options = {}), e;
        })), this.data.yRegions && (this.state.yRegions = this.data.yRegions.map(function (e) {
          return e.startPos = scale(e.start, t.yAxis), e.endPos = scale(e.end, t.yAxis), e.options || (e.options = {}), e;
        }));
      }
    }, {
      key: "getAllYValues",
      value: function () {
        var t,
          e = this,
          n = "values";
        if (this.barOptions.stacked) {
          n = "cumulativeYs";
          var i = new Array(this.state.datasetLength).fill(0);
          this.data.datasets.map(function (t, a) {
            var r = e.data.datasets[a].values;
            t[n] = i = i.map(function (t, e) {
              return t + r[e];
            });
          });
        }
        var a = this.data.datasets.map(function (t) {
          return t[n];
        });
        return this.data.yMarkers && a.push(this.data.yMarkers.map(function (t) {
          return t.value;
        })), this.data.yRegions && this.data.yRegions.map(function (t) {
          a.push([t.end, t.start]);
        }), (t = []).concat.apply(t, _toConsumableArray$5(a));
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this,
          e = [["yAxis", {
            mode: this.config.yAxisMode,
            width: this.width,
            shortenNumbers: this.config.shortenYAxisNumbers
          }, function () {
            return this.state.yAxis;
          }.bind(this)], ["xAxis", {
            mode: this.config.xAxisMode,
            height: this.height
          }, function () {
            var t = this.state;
            return t.xAxis.calcLabels = getShortenedLabels(this.width, t.xAxis.labels, this.config.xIsSeries), t.xAxis;
          }.bind(this)], ["yRegions", {
            width: this.width,
            pos: "right"
          }, function () {
            return this.state.yRegions;
          }.bind(this)]],
          n = this.state.datasets.filter(function (t) {
            return "bar" === t.chartType;
          }),
          i = this.state.datasets.filter(function (t) {
            return "line" === t.chartType;
          }),
          a = n.map(function (e) {
            var i = e.index;
            return ["barGraph-" + e.index, {
              index: i,
              color: t.colors[i],
              stacked: t.barOptions.stacked,
              valuesOverPoints: t.config.valuesOverPoints,
              minHeight: t.height * MIN_BAR_PERCENT_HEIGHT
            }, function () {
              var t = this.state,
                e = t.datasets[i],
                a = this.barOptions.stacked,
                r = this.barOptions.spaceRatio || BAR_CHART_SPACE_RATIO,
                o = t.unitWidth * (1 - r),
                s = o / (a ? 1 : n.length),
                l = t.xAxis.positions.map(function (t) {
                  return t - o / 2;
                });
              a || (l = l.map(function (t) {
                return t + s * i;
              }));
              var u = new Array(t.datasetLength).fill("");
              this.config.valuesOverPoints && (u = a && e.index === t.datasets.length - 1 ? e.cumulativeYs : e.values);
              var c = new Array(t.datasetLength).fill(0);
              return a && (c = e.yPositions.map(function (t, n) {
                return t - e.cumulativeYPos[n];
              })), {
                xPositions: l,
                yPositions: e.yPositions,
                offsets: c,
                labels: u,
                zeroLine: t.yAxis.zeroLine,
                barsWidth: o,
                barWidth: s
              };
            }.bind(t)];
          }),
          r = i.map(function (e) {
            var n = e.index;
            return ["lineGraph-" + e.index, {
              index: n,
              color: t.colors[n],
              svgDefs: t.svgDefs,
              heatline: t.lineOptions.heatline,
              regionFill: t.lineOptions.regionFill,
              spline: t.lineOptions.spline,
              hideDots: t.lineOptions.hideDots,
              hideLine: t.lineOptions.hideLine,
              valuesOverPoints: t.config.valuesOverPoints
            }, function () {
              var t = this.state,
                e = t.datasets[n],
                i = t.yAxis.positions[0] < t.yAxis.zeroLine ? t.yAxis.positions[0] : t.yAxis.zeroLine;
              return {
                xPositions: t.xAxis.positions,
                yPositions: e.yPositions,
                values: e.values,
                zeroLine: i,
                radius: this.lineOptions.dotSize || LINE_CHART_DOT_SIZE
              };
            }.bind(t)];
          }),
          o = [["yMarkers", {
            width: this.width,
            pos: "right"
          }, function () {
            return this.state.yMarkers;
          }.bind(this)]];
        e = e.concat(a, r, o);
        var s = ["yMarkers", "yRegions"];
        this.dataUnitComponents = [], this.components = new Map(e.filter(function (e) {
          return !s.includes(e[0]) || t.state[e[0]];
        }).map(function (e) {
          var n = getComponent.apply(void 0, _toConsumableArray$5(e));
          return (e[0].includes("lineGraph") || e[0].includes("barGraph")) && t.dataUnitComponents.push(n), [e[0], n];
        }));
      }
    }, {
      key: "makeDataByIndex",
      value: function () {
        var t = this;
        this.dataByIndex = {};
        var e = this.state,
          n = this.config.formatTooltipX,
          i = this.config.formatTooltipY;
        e.xAxis.labels.map(function (a, r) {
          var o = t.state.datasets.map(function (e, n) {
            var a = e.values[r];
            return {
              title: e.name,
              value: a,
              yPos: e.yPositions[r],
              color: t.colors[n],
              formatted: i ? i(a) : a
            };
          });
          t.dataByIndex[r] = {
            label: a,
            formattedLabel: n ? n(a) : a,
            xPos: e.xAxis.positions[r],
            values: o,
            yExtreme: e.yExtremes[r]
          };
        });
      }
    }, {
      key: "bindTooltip",
      value: function () {
        var t = this;
        this.container.addEventListener("mousemove", function (e) {
          var n = t.measures,
            i = getOffset(t.container),
            a = e.pageX - i.left - getLeftOffset(n),
            r = e.pageY - i.top;
          r < t.height + getTopOffset(n) && r > getTopOffset(n) ? t.mapTooltipXPosition(a) : t.tip.hideTip();
        });
      }
    }, {
      key: "mapTooltipXPosition",
      value: function (t) {
        var e = this.state;
        if (e.yExtremes) {
          var n = getClosestInArray(t, e.xAxis.positions, !0);
          if (n >= 0) {
            var i = this.dataByIndex[n];
            this.tip.setValues(i.xPos + this.tip.offset.x, i.yExtreme + this.tip.offset.y, {
              name: i.formattedLabel,
              value: ""
            }, i.values, n), this.tip.showTip();
          }
        }
      }
    }, {
      key: "renderLegend",
      value: function () {
        var t = this,
          e = this.data;
        e.datasets.length > 1 && (this.legendArea.textContent = "", e.datasets.map(function (e, n) {
          var i = AXIS_LEGEND_BAR_SIZE,
            a = legendBar(i * n, "0", i, t.colors[n], e.name, t.config.truncateLegends);
          t.legendArea.appendChild(a);
        }));
      }
    }, {
      key: "makeOverlay",
      value: function () {
        var t = this;
        if (this.init) return void (this.init = 0);
        this.overlayGuides && this.overlayGuides.forEach(function (t) {
          var e = t.overlay;
          e.parentNode.removeChild(e);
        }), this.overlayGuides = this.dataUnitComponents.map(function (t) {
          return {
            type: t.unitType,
            overlay: void 0,
            units: t.units
          };
        }), void 0 === this.state.currentIndex && (this.state.currentIndex = this.state.datasetLength - 1), this.overlayGuides.map(function (e) {
          var n = e.units[t.state.currentIndex];
          e.overlay = makeOverlay[e.type](n), t.drawArea.appendChild(e.overlay);
        });
      }
    }, {
      key: "updateOverlayGuides",
      value: function () {
        this.overlayGuides && this.overlayGuides.forEach(function (t) {
          var e = t.overlay;
          e.parentNode.removeChild(e);
        });
      }
    }, {
      key: "bindOverlay",
      value: function () {
        var t = this;
        this.parent.addEventListener("data-select", function () {
          t.updateOverlay();
        });
      }
    }, {
      key: "bindUnits",
      value: function () {
        var t = this;
        this.dataUnitComponents.map(function (e) {
          e.units.map(function (e) {
            e.addEventListener("click", function () {
              var n = e.getAttribute("data-point-index");
              t.setCurrentDataPoint(n);
            });
          });
        }), this.tip.container.addEventListener("click", function () {
          var e = t.tip.container.getAttribute("data-point-index");
          t.setCurrentDataPoint(e);
        });
      }
    }, {
      key: "updateOverlay",
      value: function () {
        var t = this;
        this.overlayGuides.map(function (e) {
          var n = e.units[t.state.currentIndex];
          updateOverlay[e.type](n, e.overlay);
        });
      }
    }, {
      key: "onLeftArrow",
      value: function () {
        this.setCurrentDataPoint(this.state.currentIndex - 1);
      }
    }, {
      key: "onRightArrow",
      value: function () {
        this.setCurrentDataPoint(this.state.currentIndex + 1);
      }
    }, {
      key: "getDataPoint",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.currentIndex,
          e = this.state;
        return {
          index: t,
          label: e.xAxis.labels[t],
          values: e.datasets.map(function (e) {
            return e.values[t];
          })
        };
      }
    }, {
      key: "setCurrentDataPoint",
      value: function (t) {
        var e = this.state;
        (t = parseInt(t)) < 0 && (t = 0), t >= e.xAxis.labels.length && (t = e.xAxis.labels.length - 1), t !== e.currentIndex && (e.currentIndex = t, fire(this.parent, "data-select", this.getDataPoint()));
      }
    }, {
      key: "addDataPoint",
      value: function (t, n) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.state.datasetLength;
        _get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "addDataPoint", this).call(this, t, n, i), this.data.labels.splice(i, 0, t), this.data.datasets.map(function (t, e) {
          t.values.splice(i, 0, n[e]);
        }), this.update(this.data);
      }
    }, {
      key: "removeDataPoint",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.datasetLength - 1;
        this.data.labels.length <= 1 || (_get$3(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "removeDataPoint", this).call(this, t), this.data.labels.splice(t, 1), this.data.datasets.map(function (e) {
          e.values.splice(t, 1);
        }), this.update(this.data));
      }
    }, {
      key: "updateDataset",
      value: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this.data.datasets[e].values = t, this.update(this.data);
      }
    }, {
      key: "updateDatasets",
      value: function (t) {
        this.data.datasets.map(function (e, n) {
          t[n] && (e.values = t[n]);
        }), this.update(this.data);
      }
    }]), e;
  }(BaseChart),
  _createClass$8 = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }
    return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
  _get$4 = function t(e, n, i) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
      var r = Object.getPrototypeOf(e);
      return null === r ? void 0 : t(r, n, i);
    }
    if ("value" in a) return a.value;
    var o = a.get;
    if (void 0 !== o) return o.call(i);
  },
  DonutChart = function (t) {
    function e(t, n) {
      _classCallCheck$9(this, e);
      var i = _possibleConstructorReturn$5(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
      return i.type = "donut", i.initTimeout = 0, i.init = 1, i.setup(), i;
    }
    return _inherits$5(e, t), _createClass$8(e, [{
      key: "configure",
      value: function (t) {
        _get$4(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "configure", this).call(this, t), this.mouseMove = this.mouseMove.bind(this), this.mouseLeave = this.mouseLeave.bind(this), this.hoverRadio = t.hoverRadio || .1, this.config.startAngle = t.startAngle || 0, this.clockWise = t.clockWise || !1, this.strokeWidth = t.strokeWidth || 30;
      }
    }, {
      key: "calc",
      value: function () {
        var t = this;
        _get$4(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "calc", this).call(this);
        var n = this.state;
        this.radius = this.height > this.width ? this.center.x - this.strokeWidth / 2 : this.center.y - this.strokeWidth / 2;
        var i = this.radius,
          a = this.clockWise,
          r = n.slicesProperties || [];
        n.sliceStrings = [], n.slicesProperties = [];
        var o = 180 - this.config.startAngle;
        n.sliceTotals.map(function (e, s) {
          var l = o,
            u = e / n.grandTotal * FULL_ANGLE,
            c = u > 180 ? 1 : 0,
            h = a ? -u : u,
            d = o += h,
            f = getPositionByAngle(l, i),
            p = getPositionByAngle(d, i),
            v = t.init && r[s],
            g = void 0,
            y = void 0;
          t.init ? (g = v ? v.startPosition : f, y = v ? v.endPosition : f) : (g = f, y = p);
          var m = 360 === u ? makeStrokeCircleStr(g, y, t.center, t.radius, t.clockWise, c) : makeArcStrokePathStr(g, y, t.center, t.radius, t.clockWise, c);
          n.sliceStrings.push(m), n.slicesProperties.push({
            startPosition: f,
            endPosition: p,
            value: e,
            total: n.grandTotal,
            startAngle: l,
            endAngle: d,
            angle: h
          });
        }), this.init = 0;
      }
    }, {
      key: "setupComponents",
      value: function () {
        var t = this.state,
          e = [["donutSlices", {}, function () {
            return {
              sliceStrings: t.sliceStrings,
              colors: this.colors,
              strokeWidth: this.strokeWidth
            };
          }.bind(this)]];
        this.components = new Map(e.map(function (t) {
          var e = getComponent.apply(void 0, _toConsumableArray$7(t));
          return [t[0], e];
        }));
      }
    }, {
      key: "calTranslateByAngle",
      value: function (t) {
        var e = this.radius,
          n = this.hoverRadio,
          i = getPositionByAngle(t.startAngle + t.angle / 2, e);
        return "translate3d(" + i.x * n + "px," + i.y * n + "px,0)";
      }
    }, {
      key: "hoverSlice",
      value: function (t, e, n, i) {
        if (t) {
          var a = this.colors[e];
          if (n) {
            transform(t, this.calTranslateByAngle(this.state.slicesProperties[e])), t.style.stroke = lightenDarkenColor(a, 50);
            var r = getOffset(this.svg),
              o = i.pageX - r.left + 10,
              s = i.pageY - r.top - 10,
              l = (this.formatted_labels && this.formatted_labels.length > 0 ? this.formatted_labels[e] : this.state.labels[e]) + ": ",
              u = (100 * this.state.sliceTotals[e] / this.state.grandTotal).toFixed(1);
            this.tip.setValues(o, s, {
              name: l,
              value: u + "%"
            }), this.tip.showTip();
          } else transform(t, "translate3d(0,0,0)"), this.tip.hideTip(), t.style.stroke = a;
        }
      }
    }, {
      key: "bindTooltip",
      value: function () {
        this.container.addEventListener("mousemove", this.mouseMove), this.container.addEventListener("mouseleave", this.mouseLeave);
      }
    }, {
      key: "mouseMove",
      value: function (t) {
        var e = t.target,
          n = this.components.get("donutSlices").store,
          i = this.curActiveSliceIndex,
          a = this.curActiveSlice;
        if (n.includes(e)) {
          var r = n.indexOf(e);
          this.hoverSlice(a, i, !1), this.curActiveSlice = e, this.curActiveSliceIndex = r, this.hoverSlice(e, r, !0, t);
        } else this.mouseLeave();
      }
    }, {
      key: "mouseLeave",
      value: function () {
        this.hoverSlice(this.curActiveSlice, this.curActiveSliceIndex, !1);
      }
    }]), e;
  }(AggregationChart),
  chartTypes = {
    bar: AxisChart,
    line: AxisChart,
    percentage: PercentageChart,
    heatmap: Heatmap,
    pie: PieChart,
    donut: DonutChart
  },
  Chart = function t(e, n) {
    return _classCallCheck(this, t), getChartByType(n.type, e, n);
  };
exports.Chart = Chart;
exports.AxisChart = AxisChart;
exports.Heatmap = Heatmap;
exports.PieChart = PieChart;
exports.PercentageChart = PercentageChart;
},{}],"../node_modules/leaflet/dist/leaflet.js":[function(require,module,exports) {
var define;
/* @preserve
 * Leaflet 1.9.2, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).leaflet={})}(this,function(t){"use strict";function l(t){for(var e,i,n=1,o=arguments.length;n<o;n++)for(e in i=arguments[n])t[e]=i[e];return t}var R=Object.create||function(t){return N.prototype=t,new N};function N(){}function a(t,e){var i,n=Array.prototype.slice;return t.bind?t.bind.apply(t,n.call(arguments,1)):(i=n.call(arguments,2),function(){return t.apply(e,i.length?i.concat(n.call(arguments)):arguments)})}var D=0;function h(t){return"_leaflet_id"in t||(t._leaflet_id=++D),t._leaflet_id}function j(t,e,i){var n,o,s=function(){n=!1,o&&(r.apply(i,o),o=!1)},r=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(s,e),n=!0)};return r}function H(t,e,i){var n=e[1],e=e[0],o=n-e;return t===n&&i?t:((t-e)%o+o)%o+e}function u(){return!1}function i(t,e){return!1===e?t:(e=Math.pow(10,void 0===e?6:e),Math.round(t*e)/e)}function F(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function W(t){return F(t).split(/\s+/)}function c(t,e){for(var i in Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?R(t.options):{}),e)t.options[i]=e[i];return t.options}function U(t,e,i){var n,o=[];for(n in t)o.push(encodeURIComponent(i?n.toUpperCase():n)+"="+encodeURIComponent(t[n]));return(e&&-1!==e.indexOf("?")?"&":"?")+o.join("&")}var V=/\{ *([\w_ -]+) *\}/g;function q(t,i){return t.replace(V,function(t,e){e=i[e];if(void 0===e)throw new Error("No value provided for variable "+t);return e="function"==typeof e?e(i):e})}var d=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function G(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var K="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function Y(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var X=0;function J(t){var e=+new Date,i=Math.max(0,16-(e-X));return X=e+i,window.setTimeout(t,i)}var $=window.requestAnimationFrame||Y("RequestAnimationFrame")||J,Q=window.cancelAnimationFrame||Y("CancelAnimationFrame")||Y("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function x(t,e,i){if(!i||$!==J)return $.call(window,a(t,e));t.call(e)}function r(t){t&&Q.call(window,t)}var tt={__proto__:null,extend:l,create:R,bind:a,get lastId(){return D},stamp:h,throttle:j,wrapNum:H,falseFn:u,formatNum:i,trim:F,splitWords:W,setOptions:c,getParamString:U,template:q,isArray:d,indexOf:G,emptyImageUrl:K,requestFn:$,cancelFn:Q,requestAnimFrame:x,cancelAnimFrame:r};function et(){}et.extend=function(t){function e(){c(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()}var i,n=e.__super__=this.prototype,o=R(n);for(i in(o.constructor=e).prototype=o,this)Object.prototype.hasOwnProperty.call(this,i)&&"prototype"!==i&&"__super__"!==i&&(e[i]=this[i]);if(t.statics&&l(e,t.statics),t.includes){var s=t.includes;if("undefined"!=typeof L&&L&&L.Mixin){s=d(s)?s:[s];for(var r=0;r<s.length;r++)s[r]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}l.apply(null,[o].concat(t.includes))}return l(o,t),delete o.statics,delete o.includes,o.options&&(o.options=n.options?R(n.options):{},l(o.options,t.options)),o._initHooks=[],o.callInitHooks=function(){if(!this._initHooksCalled){n.callInitHooks&&n.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=o._initHooks.length;t<e;t++)o._initHooks[t].call(this)}},e},et.include=function(t){var e=this.prototype.options;return l(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},et.mergeOptions=function(t){return l(this.prototype.options,t),this},et.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};var e={on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e);else for(var o=0,s=(t=W(t)).length;o<s;o++)this._on(t[o],e,i);return this},off:function(t,e,i){if(arguments.length)if("object"==typeof t)for(var n in t)this._off(n,t[n],e);else{t=W(t);for(var o=1===arguments.length,s=0,r=t.length;s<r;s++)o?this._off(t[s]):this._off(t[s],e,i)}else delete this._events;return this},_on:function(t,e,i,n){"function"!=typeof e?console.warn("wrong listener type: "+typeof e):!1===this._listens(t,e,i)&&(e={fn:e,ctx:i=i===this?void 0:i},n&&(e.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(e))},_off:function(t,e,i){var n,o,s;if(this._events&&(n=this._events[t]))if(1===arguments.length){if(this._firingCount)for(o=0,s=n.length;o<s;o++)n[o].fn=u;delete this._events[t]}else"function"!=typeof e?console.warn("wrong listener type: "+typeof e):!1!==(e=this._listens(t,e,i))&&(i=n[e],this._firingCount&&(i.fn=u,this._events[t]=n=n.slice()),n.splice(e,1))},fire:function(t,e,i){if(this.listens(t,i)){var n=l({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var o=this._events[t];if(o){this._firingCount=this._firingCount+1||1;for(var s=0,r=o.length;s<r;s++){var a=o[s],h=a.fn;a.once&&this.off(t,h,a.ctx),h.call(a.ctx||this,n)}this._firingCount--}}i&&this._propagateEvent(n)}return this},listens:function(t,e,i,n){"string"!=typeof t&&console.warn('"string" type argument expected');var o=e,s=("function"!=typeof e&&(n=!!e,i=o=void 0),this._events&&this._events[t]);if(s&&s.length&&!1!==this._listens(t,o,i))return!0;if(n)for(var r in this._eventParents)if(this._eventParents[r].listens(t,e,i,n))return!0;return!1},_listens:function(t,e,i){if(this._events){var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var o=0,s=n.length;o<s;o++)if(n[o].fn===e&&n[o].ctx===i)return o}return!1},once:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e,!0);else for(var o=0,s=(t=W(t)).length;o<s;o++)this._on(t[o],e,i,!0);return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[h(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[h(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,l({layer:t.target,propagatedFrom:t.target},t),!0)}},it=(e.addEventListener=e.on,e.removeEventListener=e.clearAllEventListeners=e.off,e.addOneTimeEventListener=e.once,e.fireEvent=e.fire,e.hasEventListeners=e.listens,et.extend(e));function p(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var nt=Math.trunc||function(t){return 0<t?Math.floor(t):Math.ceil(t)};function m(t,e,i){return t instanceof p?t:d(t)?new p(t[0],t[1]):null==t?t:"object"==typeof t&&"x"in t&&"y"in t?new p(t.x,t.y):new p(t,e,i)}function f(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}function _(t,e){return!t||t instanceof f?t:new f(t,e)}function s(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}function g(t,e){return t instanceof s?t:new s(t,e)}function v(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,void 0!==i&&(this.alt=+i)}function w(t,e,i){return t instanceof v?t:d(t)&&"object"!=typeof t[0]?3===t.length?new v(t[0],t[1],t[2]):2===t.length?new v(t[0],t[1]):null:null==t?t:"object"==typeof t&&"lat"in t?new v(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===e?null:new v(t,e,i)}p.prototype={clone:function(){return new p(this.x,this.y)},add:function(t){return this.clone()._add(m(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(m(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new p(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new p(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=nt(this.x),this.y=nt(this.y),this},distanceTo:function(t){var e=(t=m(t)).x-this.x,t=t.y-this.y;return Math.sqrt(e*e+t*t)},equals:function(t){return(t=m(t)).x===this.x&&t.y===this.y},contains:function(t){return t=m(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+i(this.x)+", "+i(this.y)+")"}},f.prototype={extend:function(t){var e,i;if(t){if(t instanceof p||"number"==typeof t[0]||"x"in t)e=i=m(t);else if(e=(t=_(t)).min,i=t.max,!e||!i)return this;this.min||this.max?(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)):(this.min=e.clone(),this.max=i.clone())}return this},getCenter:function(t){return m((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return m(this.min.x,this.max.y)},getTopRight:function(){return m(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return(t=("number"==typeof t[0]||t instanceof p?m:_)(t))instanceof f?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=_(t);var e=this.min,i=this.max,n=t.min,t=t.max,o=t.x>=e.x&&n.x<=i.x,t=t.y>=e.y&&n.y<=i.y;return o&&t},overlaps:function(t){t=_(t);var e=this.min,i=this.max,n=t.min,t=t.max,o=t.x>e.x&&n.x<i.x,t=t.y>e.y&&n.y<i.y;return o&&t},isValid:function(){return!(!this.min||!this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,t=Math.abs(e.y-i.y)*t;return _(m(e.x-n,e.y-t),m(i.x+n,i.y+t))},equals:function(t){return!!t&&(t=_(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight()))}},s.prototype={extend:function(t){var e,i,n=this._southWest,o=this._northEast;if(t instanceof v)i=e=t;else{if(!(t instanceof s))return t?this.extend(w(t)||g(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||o?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),o.lat=Math.max(i.lat,o.lat),o.lng=Math.max(i.lng,o.lng)):(this._southWest=new v(e.lat,e.lng),this._northEast=new v(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,t=Math.abs(e.lng-i.lng)*t;return new s(new v(e.lat-n,e.lng-t),new v(i.lat+n,i.lng+t))},getCenter:function(){return new v((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new v(this.getNorth(),this.getWest())},getSouthEast:function(){return new v(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t=("number"==typeof t[0]||t instanceof v||"lat"in t?w:g)(t);var e,i,n=this._southWest,o=this._northEast;return t instanceof s?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=o.lat&&e.lng>=n.lng&&i.lng<=o.lng},intersects:function(t){t=g(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),t=t.getNorthEast(),o=t.lat>=e.lat&&n.lat<=i.lat,t=t.lng>=e.lng&&n.lng<=i.lng;return o&&t},overlaps:function(t){t=g(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),t=t.getNorthEast(),o=t.lat>e.lat&&n.lat<i.lat,t=t.lng>e.lng&&n.lng<i.lng;return o&&t},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return!!t&&(t=g(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e))},isValid:function(){return!(!this._southWest||!this._northEast)}};var ot={latLngToPoint:function(t,e){t=this.projection.project(t),e=this.scale(e);return this.transformation._transform(t,e)},pointToLatLng:function(t,e){e=this.scale(e),t=this.transformation.untransform(t,e);return this.projection.unproject(t)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){var e;return this.infinite?null:(e=this.projection.bounds,t=this.scale(t),new f(this.transformation.transform(e.min,t),this.transformation.transform(e.max,t)))},infinite:!(v.prototype={equals:function(t,e){return!!t&&(t=w(t),Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))<=(void 0===e?1e-9:e))},toString:function(t){return"LatLng("+i(this.lat,t)+", "+i(this.lng,t)+")"},distanceTo:function(t){return st.distance(this,w(t))},wrap:function(){return st.wrapLatLng(this)},toBounds:function(t){var t=180*t/40075017,e=t/Math.cos(Math.PI/180*this.lat);return g([this.lat-t,this.lng-e],[this.lat+t,this.lng+e])},clone:function(){return new v(this.lat,this.lng,this.alt)}}),wrapLatLng:function(t){var e=this.wrapLng?H(t.lng,this.wrapLng,!0):t.lng;return new v(this.wrapLat?H(t.lat,this.wrapLat,!0):t.lat,e,t.alt)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,e=e.lng-i.lng;return 0==n&&0==e?t:(i=t.getSouthWest(),t=t.getNorthEast(),new s(new v(i.lat-n,i.lng-e),new v(t.lat-n,t.lng-e)))}},st=l({},ot,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin((e.lat-t.lat)*i/2),e=Math.sin((e.lng-t.lng)*i/2),t=s*s+Math.cos(n)*Math.cos(o)*e*e,i=2*Math.atan2(Math.sqrt(t),Math.sqrt(1-t));return this.R*i}}),rt=6378137,rt={R:rt,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,i=Math.max(Math.min(i,t.lat),-i),i=Math.sin(i*e);return new p(this.R*t.lng*e,this.R*Math.log((1+i)/(1-i))/2)},unproject:function(t){var e=180/Math.PI;return new v((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:new f([-(rt=rt*Math.PI),-rt],[rt,rt])};function at(t,e,i,n){d(t)?(this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3]):(this._a=t,this._b=e,this._c=i,this._d=n)}function ht(t,e,i,n){return new at(t,e,i,n)}at.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return t.x=(e=e||1)*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return new p((t.x/(e=e||1)-this._b)/this._a,(t.y/e-this._d)/this._c)}};var lt=l({},st,{code:"EPSG:3857",projection:rt,transformation:ht(lt=.5/(Math.PI*rt.R),.5,-lt,.5)}),ut=l({},lt,{code:"EPSG:900913"});function ct(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function dt(t,e){for(var i,n,o,s,r="",a=0,h=t.length;a<h;a++){for(i=0,n=(o=t[a]).length;i<n;i++)r+=(i?"L":"M")+(s=o[i]).x+" "+s.y;r+=e?b.svg?"z":"x":""}return r||"M0 0"}var _t=document.documentElement.style,pt="ActiveXObject"in window,mt=pt&&!document.addEventListener,n="msLaunchUri"in navigator&&!("documentMode"in document),ft=y("webkit"),gt=y("android"),vt=y("android 2")||y("android 3"),yt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),yt=gt&&y("Google")&&yt<537&&!("AudioNode"in window),xt=!!window.opera,wt=!n&&y("chrome"),bt=y("gecko")&&!ft&&!xt&&!pt,Pt=!wt&&y("safari"),Lt=y("phantom"),o="OTransition"in _t,Tt=0===navigator.platform.indexOf("Win"),Mt=pt&&"transition"in _t,zt="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!vt,_t="MozPerspective"in _t,Ct=!window.L_DISABLE_3D&&(Mt||zt||_t)&&!o&&!Lt,Zt="undefined"!=typeof orientation||y("mobile"),St=Zt&&ft,Et=Zt&&zt,kt=!window.PointerEvent&&window.MSPointerEvent,At=!(!window.PointerEvent&&!kt),Bt="ontouchstart"in window||!!window.TouchEvent,Ot=!window.L_NO_TOUCH&&(Bt||At),It=Zt&&xt,Rt=Zt&&bt,Nt=1<(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI),Dt=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",u,e),window.removeEventListener("testPassiveEventSupport",u,e)}catch(t){}return t}(),jt=!!document.createElement("canvas").getContext,Ht=!(!document.createElementNS||!ct("svg").createSVGRect),Ft=!!Ht&&((Ft=document.createElement("div")).innerHTML="<svg/>","http://www.w3.org/2000/svg"===(Ft.firstChild&&Ft.firstChild.namespaceURI));function y(t){return 0<=navigator.userAgent.toLowerCase().indexOf(t)}var b={ie:pt,ielt9:mt,edge:n,webkit:ft,android:gt,android23:vt,androidStock:yt,opera:xt,chrome:wt,gecko:bt,safari:Pt,phantom:Lt,opera12:o,win:Tt,ie3d:Mt,webkit3d:zt,gecko3d:_t,any3d:Ct,mobile:Zt,mobileWebkit:St,mobileWebkit3d:Et,msPointer:kt,pointer:At,touch:Ot,touchNative:Bt,mobileOpera:It,mobileGecko:Rt,retina:Nt,passiveEvents:Dt,canvas:jt,svg:Ht,vml:!Ht&&function(){try{var t=document.createElement("div"),e=(t.innerHTML='<v:shape adj="1"/>',t.firstChild);return e.style.behavior="url(#default#VML)",e&&"object"==typeof e.adj}catch(t){return!1}}(),inlineSvg:Ft,mac:0===navigator.platform.indexOf("Mac"),linux:0===navigator.platform.indexOf("Linux")},Wt=b.msPointer?"MSPointerDown":"pointerdown",Ut=b.msPointer?"MSPointerMove":"pointermove",Vt=b.msPointer?"MSPointerUp":"pointerup",qt=b.msPointer?"MSPointerCancel":"pointercancel",Gt={touchstart:Wt,touchmove:Ut,touchend:Vt,touchcancel:qt},Kt={touchstart:function(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&A(e);ee(t,e)},touchmove:ee,touchend:ee,touchcancel:ee},Yt={},Xt=!1;function Jt(t,e,i){return"touchstart"!==e||Xt||(document.addEventListener(Wt,$t,!0),document.addEventListener(Ut,Qt,!0),document.addEventListener(Vt,te,!0),document.addEventListener(qt,te,!0),Xt=!0),Kt[e]?(i=Kt[e].bind(this,i),t.addEventListener(Gt[e],i,!1),i):(console.warn("wrong event specified:",e),L.Util.falseFn)}function $t(t){Yt[t.pointerId]=t}function Qt(t){Yt[t.pointerId]&&(Yt[t.pointerId]=t)}function te(t){delete Yt[t.pointerId]}function ee(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){for(var i in e.touches=[],Yt)e.touches.push(Yt[i]);e.changedTouches=[e],t(e)}}var ie=200;function ne(t,i){t.addEventListener("dblclick",i);var n,o=0;function e(t){var e;1!==t.detail?n=t.detail:"mouse"===t.pointerType||t.sourceCapabilities&&!t.sourceCapabilities.firesTouchEvents||((e=Ne(t)).some(function(t){return t instanceof HTMLLabelElement&&t.attributes.for})&&!e.some(function(t){return t instanceof HTMLInputElement||t instanceof HTMLSelectElement})||((e=Date.now())-o<=ie?2===++n&&i(function(t){var e,i,n={};for(i in t)e=t[i],n[i]=e&&e.bind?e.bind(t):e;return(t=n).type="dblclick",n.detail=2,n.isTrusted=!1,n._simulated=!0,n}(t)):n=1,o=e))}return t.addEventListener("click",e),{dblclick:i,simDblclick:e}}var oe,se,re,ae,he,le,ue=we(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ce=we(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),de="webkitTransition"===ce||"OTransition"===ce?ce+"End":"transitionend";function _e(t){return"string"==typeof t?document.getElementById(t):t}function pe(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];return"auto"===(i=i&&"auto"!==i||!document.defaultView?i:(t=document.defaultView.getComputedStyle(t,null))?t[e]:null)?null:i}function P(t,e,i){t=document.createElement(t);return t.className=e||"",i&&i.appendChild(t),t}function T(t){var e=t.parentNode;e&&e.removeChild(t)}function me(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function fe(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function ge(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function ve(t,e){return void 0!==t.classList?t.classList.contains(e):0<(t=xe(t)).length&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(t)}function M(t,e){var i;if(void 0!==t.classList)for(var n=W(e),o=0,s=n.length;o<s;o++)t.classList.add(n[o]);else ve(t,e)||ye(t,((i=xe(t))?i+" ":"")+e)}function z(t,e){void 0!==t.classList?t.classList.remove(e):ye(t,F((" "+xe(t)+" ").replace(" "+e+" "," ")))}function ye(t,e){void 0===t.className.baseVal?t.className=e:t.className.baseVal=e}function xe(t){return void 0===(t=t.correspondingElement?t.correspondingElement:t).className.baseVal?t.className:t.className.baseVal}function C(t,e){if("opacity"in t.style)t.style.opacity=e;else if("filter"in t.style){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(t){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}}function we(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function be(t,e,i){e=e||new p(0,0);t.style[ue]=(b.ie3d?"translate("+e.x+"px,"+e.y+"px)":"translate3d("+e.x+"px,"+e.y+"px,0)")+(i?" scale("+i+")":"")}function Z(t,e){t._leaflet_pos=e,b.any3d?be(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Pe(t){return t._leaflet_pos||new p(0,0)}function Le(){S(window,"dragstart",A)}function Te(){k(window,"dragstart",A)}function Me(t){for(;-1===t.tabIndex;)t=t.parentNode;t.style&&(ze(),le=(he=t).style.outline,t.style.outline="none",S(window,"keydown",ze))}function ze(){he&&(he.style.outline=le,le=he=void 0,k(window,"keydown",ze))}function Ce(t){for(;!((t=t.parentNode).offsetWidth&&t.offsetHeight||t===document.body););return t}function Ze(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}ae="onselectstart"in document?(re=function(){S(window,"selectstart",A)},function(){k(window,"selectstart",A)}):(se=we(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]),re=function(){var t;se&&(t=document.documentElement.style,oe=t[se],t[se]="none")},function(){se&&(document.documentElement.style[se]=oe,oe=void 0)});pt={__proto__:null,TRANSFORM:ue,TRANSITION:ce,TRANSITION_END:de,get:_e,getStyle:pe,create:P,remove:T,empty:me,toFront:fe,toBack:ge,hasClass:ve,addClass:M,removeClass:z,setClass:ye,getClass:xe,setOpacity:C,testProp:we,setTransform:be,setPosition:Z,getPosition:Pe,get disableTextSelection(){return re},get enableTextSelection(){return ae},disableImageDrag:Le,enableImageDrag:Te,preventOutline:Me,restoreOutline:ze,getSizedParentNode:Ce,getScale:Ze};function S(t,e,i,n){if(e&&"object"==typeof e)for(var o in e)ke(t,o,e[o],i);else for(var s=0,r=(e=W(e)).length;s<r;s++)ke(t,e[s],i,n);return this}var E="_leaflet_events";function k(t,e,i,n){if(1===arguments.length)Se(t),delete t[E];else if(e&&"object"==typeof e)for(var o in e)Ae(t,o,e[o],i);else if(e=W(e),2===arguments.length)Se(t,function(t){return-1!==G(e,t)});else for(var s=0,r=e.length;s<r;s++)Ae(t,e[s],i,n);return this}function Se(t,e){for(var i in t[E]){var n=i.split(/\d/)[0];e&&!e(n)||Ae(t,n,null,null,i)}}var Ee={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ke(e,t,i,n){var o,s,r=t+h(i)+(n?"_"+h(n):"");e[E]&&e[E][r]||(s=o=function(t){return i.call(n||e,t||window.event)},!b.touchNative&&b.pointer&&0===t.indexOf("touch")?o=Jt(e,t,o):b.touch&&"dblclick"===t?o=ne(e,o):"addEventListener"in e?"touchstart"===t||"touchmove"===t||"wheel"===t||"mousewheel"===t?e.addEventListener(Ee[t]||t,o,!!b.passiveEvents&&{passive:!1}):"mouseenter"===t||"mouseleave"===t?e.addEventListener(Ee[t],o=function(t){t=t||window.event,Fe(e,t)&&s(t)},!1):e.addEventListener(t,s,!1):e.attachEvent("on"+t,o),e[E]=e[E]||{},e[E][r]=o)}function Ae(t,e,i,n,o){o=o||e+h(i)+(n?"_"+h(n):"");var s,r,i=t[E]&&t[E][o];i&&(!b.touchNative&&b.pointer&&0===e.indexOf("touch")?(n=t,r=i,Gt[s=e]?n.removeEventListener(Gt[s],r,!1):console.warn("wrong event specified:",s)):b.touch&&"dblclick"===e?(n=i,(r=t).removeEventListener("dblclick",n.dblclick),r.removeEventListener("click",n.simDblclick)):"removeEventListener"in t?t.removeEventListener(Ee[e]||e,i,!1):t.detachEvent("on"+e,i),t[E][o]=null)}function Be(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function Oe(t){return ke(t,"wheel",Be),this}function Ie(t){return S(t,"mousedown touchstart dblclick contextmenu",Be),t._leaflet_disable_click=!0,this}function A(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Re(t){return A(t),Be(t),this}function Ne(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function De(t,e){var i,n;return e?(n=(i=Ze(e)).boundingClientRect,new p((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)):new p(t.clientX,t.clientY)}var je=b.linux&&b.chrome?window.devicePixelRatio:b.mac?3*window.devicePixelRatio:0<window.devicePixelRatio?2*window.devicePixelRatio:1;function He(t){return b.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/je:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}function Fe(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(t){return!1}return i!==t}var mt={__proto__:null,on:S,off:k,stopPropagation:Be,disableScrollPropagation:Oe,disableClickPropagation:Ie,preventDefault:A,stop:Re,getPropagationPath:Ne,getMousePosition:De,getWheelDelta:He,isExternalTarget:Fe,addListener:S,removeListener:k},We=it.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Pe(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=x(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){t=this._startPos.add(this._offset.multiplyBy(t));e&&t._round(),Z(this._el,t),this.fire("step")},_complete:function(){r(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),B=it.extend({options:{crs:lt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=c(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=a(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),void 0!==e.zoom&&(this._zoom=this._limitZoom(e.zoom)),e.center&&void 0!==e.zoom&&this.setView(w(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ce&&b.any3d&&!b.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),S(this._proxy,de,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if((e=void 0===e?this._zoom:this._limitZoom(e),t=this._limitCenter(w(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&!0!==i)&&(void 0!==i.animate&&(i.zoom=l({animate:i.animate},i.zoom),i.pan=l({animate:i.animate,duration:i.duration},i.pan)),this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan)))return clearTimeout(this._sizeTimer),this;return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(b.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(b.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),o=this.getSize().divideBy(2),t=(t instanceof p?t:this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1-1/n),n=this.containerPointToLatLng(o.add(t));return this.setView(n,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():g(t);var i=m(e.paddingTopLeft||e.padding||[0,0]),n=m(e.paddingBottomRight||e.padding||[0,0]),o=this.getBoundsZoom(t,!1,i.add(n));return(o="number"==typeof e.maxZoom?Math.min(e.maxZoom,o):o)===1/0?{center:t.getCenter(),zoom:o}:(e=n.subtract(i).divideBy(2),n=this.project(t.getSouthWest(),o),i=this.project(t.getNorthEast(),o),{center:this.unproject(n.add(i).divideBy(2).add(e),o),zoom:o})},fitBounds:function(t,e){if((t=g(t)).isValid())return t=this._getBoundsCenterZoom(t,e),this.setView(t.center,t.zoom,e);throw new Error("Bounds are not valid.")},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){var i;return e=e||{},(t=m(t).round()).x||t.y?(!0===e.animate||this.getSize().contains(t)?(this._panAnim||(this._panAnim=new We,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),!1!==e.animate?(M(this._mapPane,"leaflet-pan-anim"),i=this._getMapPanePos().subtract(t).round(),this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)):(this._rawPanBy(t),this.fire("move").fire("moveend"))):this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this):this.fire("moveend")},flyTo:function(n,o,t){if(!1===(t=t||{}).animate||!b.any3d)return this.setView(n,o,t);this._stop();var s=this.project(this.getCenter()),r=this.project(n),e=this.getSize(),a=this._zoom,h=(n=w(n),o=void 0===o?a:o,Math.max(e.x,e.y)),i=h*this.getZoomScale(a,o),l=r.distanceTo(s)||1,u=1.42,c=u*u;function d(t){t=(i*i-h*h+(t?-1:1)*c*c*l*l)/(2*(t?i:h)*c*l),t=Math.sqrt(t*t+1)-t;return t<1e-9?-18:Math.log(t)}function _(t){return(Math.exp(t)-Math.exp(-t))/2}function p(t){return(Math.exp(t)+Math.exp(-t))/2}var m=d(0);function f(t){return h*(p(m)*(_(t=m+u*t)/p(t))-_(m))/c}var g=Date.now(),v=(d(1)-m)/u,y=t.duration?1e3*t.duration:1e3*v*.8;return this._moveStart(!0,t.noMoveStart),function t(){var e=(Date.now()-g)/y,i=(1-Math.pow(1-e,1.5))*v;e<=1?(this._flyToFrame=x(t,this),this._move(this.unproject(s.add(r.subtract(s).multiplyBy(f(i)/l)),a),this.getScaleZoom(h/(e=i,h*(p(m)/p(m+u*e))),a),{flyTo:!0})):this._move(n,o)._moveEnd(!0)}.call(this),this},flyToBounds:function(t,e){t=this._getBoundsCenterZoom(t,e);return this.flyTo(t.center,t.zoom,e)},setMaxBounds:function(t){return t=g(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),t=this._limitCenter(i,this._zoom,g(t));return i.equals(t)||this.panTo(t,e),this._enforcingBounds=!1,this},panInside:function(t,e){var i=m((e=e||{}).paddingTopLeft||e.padding||[0,0]),n=m(e.paddingBottomRight||e.padding||[0,0]),o=this.project(this.getCenter()),t=this.project(t),s=this.getPixelBounds(),i=_([s.min.add(i),s.max.subtract(n)]),s=i.getSize();return i.contains(t)||(this._enforcingBounds=!0,n=t.subtract(i.getCenter()),i=i.extend(t).getSize().subtract(s),o.x+=n.x<0?-i.x:i.x,o.y+=n.y<0?-i.y:i.y,this.panTo(this.unproject(o),e),this._enforcingBounds=!1),this},invalidateSize:function(t){if(!this._loaded)return this;t=l({animate:!1,pan:!0},!0===t?{animate:!0}:t);var e=this.getSize(),i=(this._sizeChanged=!0,this._lastCenter=null,this.getSize()),n=e.divideBy(2).round(),o=i.divideBy(2).round(),n=n.subtract(o);return n.x||n.y?(t.animate&&t.pan?this.panBy(n):(t.pan&&this._rawPanBy(n),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(a(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){var e,i;return t=this._locateOptions=l({timeout:1e4,watch:!1},t),"geolocation"in navigator?(e=a(this._handleGeolocationResponse,this),i=a(this._handleGeolocationError,this),t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t)):this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e;this._container._leaflet_id&&(e=t.code,t=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout"),this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+t+"."}))},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e,i,n=new v(t.coords.latitude,t.coords.longitude),o=n.toBounds(2*t.coords.accuracy),s=this._locateOptions,r=(s.setView&&(e=this.getBoundsZoom(o),this.setView(n,s.maxZoom?Math.min(e,s.maxZoom):e)),{latlng:n,bounds:o,timestamp:t.timestamp});for(i in t.coords)"number"==typeof t.coords[i]&&(r[i]=t.coords[i]);this.fire("locationfound",r)}},addHandler:function(t,e){return e&&(e=this[t]=new e(this),this._handlers.push(e),this.options[t]&&e.enable()),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}for(var t in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),T(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(r(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove();for(t in this._panes)T(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){e=P("div","leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),e||this._mapPane);return t&&(this._panes[t]=e),e},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds();return new s(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=g(t),i=m(i||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),r=t.getNorthWest(),t=t.getSouthEast(),i=this.getSize().subtract(i),t=_(this.project(t,n),this.project(r,n)).getSize(),r=b.any3d?this.options.zoomSnap:1,a=i.x/t.x,i=i.y/t.y,t=e?Math.max(a,i):Math.min(a,i),n=this.getScaleZoom(t,n);return r&&(n=Math.round(n/(r/100))*(r/100),n=e?Math.ceil(n/r)*r:Math.floor(n/r)*r),Math.max(o,Math.min(s,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new p(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){t=this._getTopLeftPoint(t,e);return new f(t,t.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=void 0===e?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs,t=(e=void 0===e?this._zoom:e,i.zoom(t*i.scale(e)));return isNaN(t)?1/0:t},project:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.latLngToPoint(w(t),e)},unproject:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.pointToLatLng(m(t),e)},layerPointToLatLng:function(t){t=m(t).add(this.getPixelOrigin());return this.unproject(t)},latLngToLayerPoint:function(t){return this.project(w(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(w(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(g(t))},distance:function(t,e){return this.options.crs.distance(w(t),w(e))},containerPointToLayerPoint:function(t){return m(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return m(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){t=this.containerPointToLayerPoint(m(t));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(w(t)))},mouseEventToContainerPoint:function(t){return De(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){t=this._container=_e(t);if(!t)throw new Error("Map container not found.");if(t._leaflet_id)throw new Error("Map container is already initialized.");S(t,"scroll",this._onScroll,this),this._containerId=h(t)},_initLayout:function(){var t=this._container,e=(this._fadeAnimated=this.options.fadeAnimation&&b.any3d,M(t,"leaflet-container"+(b.touch?" leaflet-touch":"")+(b.retina?" leaflet-retina":"")+(b.ielt9?" leaflet-oldie":"")+(b.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":"")),pe(t,"position"));"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Z(this._mapPane,new p(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(M(t.markerPane,"leaflet-zoom-hide"),M(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){Z(this._mapPane,new p(0,0));var n=!this._loaded,o=(this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset"),this._zoom!==e);this._moveStart(o,i)._move(t,e)._moveEnd(o),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){void 0===e&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((o||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return r(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Z(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={};var e=t?k:S;e((this._targets[h(this._container)]=this)._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),b.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){r(this._resizeRequest),this._resizeRequest=x(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],o="mouseout"===e||"mouseover"===e,s=t.target||t.srcElement,r=!1;s;){if((i=this._targets[h(s)])&&("click"===e||"preclick"===e)&&this._draggableMoved(i)){r=!0;break}if(i&&i.listens(e,!0)){if(o&&!Fe(s,t))break;if(n.push(i),o)break}if(s===this._container)break;s=s.parentNode}return n=n.length||r||o||!this.listens(e,!0)?n:[this]},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e,i=t.target||t.srcElement;!this._loaded||i._leaflet_disable_events||"click"===t.type&&this._isClickDisabled(i)||("mousedown"===(e=t.type)&&Me(i),this._fireDOMEvent(t,e))},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){"click"===t.type&&((a=l({},t)).type="preclick",this._fireDOMEvent(a,a.type,i));var n=this._findEventTargets(t,e);if(i){for(var o=[],s=0;s<i.length;s++)i[s].listens(e,!0)&&o.push(i[s]);n=o.concat(n)}if(n.length){"contextmenu"===e&&A(t);var r,a=n[0],h={originalEvent:t};for("keypress"!==t.type&&"keydown"!==t.type&&"keyup"!==t.type&&(r=a.getLatLng&&(!a._radius||a._radius<=10),h.containerPoint=r?this.latLngToContainerPoint(a.getLatLng()):this.mouseEventToContainerPoint(t),h.layerPoint=this.containerPointToLayerPoint(h.containerPoint),h.latlng=r?a.getLatLng():this.layerPointToLatLng(h.layerPoint)),s=0;s<n.length;s++)if(n[s].fire(e,h,!0),h.originalEvent._stopped||!1===n[s].options.bubblingMouseEvents&&-1!==G(this._mouseEvents,e))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Pe(this._mapPane)||new p(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){return(t&&void 0!==e?this._getNewPixelOrigin(t,e):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){i=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(i)},_latLngBoundsToNewLayerBounds:function(t,e,i){i=this._getNewPixelOrigin(i,e);return _([this.project(t.getSouthWest(),e)._subtract(i),this.project(t.getNorthWest(),e)._subtract(i),this.project(t.getSouthEast(),e)._subtract(i),this.project(t.getNorthEast(),e)._subtract(i)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){var n,o;return!i||(n=this.project(t,e),o=this.getSize().divideBy(2),o=new f(n.subtract(o),n.add(o)),(o=this._getBoundsOffset(o,i,e)).round().equals([0,0]))?t:this.unproject(n.add(o),e)},_limitOffset:function(t,e){var i;return e?(i=new f((i=this.getPixelBounds()).min.add(t),i.max.add(t)),t.add(this._getBoundsOffset(i,e))):t},_getBoundsOffset:function(t,e,i){e=_(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),i=e.min.subtract(t.min),e=e.max.subtract(t.max);return new p(this._rebound(i.x,-e.x),this._rebound(i.y,-e.y))},_rebound:function(t,e){return 0<t+e?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=b.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){z(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){t=this._getCenterOffset(t)._trunc();return!(!0!==(e&&e.animate)&&!this.getSize().contains(t))&&(this.panBy(t,e),!0)},_createAnimProxy:function(){var t=this._proxy=P("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var e=ue,i=this._proxy.style[e];be(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),i===this._proxy.style[e]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){T(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();be(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&0<=t.propertyName.indexOf("transform")&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(!this._animatingZoom){if(i=i||{},!this._zoomAnimated||!1===i.animate||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),n=this._getCenterOffset(t)._divideBy(1-1/n);if(!0!==i.animate&&!this.getSize().contains(n))return!1;x(function(){this._moveStart(!0,!1)._animateZoom(t,e,!0)},this)}return!0},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,M(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(a(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&z(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Ue(t){return new O(t)}var Ve,O=et.extend({options:{position:"topright"},initialize:function(t){c(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),t=t._controlCorners[i];return M(e,"leaflet-control"),-1!==i.indexOf("bottom")?t.insertBefore(e,t.firstChild):t.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map&&(T(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null),this},_refocusOnMap:function(t){this._map&&t&&0<t.screenX&&0<t.screenY&&this._map.getContainer().focus()}}),qe=(B.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var i=this._controlCorners={},n="leaflet-",o=this._controlContainer=P("div",n+"control-container",this._container);function t(t,e){i[t+e]=P("div",n+t+" "+n+e,o)}t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)T(this._controlCorners[t]);T(this._controlContainer),delete this._controlCorners,delete this._controlContainer}}),O.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){for(var n in c(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),(this._map=t).on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return O.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);t=this._getLayer(h(t));return t&&this._layers.splice(this._layers.indexOf(t),1),this._map?this._update():this},expand:function(){M(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(M(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):z(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return z(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=P("div",t),i=this.options.collapsed,n=(e.setAttribute("aria-haspopup",!0),Ie(e),Oe(e),this._section=P("section",t+"-list")),o=(i&&(this._map.on("click",this.collapse,this),S(e,{mouseenter:function(){S(n,"click",A),this.expand(),setTimeout(function(){k(n,"click",A)})},mouseleave:this.collapse},this)),this._layersLink=P("a",t+"-toggle",e));o.href="#",o.title="Layers",o.setAttribute("role","button"),S(o,"click",A),S(o,"focus",this.expand,this),i||this.expand(),this._baseLayersList=P("div",t+"-base",n),this._separator=P("div",t+"-separator",n),this._overlaysList=P("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&h(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(a(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(this._container){me(this._baseLayersList),me(this._overlaysList),this._layerControlInputs=[];for(var t,e,i,n=0,o=0;o<this._layers.length;o++)i=this._layers[o],this._addItem(i),e=e||i.overlay,t=t||!i.overlay,n+=i.overlay?0:1;this.options.hideSingleBase&&(this._baseLayersList.style.display=(t=t&&1<n)?"":"none"),this._separator.style.display=e&&t?"":"none"}return this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(h(t.target)),t=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;t&&this._map.fire(t,e)},_createRadioElement:function(t,e){t='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",e=document.createElement("div");return e.innerHTML=t,e.firstChild},_addItem:function(t){var e,i=document.createElement("label"),n=this._map.hasLayer(t.layer),n=(t.overlay?((e=document.createElement("input")).type="checkbox",e.className="leaflet-control-layers-selector",e.defaultChecked=n):e=this._createRadioElement("leaflet-base-layers_"+h(this),n),this._layerControlInputs.push(e),e.layerId=h(t.layer),S(e,"click",this._onInputClick,this),document.createElement("span")),o=(n.innerHTML=" "+t.name,document.createElement("span"));return i.appendChild(o),o.appendChild(e),o.appendChild(n),(t.overlay?this._overlaysList:this._baseLayersList).appendChild(i),this._checkDisabledLayers(),i},_onInputClick:function(){var t,e,i=this._layerControlInputs,n=[],o=[];this._handlingClick=!0;for(var s=i.length-1;0<=s;s--)t=i[s],e=this._getLayer(t.layerId).layer,t.checked?n.push(e):t.checked||o.push(e);for(s=0;s<o.length;s++)this._map.hasLayer(o[s])&&this._map.removeLayer(o[s]);for(s=0;s<n.length;s++)this._map.hasLayer(n[s])||this._map.addLayer(n[s]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,e,i=this._layerControlInputs,n=this._map.getZoom(),o=i.length-1;0<=o;o--)t=i[o],e=this._getLayer(t.layerId).layer,t.disabled=void 0!==e.options.minZoom&&n<e.options.minZoom||void 0!==e.options.maxZoom&&n>e.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this}})),Ge=O.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=P("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,o){i=P("a",i,n);return i.innerHTML=t,i.href="#",i.title=e,i.setAttribute("role","button"),i.setAttribute("aria-label",e),Ie(i),S(i,"click",Re),S(i,"click",o,this),S(i,"click",this._refocusOnMap,this),i},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";z(this._zoomInButton,e),z(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),!this._disabled&&t._zoom!==t.getMinZoom()||(M(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),!this._disabled&&t._zoom!==t.getMaxZoom()||(M(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}}),Ke=(B.mergeOptions({zoomControl:!0}),B.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ge,this.addControl(this.zoomControl))}),O.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=P("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=P("div",e,i)),t.imperial&&(this._iScale=P("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,t=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(t)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t);this._updateScale(this._mScale,e<1e3?e+" m":e/1e3+" km",e/t)},_updateImperial:function(t){var e,i,t=3.2808399*t;5280<t?(i=this._getRoundNum(e=t/5280),this._updateScale(this._iScale,i+" mi",i/e)):(i=this._getRoundNum(t),this._updateScale(this._iScale,i+" ft",i/t))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),t=t/e;return e*(t=10<=t?10:5<=t?5:3<=t?3:2<=t?2:1)}})),Ye=O.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(b.inlineSvg?'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> ':"")+"Leaflet</a>"},initialize:function(t){c(this,t),this._attributions={}},onAdd:function(t){for(var e in(t.attributionControl=this)._container=P("div","leaflet-control-attribution"),Ie(this._container),t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t&&(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update()),this},removeAttribution:function(t){return t&&this._attributions[t]&&(this._attributions[t]--,this._update()),this},_update:function(){if(this._map){var t,e=[];for(t in this._attributions)this._attributions[t]&&e.push(t);var i=[];this.options.prefix&&i.push(this.options.prefix),e.length&&i.push(e.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}}),n=(B.mergeOptions({attributionControl:!0}),B.addInitHook(function(){this.options.attributionControl&&(new Ye).addTo(this)}),O.Layers=qe,O.Zoom=Ge,O.Scale=Ke,O.Attribution=Ye,Ue.layers=function(t,e,i){return new qe(t,e,i)},Ue.zoom=function(t){return new Ge(t)},Ue.scale=function(t){return new Ke(t)},Ue.attribution=function(t){return new Ye(t)},et.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled&&(this._enabled=!1,this.removeHooks()),this},enabled:function(){return!!this._enabled}})),ft=(n.addTo=function(t,e){return t.addHandler(e,this),this},{Events:e}),Xe=b.touch?"touchstart mousedown":"mousedown",Je=it.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){c(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(S(this._dragStartTarget,Xe,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Je._dragging===this&&this.finishDrag(!0),k(this._dragStartTarget,Xe,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){var e,i;this._enabled&&(this._moved=!1,ve(this._element,"leaflet-zoom-anim")||(t.touches&&1!==t.touches.length?Je._dragging===this&&this.finishDrag():Je._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||((Je._dragging=this)._preventOutline&&Me(this._element),Le(),re(),this._moving||(this.fire("down"),i=t.touches?t.touches[0]:t,e=Ce(this._element),this._startPoint=new p(i.clientX,i.clientY),this._startPos=Pe(this._element),this._parentScale=Ze(e),i="mousedown"===t.type,S(document,i?"mousemove":"touchmove",this._onMove,this),S(document,i?"mouseup":"touchend touchcancel",this._onUp,this)))))},_onMove:function(t){var e;this._enabled&&(t.touches&&1<t.touches.length?this._moved=!0:!(e=new p((e=t.touches&&1===t.touches.length?t.touches[0]:t).clientX,e.clientY)._subtract(this._startPoint)).x&&!e.y||Math.abs(e.x)+Math.abs(e.y)<this.options.clickTolerance||(e.x/=this._parentScale.x,e.y/=this._parentScale.y,A(t),this._moved||(this.fire("dragstart"),this._moved=!0,M(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),M(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(e),this._moving=!0,this._lastEvent=t,this._updatePosition()))},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Z(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){z(document.body,"leaflet-dragging"),this._lastTarget&&(z(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),k(document,"mousemove touchmove",this._onMove,this),k(document,"mouseup touchend touchcancel",this._onUp,this),Te(),ae(),this._moved&&this._moving&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)}),this._moving=!1,Je._dragging=!1}});function $e(t,e){if(e&&t.length){var i=t=function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++)(function(t,e){var i=e.x-t.x,e=e.y-t.y;return i*i+e*e})(t[n],t[o])>e&&(i.push(t[n]),o=n);o<s-1&&i.push(t[s-1]);return i}(t,e=e*e),n=i.length,o=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(n);o[0]=o[n-1]=1,function t(e,i,n,o,s){var r,a,h,l=0;for(a=o+1;a<=s-1;a++)h=ni(e[a],e[o],e[s],!0),l<h&&(r=a,l=h);n<l&&(i[r]=1,t(e,i,n,o,r),t(e,i,n,r,s))}(i,o,e,0,n-1);var s,r=[];for(s=0;s<n;s++)o[s]&&r.push(i[s]);return r}return t.slice()}function Qe(t,e,i){return Math.sqrt(ni(t,e,i,!0))}function ti(t,e,i,n,o){var s,r,a,h=n?Ve:ii(t,i),l=ii(e,i);for(Ve=l;;){if(!(h|l))return[t,e];if(h&l)return!1;a=ii(r=ei(t,e,s=h||l,i,o),i),s===h?(t=r,h=a):(e=r,l=a)}}function ei(t,e,i,n,o){var s,r,a=e.x-t.x,e=e.y-t.y,h=n.min,n=n.max;return 8&i?(s=t.x+a*(n.y-t.y)/e,r=n.y):4&i?(s=t.x+a*(h.y-t.y)/e,r=h.y):2&i?(s=n.x,r=t.y+e*(n.x-t.x)/a):1&i&&(s=h.x,r=t.y+e*(h.x-t.x)/a),new p(s,r,o)}function ii(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function ni(t,e,i,n){var o=e.x,e=e.y,s=i.x-o,r=i.y-e,a=s*s+r*r;return 0<a&&(1<(a=((t.x-o)*s+(t.y-e)*r)/a)?(o=i.x,e=i.y):0<a&&(o+=s*a,e+=r*a)),s=t.x-o,r=t.y-e,n?s*s+r*r:new p(o,e)}function I(t){return!d(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function oi(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),I(t)}function si(t,e){var i,n,o,s,r;if(!t||0===t.length)throw new Error("latlngs not passed");I(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var a,h=[];for(a in t)h.push(e.project(w(t[a])));for(var l=h.length,u=0,c=0;u<l-1;u++)c+=h[u].distanceTo(h[u+1])/2;if(0===c)r=h[0];else for(i=u=0;u<l-1;u++)if(n=h[u],o=h[u+1],c<(i+=s=n.distanceTo(o))){r=[o.x-(s=(i-c)/s)*(o.x-n.x),o.y-s*(o.y-n.y)];break}return e.unproject(m(r))}gt={__proto__:null,simplify:$e,pointToSegmentDistance:Qe,closestPointOnSegment:function(t,e,i){return ni(t,e,i)},clipSegment:ti,_getEdgeIntersection:ei,_getBitCode:ii,_sqClosestPointOnSegment:ni,isFlat:I,_flat:oi,polylineCenter:si};function ri(t,e,i){for(var n,o,s,r,a,h,l,u=[1,4,2,8],c=0,d=t.length;c<d;c++)t[c]._code=ii(t[c],e);for(s=0;s<4;s++){for(h=u[s],n=[],c=0,o=(d=t.length)-1;c<d;o=c++)r=t[c],a=t[o],r._code&h?a._code&h||((l=ei(a,r,h,e,i))._code=ii(l,e),n.push(l)):(a._code&h&&((l=ei(a,r,h,e,i))._code=ii(l,e),n.push(l)),n.push(r));t=n}return t}function ai(t,e){var i,n,o,s,r,a;if(!t||0===t.length)throw new Error("latlngs not passed");I(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var h,l=[];for(h in t)l.push(e.project(w(t[h])));for(var u=l.length,c=s=r=0,d=0,_=u-1;d<u;_=d++)i=l[d],n=l[_],o=i.y*n.x-n.y*i.x,s+=(i.x+n.x)*o,r+=(i.y+n.y)*o,c+=3*o;return a=0===c?l[0]:[s/c,r/c],e.unproject(m(a))}var vt={__proto__:null,clipPolygon:ri,polygonCenter:ai},yt={project:function(t){return new p(t.lng,t.lat)},unproject:function(t){return new v(t.y,t.x)},bounds:new f([-180,-90],[180,90])},xt={R:6378137,R_MINOR:6356752.314245179,bounds:new f([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,o=this.R_MINOR/i,o=Math.sqrt(1-o*o),s=o*Math.sin(n),s=Math.tan(Math.PI/4-n/2)/Math.pow((1-s)/(1+s),o/2),n=-i*Math.log(Math.max(s,1e-10));return new p(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,o=this.R_MINOR/n,s=Math.sqrt(1-o*o),r=Math.exp(-t.y/n),a=Math.PI/2-2*Math.atan(r),h=0,l=.1;h<15&&1e-7<Math.abs(l);h++)e=s*Math.sin(a),e=Math.pow((1-e)/(1+e),s/2),a+=l=Math.PI/2-2*Math.atan(r*e)-a;return new v(a*i,t.x*i/n)}},wt={__proto__:null,LonLat:yt,Mercator:xt,SphericalMercator:rt},Pt=l({},st,{code:"EPSG:3395",projection:xt,transformation:ht(bt=.5/(Math.PI*xt.R),.5,-bt,.5)}),hi=l({},st,{code:"EPSG:4326",projection:yt,transformation:ht(1/180,1,-1/180,.5)}),Lt=l({},ot,{projection:yt,transformation:ht(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,e=e.lat-t.lat;return Math.sqrt(i*i+e*e)},infinite:!0}),o=(ot.Earth=st,ot.EPSG3395=Pt,ot.EPSG3857=lt,ot.EPSG900913=ut,ot.EPSG4326=hi,ot.Simple=Lt,it.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[h(t)]=this},removeInteractiveTarget:function(t){return delete this._map._targets[h(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e,i=t.target;i.hasLayer(this)&&(this._map=i,this._zoomAnimated=i._zoomAnimated,this.getEvents&&(e=this.getEvents(),i.on(e,this),this.once("remove",function(){i.off(e,this)},this)),this.onAdd(i),this.fire("add"),i.fire("layeradd",{layer:this}))}})),li=(B.include({addLayer:function(t){var e;if(t._layerAdd)return e=h(t),this._layers[e]||((this._layers[e]=t)._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t)),this;throw new Error("The provided object is not a Layer.")},removeLayer:function(t){var e=h(t);return this._layers[e]&&(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null),this},hasLayer:function(t){return h(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){for(var e=0,i=(t=t?d(t)?t:[t]:[]).length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[h(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){t=h(t);this._zoomBoundLayers[t]&&(delete this._zoomBoundLayers[t],this._updateZoomLevels())},_updateZoomLevels:function(){var t,e=1/0,i=-1/0,n=this._getZoomSpan();for(t in this._zoomBoundLayers)var o=this._zoomBoundLayers[t].options,e=void 0===o.minZoom?e:Math.min(e,o.minZoom),i=void 0===o.maxZoom?i:Math.max(i,o.maxZoom);this._layersMaxZoom=i===-1/0?void 0:i,this._layersMinZoom=e===1/0?void 0:e,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}}),o.extend({initialize:function(t,e){var i,n;if(c(this,e),this._layers={},t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){t=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[t]&&this._map.removeLayer(this._layers[t]),delete this._layers[t],this},hasLayer:function(t){return("number"==typeof t?t:this.getLayerId(t))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)(i=this._layers[e])[t]&&i[t].apply(i,n);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:h})),ui=li.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),li.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?((t=t in this._layers?this._layers[t]:t).removeEventParent(this),li.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t,e=new s;for(t in this._layers){var i=this._layers[t];e.extend(i.getBounds?i.getBounds():i.getLatLng())}return e}}),ci=et.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){c(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(i)return i=this._createImg(i,e&&"IMG"===e.tagName?e:null),this._setIconStyles(i,t),!this.options.crossOrigin&&""!==this.options.crossOrigin||(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),i;if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"],n=m(n="number"==typeof n?[n,n]:n),o=m("shadow"===e&&i.shadowAnchor||i.iconAnchor||n&&n.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),o&&(t.style.marginLeft=-o.x+"px",t.style.marginTop=-o.y+"px"),n&&(t.style.width=n.x+"px",t.style.height=n.y+"px")},_createImg:function(t,e){return(e=e||document.createElement("img")).src=t,e},_getIconUrl:function(t){return b.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});var di=ci.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return"string"!=typeof di.imagePath&&(di.imagePath=this._detectIconPath()),(this.options.imagePath||di.imagePath)+ci.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){function e(t,e,i){return(e=e.exec(t))&&e[i]}return(t=e(t,/^url\((['"])?(.+)\1\)$/,2))&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=P("div","leaflet-default-icon-path",document.body),e=pe(t,"background-image")||pe(t,"backgroundImage");return document.body.removeChild(t),(e=this._stripUrl(e))?e:(t=document.querySelector('link[href$="leaflet.css"]'))?t.href.substring(0,t.href.length-"leaflet.css".length-1):""}}),_i=n.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Je(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),M(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&z(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,o=this._marker.options.autoPanPadding,s=Pe(e._icon),r=i.getPixelBounds(),a=i.getPixelOrigin(),a=_(r.min._subtract(a).add(o),r.max._subtract(a).subtract(o));a.contains(s)||(o=m((Math.max(a.max.x,s.x)-a.max.x)/(r.max.x-a.max.x)-(Math.min(a.min.x,s.x)-a.min.x)/(r.min.x-a.min.x),(Math.max(a.max.y,s.y)-a.max.y)/(r.max.y-a.max.y)-(Math.min(a.min.y,s.y)-a.min.y)/(r.min.y-a.min.y)).multiplyBy(n),i.panBy(o,{animate:!1}),this._draggable._newPos._add(o),this._draggable._startPos._add(o),Z(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=x(this._adjustPan.bind(this,t)))},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(r(this._panRequest),this._panRequest=x(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Pe(e._icon),o=e._map.layerPointToLatLng(n);i&&Z(i,n),e._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){r(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),pi=o.extend({options:{icon:new di,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){c(this,e),this._latlng=w(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=w(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){var t;return this._icon&&this._map&&(t=this._map.latLngToLayerPoint(this._latlng).round(),this._setPos(t)),this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1,i=(i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),"IMG"===i.tagName&&(i.alt=t.alt||"")),M(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&S(i,"focus",this._panOnFocus,this),t.icon.createShadow(this._shadow)),o=!1;i!==this._shadow&&(this._removeShadow(),o=!0),i&&(M(i,e),i.alt=""),this._shadow=i,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),i&&o&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&k(this._icon,"focus",this._panOnFocus,this),T(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&T(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&Z(this._icon,t),this._shadow&&Z(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){t=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(t)},_initInteraction:function(){var t;this.options.interactive&&(M(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),_i&&(t=this.options.draggable,this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new _i(this),t&&this.dragging.enable()))},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&C(this._icon,t),this._shadow&&C(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t,e,i=this._map;i&&(t=(e=this.options.icon.options).iconSize?m(e.iconSize):m(0,0),e=e.iconAnchor?m(e.iconAnchor):m(0,0),i.panInside(this._latlng,{paddingTopLeft:e,paddingBottomRight:t.subtract(e)}))},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});var mi=o.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return c(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),fi=mi.extend({options:{fill:!0,radius:10},initialize:function(t,e){c(this,e),this._latlng=w(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=w(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return mi.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),t=[t+i,e+i];this._pxBounds=new f(this._point.subtract(t),this._point.add(t))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});var gi=fi.extend({initialize:function(t,e,i){if(c(this,e="number"==typeof e?l({},i,{radius:e}):e),this._latlng=w(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new s(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:mi.prototype.setStyle,_project:function(){var t,e,i,n,o,s=this._latlng.lng,r=this._latlng.lat,a=this._map,h=a.options.crs;h.distance===st.distance?(n=Math.PI/180,o=this._mRadius/st.R/n,t=a.project([r+o,s]),e=a.project([r-o,s]),e=t.add(e).divideBy(2),i=a.unproject(e).lat,n=Math.acos((Math.cos(o*n)-Math.sin(r*n)*Math.sin(i*n))/(Math.cos(r*n)*Math.cos(i*n)))/n,!isNaN(n)&&0!==n||(n=o/Math.cos(Math.PI/180*r)),this._point=e.subtract(a.getPixelOrigin()),this._radius=isNaN(n)?0:e.x-a.project([i,s-n]).x,this._radiusY=e.y-t.y):(o=h.unproject(h.project(this._latlng).subtract([this._mRadius,0])),this._point=a.latLngToLayerPoint(this._latlng),this._radius=this._point.x-a.latLngToLayerPoint(o).x),this._updateBounds()}});var vi=mi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){c(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=ni,o=0,s=this._parts.length;o<s;o++)for(var r=this._parts[o],a=1,h=r.length;a<h;a++){var l,u,c=n(t,l=r[a-1],u=r[a],!0);c<e&&(e=c,i=n(t,l,u))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(this._map)return si(this._defaultShape(),this._map.options.crs);throw new Error("Must add layer to map before using getCenter()")},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=w(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new s,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return I(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=I(t),n=0,o=t.length;n<o;n++)i?(e[n]=w(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new f;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),t=new p(t,t);this._rawPxBounds&&(this._pxBounds=new f([this._rawPxBounds.min.subtract(t),this._rawPxBounds.max.add(t)]))},_projectLatlngs:function(t,e,i){var n,o,s=t[0]instanceof v,r=t.length;if(s){for(o=[],n=0;n<r;n++)o[n]=this._map.latLngToLayerPoint(t[n]),i.extend(o[n]);e.push(o)}else for(n=0;n<r;n++)this._projectLatlngs(t[n],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var e,i,n,o,s=this._parts,r=0,a=0,h=this._rings.length;r<h;r++)for(e=0,i=(o=this._rings[r]).length;e<i-1;e++)(n=ti(o[e],o[e+1],t,e,!0))&&(s[a]=s[a]||[],s[a].push(n[0]),n[1]===o[e+1]&&e!==i-2||(s[a].push(n[1]),a++))},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=$e(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,o,s,r,a,h=this._clickTolerance();if(this._pxBounds&&this._pxBounds.contains(t))for(i=0,s=this._parts.length;i<s;i++)for(n=0,o=(r=(a=this._parts[i]).length)-1;n<r;o=n++)if((e||0!==n)&&Qe(t,a[o],a[n])<=h)return!0;return!1}});vi._flat=oi;var yi=vi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(this._map)return ai(this._defaultShape(),this._map.options.crs);throw new Error("Must add layer to map before using getCenter()")},_convertLatLngs:function(t){var t=vi.prototype._convertLatLngs.call(this,t),e=t.length;return 2<=e&&t[0]instanceof v&&t[0].equals(t[e-1])&&t.pop(),t},_setLatLngs:function(t){vi.prototype._setLatLngs.call(this,t),I(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return(I(this._latlngs[0])?this._latlngs:this._latlngs[0])[0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,e=new p(e,e),t=new f(t.min.subtract(e),t.max.add(e));if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var i,n=0,o=this._rings.length;n<o;n++)(i=ri(this._rings[n],t,!0)).length&&this._parts.push(i)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e,i,n,o,s,r,a,h,l=!1;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(o=0,a=this._parts.length;o<a;o++)for(s=0,r=(h=(e=this._parts[o]).length)-1;s<h;r=s++)i=e[s],n=e[r],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(l=!l);return l||vi.prototype._containsPoint.call(this,t,!0)}});var xi=ui.extend({initialize:function(t,e){c(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,o=d(t)?t:t.features;if(o){for(e=0,i=o.length;e<i;e++)((n=o[e]).geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var s,r=this.options;return(!r.filter||r.filter(t))&&(s=wi(t,r))?(s.feature=Ci(t),s.defaultOptions=s.options,this.resetStyle(s),r.onEachFeature&&r.onEachFeature(t,s),this.addLayer(s)):this},resetStyle:function(t){return void 0===t?this.eachLayer(this.resetStyle,this):(t.options=l({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(e){return this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(t,e){t.setStyle&&("function"==typeof e&&(e=e(t.feature)),t.setStyle(e))}});function wi(t,e){var i,n,o,s,r="Feature"===t.type?t.geometry:t,a=r?r.coordinates:null,h=[],l=e&&e.pointToLayer,u=e&&e.coordsToLatLng||Pi;if(!a&&!r)return null;switch(r.type){case"Point":return bi(l,t,i=u(a),e);case"MultiPoint":for(o=0,s=a.length;o<s;o++)i=u(a[o]),h.push(bi(l,t,i,e));return new ui(h);case"LineString":case"MultiLineString":return n=Li(a,"LineString"===r.type?0:1,u),new vi(n,e);case"Polygon":case"MultiPolygon":return n=Li(a,"Polygon"===r.type?1:2,u),new yi(n,e);case"GeometryCollection":for(o=0,s=r.geometries.length;o<s;o++){var c=wi({geometry:r.geometries[o],type:"Feature",properties:t.properties},e);c&&h.push(c)}return new ui(h);case"FeatureCollection":for(o=0,s=r.features.length;o<s;o++){var d=wi(r.features[o],e);d&&h.push(d)}return new ui(h);default:throw new Error("Invalid GeoJSON object.")}}function bi(t,e,i,n){return t?t(e,i):new pi(i,n&&n.markersInheritOptions&&n)}function Pi(t){return new v(t[1],t[0],t[2])}function Li(t,e,i){for(var n,o=[],s=0,r=t.length;s<r;s++)n=e?Li(t[s],e-1,i):(i||Pi)(t[s]),o.push(n);return o}function Ti(t,e){return void 0!==(t=w(t)).alt?[i(t.lng,e),i(t.lat,e),i(t.alt,e)]:[i(t.lng,e),i(t.lat,e)]}function Mi(t,e,i,n){for(var o=[],s=0,r=t.length;s<r;s++)o.push(e?Mi(t[s],I(t[s])?0:e-1,i,n):Ti(t[s],n));return!e&&i&&o.push(o[0]),o}function zi(t,e){return t.feature?l({},t.feature,{geometry:e}):Ci(e)}function Ci(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}Tt={toGeoJSON:function(t){return zi(this,{type:"Point",coordinates:Ti(this.getLatLng(),t)})}};function Zi(t,e){return new xi(t,e)}pi.include(Tt),gi.include(Tt),fi.include(Tt),vi.include({toGeoJSON:function(t){var e=!I(this._latlngs);return zi(this,{type:(e?"Multi":"")+"LineString",coordinates:Mi(this._latlngs,e?1:0,!1,t)})}}),yi.include({toGeoJSON:function(t){var e=!I(this._latlngs),i=e&&!I(this._latlngs[0]),t=Mi(this._latlngs,i?2:e?1:0,!0,t);return zi(this,{type:(i?"Multi":"")+"Polygon",coordinates:t=e?t:[t]})}}),li.include({toMultiPoint:function(e){var i=[];return this.eachLayer(function(t){i.push(t.toGeoJSON(e).geometry.coordinates)}),zi(this,{type:"MultiPoint",coordinates:i})},toGeoJSON:function(e){var i,n,t=this.feature&&this.feature.geometry&&this.feature.geometry.type;return"MultiPoint"===t?this.toMultiPoint(e):(i="GeometryCollection"===t,n=[],this.eachLayer(function(t){t.toGeoJSON&&(t=t.toGeoJSON(e),i?n.push(t.geometry):"FeatureCollection"===(t=Ci(t)).type?n.push.apply(n,t.features):n.push(t))}),i?zi(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n})}});var Mt=Zi,Si=o.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=g(e),c(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(M(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){T(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&fe(this._image),this},bringToBack:function(){return this._map&&ge(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=g(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,e=this._image=t?this._url:P("img");M(e,"leaflet-image-layer"),this._zoomAnimated&&M(e,"leaflet-zoom-animated"),this.options.className&&M(e,this.options.className),e.onselectstart=u,e.onmousemove=u,e.onload=a(this.fire,this,"load"),e.onerror=a(this._overlayOnError,this,"error"),!this.options.crossOrigin&&""!==this.options.crossOrigin||(e.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t?this._url=e.src:(e.src=this._url,e.alt=this.options.alt)},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),t=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;be(this._image,t,e)},_reset:function(){var t=this._image,e=new f(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();Z(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){C(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),Ei=Si.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t="VIDEO"===this._url.tagName,e=this._image=t?this._url:P("video");if(M(e,"leaflet-image-layer"),this._zoomAnimated&&M(e,"leaflet-zoom-animated"),this.options.className&&M(e,this.options.className),e.onselectstart=u,e.onmousemove=u,e.onloadeddata=a(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],o=0;o<i.length;o++)n.push(i[o].src);this._url=0<i.length?n:[e.src]}else{d(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var s=0;s<this._url.length;s++){var r=P("source");r.src=this._url[s],e.appendChild(r)}}}});var ki=Si.extend({_initImage:function(){var t=this._image=this._url;M(t,"leaflet-image-layer"),this._zoomAnimated&&M(t,"leaflet-zoom-animated"),this.options.className&&M(t,this.options.className),t.onselectstart=u,t.onmousemove=u}});var Ai=o.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof L.LatLng||d(t))?(this._latlng=w(t),c(this,e)):(c(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return(t=arguments.length?t:this._source._map).hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&C(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&C(this._container,1),this.bringToFront(),this.options.interactive&&(M(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(C(this._container,0),this._removeTimeout=setTimeout(a(T,void 0,this._container),200)):T(this._container),this.options.interactive&&(z(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=w(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&fe(this._container),this},bringToBack:function(){return this._map&&ge(this._container),this},_prepareOpen:function(t){if(!(i=this._source)._map)return!1;if(i instanceof ui){var e,i=null,n=this._source._layers;for(e in n)if(n[e]._map){i=n[e];break}if(!i)return!1;this._source=i}if(!t)if(i.getCenter)t=i.getCenter();else if(i.getLatLng)t=i.getLatLng();else{if(!i.getBounds)throw new Error("Unable to get source layer LatLng.");t=i.getBounds().getCenter()}return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){var t,e,i;this._map&&(e=this._map.latLngToLayerPoint(this._latlng),t=m(this.options.offset),i=this._getAnchor(),this._zoomAnimated?Z(this._container,e.add(i)):t=t.add(e).add(i),e=this._containerBottom=-t.y,i=this._containerLeft=-Math.round(this._containerWidth/2)+t.x,this._container.style.bottom=e+"px",this._container.style.left=i+"px")},_getAnchor:function(){return[0,0]}}),Bi=(B.include({_initOverlay:function(t,e,i,n){var o=e;return o instanceof t||(o=new t(n).setContent(e)),i&&o.setLatLng(i),o}}),o.include({_initOverlay:function(t,e,i,n){var o=i;return o instanceof t?(c(o,n),o._source=this):(o=e&&!n?e:new t(n,this)).setContent(i),o}}),Ai.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return!(t=arguments.length?t:this._source._map).hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Ai.prototype.openOn.call(this,t)},onAdd:function(t){Ai.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof mi||this._source.on("preclick",Be))},onRemove:function(t){Ai.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof mi||this._source.off("preclick",Be))},getEvents:function(){var t=Ai.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=P("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=P("div",t+"-content-wrapper",e);this._contentNode=P("div",t+"-content",i),Ie(e),Oe(this._contentNode),S(e,"contextmenu",Be),this._tipContainer=P("div",t+"-tip-container",e),this._tip=P("div",t+"-tip",this._tipContainer),this.options.closeButton&&((i=this._closeButton=P("a",t+"-close-button",e)).setAttribute("role","button"),i.setAttribute("aria-label","Close popup"),i.href="#close",i.innerHTML='<span aria-hidden="true">&#215;</span>',S(i,"click",function(t){A(t),this.close()},this))},_updateLayout:function(){var t=this._contentNode,e=t.style,i=(e.width="",e.whiteSpace="nowrap",t.offsetWidth),i=Math.min(i,this.options.maxWidth),i=(i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="",t.offsetHeight),n=this.options.maxHeight,o="leaflet-popup-scrolled";(n&&n<i?(e.height=n+"px",M):z)(t,o),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var t=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),e=this._getAnchor();Z(this._container,t.add(e))},_adjustPan:function(t){var e,i,n,o,s,r,a,h;this.options.autoPan&&(this._map._panAnim&&this._map._panAnim.stop(),e=this._map,i=parseInt(pe(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+i,h=this._containerWidth,(n=new p(this._containerLeft,-i-this._containerBottom))._add(Pe(this._container)),n=e.layerPointToContainerPoint(n),s=m(this.options.autoPanPadding),o=m(this.options.autoPanPaddingTopLeft||s),s=m(this.options.autoPanPaddingBottomRight||s),r=e.getSize(),a=0,n.x+h+s.x>r.x&&(a=n.x+h-r.x+s.x),n.x-a-o.x<(h=0)&&(a=n.x-o.x),n.y+i+s.y>r.y&&(h=n.y+i-r.y+s.y),n.y-h-o.y<0&&(h=n.y-o.y),(a||h)&&e.fire("autopanstart").panBy([a,h],{animate:t&&"moveend"===t.type}))},_getAnchor:function(){return m(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}})),Oi=(B.mergeOptions({closePopupOnClick:!0}),B.include({openPopup:function(t,e,i){return this._initOverlay(Bi,t,e,i).openOn(this),this},closePopup:function(t){return(t=arguments.length?t:this._popup)&&t.close(),this}}),o.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Bi,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var e;this._popup&&this._map&&(Re(t),e=t.layer||t.target,this._popup._source!==e||e instanceof mi?(this._popup._source=e,this.openPopup(t.latlng)):this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}}),Ai.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Ai.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Ai.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Ai.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=P("div",t),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i=this._map,n=this._container,o=i.latLngToContainerPoint(i.getCenter()),i=i.layerPointToContainerPoint(t),s=this.options.direction,r=n.offsetWidth,a=n.offsetHeight,h=m(this.options.offset),l=this._getAnchor(),i="top"===s?(e=r/2,a):"bottom"===s?(e=r/2,0):(e="center"===s?r/2:"right"===s?0:"left"===s?r:i.x<o.x?(s="right",0):(s="left",r+2*(h.x+l.x)),a/2);t=t.subtract(m(e,i,!0)).add(h).add(l),z(n,"leaflet-tooltip-right"),z(n,"leaflet-tooltip-left"),z(n,"leaflet-tooltip-top"),z(n,"leaflet-tooltip-bottom"),M(n,"leaflet-tooltip-"+s),Z(n,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&C(this._container,t)},_animateZoom:function(t){t=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(t)},_getAnchor:function(){return m(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}})),Ii=(B.include({openTooltip:function(t,e,i){return this._initOverlay(Oi,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),o.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Oi,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){var e,i;!t&&this._tooltipHandlersAdded||(e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip},this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t)},openTooltip:function(t){return this._tooltip&&this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this)),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=t.getElement();e&&(S(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),S(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){t=t.getElement();t&&t.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){!this._tooltip||!this._map||this._map.dragging&&this._map.dragging.moving()||(this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0))},_moveTooltip:function(t){var e=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(t=this._map.mouseEventToContainerPoint(t.originalEvent),t=this._map.containerPointToLayerPoint(t),e=this._map.layerPointToLatLng(t)),this._tooltip.setLatLng(e)}}),ci.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var t=t&&"DIV"===t.tagName?t:document.createElement("div"),e=this.options;return e.html instanceof Element?(me(t),t.appendChild(e.html)):t.innerHTML=!1!==e.html?e.html:"",e.bgPos&&(e=m(e.bgPos),t.style.backgroundPosition=-e.x+"px "+-e.y+"px"),this._setIconStyles(t,"icon"),t},createShadow:function(){return null}}));ci.Default=di;var Ri=o.extend({options:{tileSize:256,opacity:1,updateWhenIdle:b.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){c(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),T(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(fe(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ge(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){var t;return this._map&&(this._removeAllTiles(),(t=this._clampZoom(this._map.getZoom()))!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=j(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof p?t:new p(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-1/0,1/0),o=0,s=i.length;o<s;o++)e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!b.ielt9){C(this._container,this.options.opacity);var t,e=+new Date,i=!1,n=!1;for(t in this._tiles){var o,s=this._tiles[t];s.current&&s.loaded&&(o=Math.min(1,(e-s.loaded)/200),C(s.el,o),o<1?i=!0:(s.active?n=!0:this._onOpaqueTile(s),s.active=!0))}n&&!this._noPrune&&this._pruneTiles(),i&&(r(this._fadeFrame),this._fadeFrame=x(this._updateOpacity,this))}},_onOpaqueTile:u,_initContainer:function(){this._container||(this._container=P("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(void 0!==t){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(T(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],o=this._map;return n||((n=this._levels[t]={}).el=P("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),u(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n}},_onUpdateLevel:u,_onRemoveLevel:u,_onCreateLevel:u,_pruneTiles:function(){if(this._map){var t,e,i,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom)this._removeAllTiles();else{for(t in this._tiles)(i=this._tiles[t]).retain=i.current;for(t in this._tiles)(i=this._tiles[t]).current&&!i.active&&(e=i.coords,this._retainParent(e.x,e.y,e.z,e.z-5)||this._retainChildren(e.x,e.y,e.z,e.z+2));for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)T(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var t=Math.floor(t/2),e=Math.floor(e/2),i=i-1,o=new p(+t,+e),o=(o.z=i,this._tileCoordsToKey(o)),o=this._tiles[o];return o&&o.active?o.retain=!0:(o&&o.loaded&&(o.retain=!0),n<i&&this._retainParent(t,e,i,n))},_retainChildren:function(t,e,i,n){for(var o=2*t;o<2*t+2;o++)for(var s=2*e;s<2*e+2;s++){var r=new p(o,s),r=(r.z=i+1,this._tileCoordsToKey(r)),r=this._tiles[r];r&&r.active?r.retain=!0:(r&&r.loaded&&(r.retain=!0),i+1<n&&this._retainChildren(o,s,i+1,n))}},_resetView:function(t){t=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),t,t)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return void 0!==e.minNativeZoom&&t<e.minNativeZoom?e.minNativeZoom:void 0!==e.maxNativeZoom&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var o=Math.round(e),o=void 0!==this.options.maxZoom&&o>this.options.maxZoom||void 0!==this.options.minZoom&&o<this.options.minZoom?void 0:this._clampZoom(o),s=this.options.updateWhenZooming&&o!==this._tileZoom;n&&!s||(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==o&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),e=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();b.any3d?be(t.el,e,n):Z(t.el,e)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),i=e.getZoomScale(i,this._tileZoom),t=e.project(t,this._tileZoom).floor(),e=e.getSize().divideBy(2*i);return new f(t.subtract(e),t.add(e))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(void 0===t&&(t=e.getCenter()),void 0!==this._tileZoom){var n,e=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(e),s=o.getCenter(),r=[],e=this.options.keepBuffer,a=new f(o.getBottomLeft().subtract([e,-e]),o.getTopRight().add([e,-e]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(n in this._tiles){var h=this._tiles[n].coords;h.z===this._tileZoom&&a.contains(new p(h.x,h.y))||(this._tiles[n].current=!1)}if(1<Math.abs(i-this._tileZoom))this._setView(t,i);else{for(var l=o.min.y;l<=o.max.y;l++)for(var u=o.min.x;u<=o.max.x;u++){var c,d=new p(u,l);d.z=this._tileZoom,this._isValidTile(d)&&((c=this._tiles[this._tileCoordsToKey(d)])?c.current=!0:r.push(d))}if(r.sort(function(t,e){return t.distanceTo(s)-e.distanceTo(s)}),0!==r.length){this._loading||(this._loading=!0,this.fire("loading"));for(var _=document.createDocumentFragment(),u=0;u<r.length;u++)this._addTile(r[u],_);this._level.el.appendChild(_)}}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}return!this.options.bounds||(e=this._tileCoordsToBounds(t),g(this.options.bounds).overlaps(e))},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),i=n.add(i);return[e.unproject(n,t.z),e.unproject(i,t.z)]},_tileCoordsToBounds:function(t){t=this._tileCoordsToNwSe(t),t=new s(t[0],t[1]);return t=this.options.noWrap?t:this._map.wrapLatLngBounds(t)},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var t=t.split(":"),e=new p(+t[0],+t[1]);return e.z=+t[2],e},_removeTile:function(t){var e=this._tiles[t];e&&(T(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){M(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=u,t.onmousemove=u,b.ielt9&&this.options.opacity<1&&C(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),a(this._tileReady,this,t));this._initTile(o),this.createTile.length<2&&x(a(this._tileReady,this,t,null,o)),Z(o,i),this._tiles[n]={el:o,coords:t,current:!0},e.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);(i=this._tiles[n])&&(i.loaded=+new Date,this._map._fadeAnimated?(C(i.el,0),r(this._fadeFrame),this._fadeFrame=x(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(M(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),b.ielt9||!this._map._fadeAnimated?x(this._pruneTiles,this):setTimeout(a(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new p(this._wrapX?H(t.x,this._wrapX):t.x,this._wrapY?H(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new f(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});var Ni=Ri.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,(e=c(this,e)).detectRetina&&b.retina&&0<e.maxZoom?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&void 0===e&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return S(i,"load",a(this._tileOnLoad,this,e,i)),S(i,"error",a(this._tileOnError,this,e,i)),!this.options.crossOrigin&&""!==this.options.crossOrigin||(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),"string"==typeof this.options.referrerPolicy&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:b.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};return this._map&&!this._map.options.crs.infinite&&(t=this._globalTileRange.max.y-t.y,this.options.tms&&(e.y=t),e["-y"]=t),q(this._url,l(e,this.options))},_tileOnLoad:function(t,e){b.ielt9?setTimeout(a(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom;return(t=this.options.zoomReverse?e-t:t)+this.options.zoomOffset},_getSubdomain:function(t){t=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[t]},_abortLoading:function(){var t,e,i;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&((i=this._tiles[t].el).onload=u,i.onerror=u,i.complete||(i.src=K,e=this._tiles[t].coords,T(i),delete this._tiles[t],this.fire("tileabort",{tile:i,coords:e})))},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",K),Ri.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(this._map&&(!i||i.getAttribute("src")!==K))return Ri.prototype._tileReady.call(this,t,e,i)}});function Di(t,e){return new Ni(t,e)}var ji=Ni.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i,n=l({},this.defaultWmsParams);for(i in e)i in this.options||(n[i]=e[i]);var t=(e=c(this,e)).detectRetina&&b.retina?2:1,o=this.getTileSize();n.width=o.x*t,n.height=o.y*t,this.wmsParams=n},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=1.3<=this._wmsVersion?"crs":"srs";this.wmsParams[e]=this._crs.code,Ni.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,i=_(i.project(e[0]),i.project(e[1])),e=i.min,i=i.max,e=(1.3<=this._wmsVersion&&this._crs===hi?[e.y,e.x,i.y,i.x]:[e.x,e.y,i.x,i.y]).join(","),i=Ni.prototype.getTileUrl.call(this,t);return i+U(this.wmsParams,i,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+e},setParams:function(t,e){return l(this.wmsParams,t),e||this.redraw(),this}});Ni.WMS=ji,Di.wms=function(t,e){return new ji(t,e)};var Hi=o.extend({options:{padding:.1},initialize:function(t){c(this,t),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&M(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),o=this._map.project(this._center,e),n=n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t,e));b.any3d?be(this._container,n,i):Z(this._container,n)},_reset:function(){for(var t in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new f(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Fi=Hi.extend({options:{tolerance:0},getEvents:function(){var t=Hi.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Hi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");S(t,"mousemove",this._onMouseMove,this),S(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),S(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){r(this._redrawRequest),delete this._ctx,T(this._container),k(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var t in this._redrawBounds=null,this._layers)this._layers[t]._update();this._redraw()}},_update:function(){var t,e,i,n;this._map._animatingZoom&&this._bounds||(Hi.prototype._update.call(this),t=this._bounds,e=this._container,i=t.getSize(),n=b.retina?2:1,Z(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",b.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update"))},_reset:function(){Hi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t);t=(this._layers[h(t)]=t)._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=t),this._drawLast=t,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,e=e.prev;i?i.prev=e:this._drawLast=e,e?e.next=i:this._drawFirst=i,delete t._order,delete this._layers[h(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if("string"==typeof t.options.dashArray){for(var e,i=t.options.dashArray.split(/[, ]+/),n=[],o=0;o<i.length;o++){if(e=Number(i[o]),isNaN(e))return;n.push(e)}t.options._dashArray=n}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||x(this._redraw,this))},_extendRedrawBounds:function(t){var e;t._pxBounds&&(e=(t.options.weight||0)+1,this._redrawBounds=this._redrawBounds||new f,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e])))},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t,e=this._redrawBounds;e?(t=e.getSize(),this._ctx.clearRect(e.min.x,e.min.y,t.x,t.y)):(this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore())},_draw:function(){var t,e,i=this._redrawBounds;this._ctx.save(),i&&(e=i.getSize(),this._ctx.beginPath(),this._ctx.rect(i.min.x,i.min.y,e.x,e.y),this._ctx.clip()),this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!i||t._pxBounds&&t._pxBounds.intersects(i))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(h.beginPath(),i=0;i<a;i++){for(n=0,o=r[i].length;n<o;n++)s=r[i][n],h[n?"lineTo":"moveTo"](s.x,s.y);e&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){var e,i,n,o;this._drawing&&!t._empty()&&(e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),1!=(o=(Math.max(Math.round(t._radiusY),1)||n)/n)&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!=o&&i.restore(),this._fillStroke(i,t))},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&0!==i.weight&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e,i,n=this._map.mouseEventToLayerPoint(t),o=this._drawFirst;o;o=o.next)(e=o.layer).options.interactive&&e._containsPoint(n)&&(("click"===t.type||"preclick"===t.type)&&this._map._draggableMoved(e)||(i=e));this._fireEvent(!!i&&[i],t)},_onMouseMove:function(t){var e;!this._map||this._map.dragging.moving()||this._map._animatingZoom||(e=this._map.mouseEventToLayerPoint(t),this._handleMouseHover(t,e))},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(z(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,o=this._drawFirst;o;o=o.next)(i=o.layer).options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(M(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(!!this._hoveredLayer&&[this._hoveredLayer],t),this._mouseHoverThrottled=!0,setTimeout(a(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e,i,n=t._order;n&&(e=n.next,i=n.prev,e&&((e.prev=i)?i.next=e:e&&(this._drawFirst=e),n.prev=this._drawLast,(this._drawLast.next=n).next=null,this._drawLast=n,this._requestRedraw(t)))},_bringToBack:function(t){var e,i,n=t._order;n&&(e=n.next,(i=n.prev)&&((i.next=e)?e.prev=i:i&&(this._drawLast=i),n.prev=null,n.next=this._drawFirst,this._drawFirst.prev=n,this._drawFirst=n,this._requestRedraw(t)))}});function Wi(t){return b.canvas?new Fi(t):null}var Ui=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),zt={_initContainer:function(){this._container=P("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Hi.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=Ui("shape");M(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=Ui("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[h(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;T(e),t.removeInteractiveTarget(e),delete this._layers[h(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(e=e||(t._stroke=Ui("stroke")),o.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=d(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(o.removeChild(e),t._stroke=null),n.fill?(i=i||(t._fill=Ui("fill")),o.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(o.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){fe(t._container)},_bringToBack:function(t){ge(t._container)}},Vi=b.vml?Ui:ct,qi=Hi.extend({_initContainer:function(){this._container=Vi("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Vi("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){T(this._container),k(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){var t,e,i;this._map._animatingZoom&&this._bounds||(Hi.prototype._update.call(this),e=(t=this._bounds).getSize(),i=this._container,this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),Z(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update"))},_initPath:function(t){var e=t._path=Vi("path");t.options.className&&M(e,t.options.className),t.options.interactive&&M(e,"leaflet-interactive"),this._updateStyle(t),this._layers[h(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){T(t._path),t.removeInteractiveTarget(t._path),delete this._layers[h(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,t=t.options;e&&(t.stroke?(e.setAttribute("stroke",t.color),e.setAttribute("stroke-opacity",t.opacity),e.setAttribute("stroke-width",t.weight),e.setAttribute("stroke-linecap",t.lineCap),e.setAttribute("stroke-linejoin",t.lineJoin),t.dashArray?e.setAttribute("stroke-dasharray",t.dashArray):e.removeAttribute("stroke-dasharray"),t.dashOffset?e.setAttribute("stroke-dashoffset",t.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),t.fill?(e.setAttribute("fill",t.fillColor||t.color),e.setAttribute("fill-opacity",t.fillOpacity),e.setAttribute("fill-rule",t.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,dt(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n="a"+i+","+(Math.max(Math.round(t._radiusY),1)||i)+" 0 1,0 ",e=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+n+2*i+",0 "+n+2*-i+",0 ";this._setPath(t,e)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){fe(t._path)},_bringToBack:function(t){ge(t._path)}});function Gi(t){return b.svg||b.vml?new qi(t):null}b.vml&&qi.include(zt),B.include({getRenderer:function(t){t=(t=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer)||(this._renderer=this._createRenderer());return this.hasLayer(t)||this.addLayer(t),t},_getPaneRenderer:function(t){var e;return"overlayPane"!==t&&void 0!==t&&(void 0===(e=this._paneRenderers[t])&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e)},_createRenderer:function(t){return this.options.preferCanvas&&Wi(t)||Gi(t)}});var Ki=yi.extend({initialize:function(t,e){yi.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return[(t=g(t)).getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});qi.create=Vi,qi.pointsToPath=dt,xi.geometryToLayer=wi,xi.coordsToLatLng=Pi,xi.coordsToLatLngs=Li,xi.latLngToCoords=Ti,xi.latLngsToCoords=Mi,xi.getFeature=zi,xi.asFeature=Ci,B.mergeOptions({boxZoom:!0});var _t=n.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){S(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){k(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){T(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1;this._clearDeferredResetState(),this._resetState(),re(),Le(),this._startPoint=this._map.mouseEventToContainerPoint(t),S(document,{contextmenu:Re,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=P("div","leaflet-zoom-box",this._container),M(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var t=new f(this._point,this._startPoint),e=t.getSize();Z(this._box,t.min),this._box.style.width=e.x+"px",this._box.style.height=e.y+"px"},_finish:function(){this._moved&&(T(this._box),z(this._container,"leaflet-crosshair")),ae(),Te(),k(document,{contextmenu:Re,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){1!==t.which&&1!==t.button||(this._finish(),this._moved&&(this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(a(this._resetState,this),0),t=new s(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point)),this._map.fitBounds(t).fire("boxzoomend",{boxZoomBounds:t})))},_onKeyDown:function(t){27===t.keyCode&&(this._finish(),this._clearDeferredResetState(),this._resetState())}}),Ct=(B.addInitHook("addHandler","boxZoom",_t),B.mergeOptions({doubleClickZoom:!0}),n.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,i=t.originalEvent.shiftKey?i-n:i+n;"center"===e.options.doubleClickZoom?e.setZoom(i):e.setZoomAround(t.containerPoint,i)}})),Zt=(B.addInitHook("addHandler","doubleClickZoom",Ct),B.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0}),n.extend({addHooks:function(){var t;this._draggable||(t=this._map,this._draggable=new Je(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))),M(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){z(this._map._container,"leaflet-grab"),z(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t,e=this._map;e._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity?(t=g(this._map.options.maxBounds),this._offsetLimit=_(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))):this._offsetLimit=null,e.fire("movestart").fire("dragstart"),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){var e,i;this._map.options.inertia&&(e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos,this._positions.push(i),this._times.push(e),this._prunePositions(e)),this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;1<this._positions.length&&50<t-this._times[0];)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){var t,e;this._viscosity&&this._offsetLimit&&(t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit,t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t))},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,n=(n+e+i)%t-e-i,t=Math.abs(o+i)<Math.abs(n+i)?o:n;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=t},_onDragEnd:function(t){var e,i,n,o,s=this._map,r=s.options,a=!r.inertia||t.noInertia||this._times.length<2;s.fire("dragend",t),!a&&(this._prunePositions(+new Date),t=this._lastPos.subtract(this._positions[0]),a=(this._lastTime-this._times[0])/1e3,e=r.easeLinearity,a=(t=t.multiplyBy(e/a)).distanceTo([0,0]),i=Math.min(r.inertiaMaxSpeed,a),t=t.multiplyBy(i/a),n=i/(r.inertiaDeceleration*e),(o=t.multiplyBy(-n/2).round()).x||o.y)?(o=s._limitOffset(o,s.options.maxBounds),x(function(){s.panBy(o,{duration:n,easeLinearity:e,noMoveStart:!0,animate:!0})})):s.fire("moveend")}})),St=(B.addInitHook("addHandler","dragging",Zt),B.mergeOptions({keyboard:!0,keyboardPanDelta:80}),n.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),S(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),k(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){var t,e,i;this._focused||(i=document.body,t=document.documentElement,e=i.scrollTop||t.scrollTop,i=i.scrollLeft||t.scrollLeft,this._map._container.focus(),window.scrollTo(i,e))},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){for(var e=this._panKeys={},i=this.keyCodes,n=0,o=i.left.length;n<o;n++)e[i.left[n]]=[-1*t,0];for(n=0,o=i.right.length;n<o;n++)e[i.right[n]]=[t,0];for(n=0,o=i.down.length;n<o;n++)e[i.down[n]]=[0,t];for(n=0,o=i.up.length;n<o;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){for(var e=this._zoomKeys={},i=this.keyCodes,n=0,o=i.zoomIn.length;n<o;n++)e[i.zoomIn[n]]=t;for(n=0,o=i.zoomOut.length;n<o;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){S(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){k(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys)n._panAnim&&n._panAnim._inProgress||(e=this._panKeys[i],t.shiftKey&&(e=m(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds));else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i||!n._popup||!n._popup.options.closeOnEscapeKey)return;n.closePopup()}Re(t)}}})),Et=(B.addInitHook("addHandler","keyboard",St),B.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60}),n.extend({addHooks:function(){S(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){k(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=He(t),i=this._map.options.wheelDebounceTime,e=(this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date),Math.max(i-(+new Date-this._startTime),0));clearTimeout(this._timer),this._timer=setTimeout(a(this._performZoom,this),e),Re(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0,n=(t._stop(),this._delta/(4*this._map.options.wheelPxPerZoomLevel)),n=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,i=i?Math.ceil(n/i)*i:n,n=t._limitZoom(e+(0<this._delta?i:-i))-e;this._delta=0,this._startTime=null,n&&("center"===t.options.scrollWheelZoom?t.setZoom(e+n):t.setZoomAround(this._lastMousePos,e+n))}})),kt=(B.addInitHook("addHandler","scrollWheelZoom",Et),B.mergeOptions({tapHold:b.touchNative&&b.safari&&b.mobile,tapTolerance:15}),n.extend({addHooks:function(){S(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){k(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){var e;clearTimeout(this._holdTimeout),1===t.touches.length&&(e=t.touches[0],this._startPos=this._newPos=new p(e.clientX,e.clientY),this._holdTimeout=setTimeout(a(function(){this._cancel(),this._isTapValid()&&(S(document,"touchend",A),S(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),600),S(document,"touchend touchcancel contextmenu",this._cancel,this),S(document,"touchmove",this._onMove,this))},_cancelClickPrevent:function t(){k(document,"touchend",A),k(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),k(document,"touchend touchcancel contextmenu",this._cancel,this),k(document,"touchmove",this._onMove,this)},_onMove:function(t){t=t.touches[0];this._newPos=new p(t.clientX,t.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){t=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});t._simulated=!0,e.target.dispatchEvent(t)}})),At=(B.addInitHook("addHandler","tapHold",kt),B.mergeOptions({touchZoom:b.touch,bounceAtZoomLimits:!0}),n.extend({addHooks:function(){M(this._map._container,"leaflet-touch-zoom"),S(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){z(this._map._container,"leaflet-touch-zoom"),k(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e,i,n=this._map;!t.touches||2!==t.touches.length||n._animatingZoom||this._zooming||(e=n.mouseEventToContainerPoint(t.touches[0]),i=n.mouseEventToContainerPoint(t.touches[1]),this._centerPoint=n.getSize()._divideBy(2),this._startLatLng=n.containerPointToLatLng(this._centerPoint),"center"!==n.options.touchZoom&&(this._pinchStartLatLng=n.containerPointToLatLng(e.add(i)._divideBy(2))),this._startDist=e.distanceTo(i),this._startZoom=n.getZoom(),this._moved=!1,this._zooming=!0,n._stop(),S(document,"touchmove",this._onTouchMove,this),S(document,"touchend touchcancel",this._onTouchEnd,this),A(t))},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),o=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(o,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&o<1||this._zoom>e.getMaxZoom()&&1<o)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1==o)return}else{i=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1==o&&0===i.x&&0===i.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(i),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),r(this._animRequest);n=a(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=x(n,this,!0),A(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,r(this._animRequest),k(document,"touchmove",this._onTouchMove,this),k(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}})),Yi=(B.addInitHook("addHandler","touchZoom",At),B.BoxZoom=_t,B.DoubleClickZoom=Ct,B.Drag=Zt,B.Keyboard=St,B.ScrollWheelZoom=Et,B.TapHold=kt,B.TouchZoom=At,t.Bounds=f,t.Browser=b,t.CRS=ot,t.Canvas=Fi,t.Circle=gi,t.CircleMarker=fi,t.Class=et,t.Control=O,t.DivIcon=Ii,t.DivOverlay=Ai,t.DomEvent=mt,t.DomUtil=pt,t.Draggable=Je,t.Evented=it,t.FeatureGroup=ui,t.GeoJSON=xi,t.GridLayer=Ri,t.Handler=n,t.Icon=ci,t.ImageOverlay=Si,t.LatLng=v,t.LatLngBounds=s,t.Layer=o,t.LayerGroup=li,t.LineUtil=gt,t.Map=B,t.Marker=pi,t.Mixin=ft,t.Path=mi,t.Point=p,t.PolyUtil=vt,t.Polygon=yi,t.Polyline=vi,t.Popup=Bi,t.PosAnimation=We,t.Projection=wt,t.Rectangle=Ki,t.Renderer=Hi,t.SVG=qi,t.SVGOverlay=ki,t.TileLayer=Ni,t.Tooltip=Oi,t.Transformation=at,t.Util=tt,t.VideoOverlay=Ei,t.bind=a,t.bounds=_,t.canvas=Wi,t.circle=function(t,e,i){return new gi(t,e,i)},t.circleMarker=function(t,e){return new fi(t,e)},t.control=Ue,t.divIcon=function(t){return new Ii(t)},t.extend=l,t.featureGroup=function(t,e){return new ui(t,e)},t.geoJSON=Zi,t.geoJson=Mt,t.gridLayer=function(t){return new Ri(t)},t.icon=function(t){return new ci(t)},t.imageOverlay=function(t,e,i){return new Si(t,e,i)},t.latLng=w,t.latLngBounds=g,t.layerGroup=function(t,e){return new li(t,e)},t.map=function(t,e){return new B(t,e)},t.marker=function(t,e){return new pi(t,e)},t.point=m,t.polygon=function(t,e){return new yi(t,e)},t.polyline=function(t,e){return new vi(t,e)},t.popup=function(t,e){return new Bi(t,e)},t.rectangle=function(t,e){return new Ki(t,e)},t.setOptions=c,t.stamp=h,t.svg=Gi,t.svgOverlay=function(t,e,i){return new ki(t,e,i)},t.tileLayer=Di,t.tooltip=function(t,e){return new Oi(t,e)},t.transformation=ht,t.version="1.9.2",t.videoOverlay=function(t,e,i){return new Ei(t,e,i)},window.L);t.noConflict=function(){return window.L=Yi,this},window.L=t});

},{}],"../node_modules/leaflet-easyprint/dist/bundle.js":[function(require,module,exports) {
var define;
var global = arguments[3];
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=t(function(t){!function(e){function n(t,e){function n(t){return e.bgcolor&&(t.style.backgroundColor=e.bgcolor),e.width&&(t.style.width=e.width+"px"),e.height&&(t.style.height=e.height+"px"),e.style&&Object.keys(e.style).forEach(function(n){t.style[n]=e.style[n]}),t}return e=e||{},s(e),Promise.resolve(t).then(function(t){return u(t,e.filter,!0)}).then(c).then(d).then(n).then(function(n){return g(n,e.width||h.width(t),e.height||h.height(t))})}function i(t,e){return l(t,e||{}).then(function(e){return e.getContext("2d").getImageData(0,0,h.width(t),h.height(t)).data})}function o(t,e){return l(t,e||{}).then(function(t){return t.toDataURL()})}function r(t,e){return e=e||{},l(t,e).then(function(t){return t.toDataURL("image/jpeg",e.quality||1)})}function a(t,e){return l(t,e||{}).then(h.canvasToBlob)}function s(t){void 0===t.imagePlaceholder?w.impl.options.imagePlaceholder=M.imagePlaceholder:w.impl.options.imagePlaceholder=t.imagePlaceholder,void 0===t.cacheBust?w.impl.options.cacheBust=M.cacheBust:w.impl.options.cacheBust=t.cacheBust}function l(t,e){function i(t){var n=document.createElement("canvas");if(n.width=e.width||h.width(t),n.height=e.height||h.height(t),e.bgcolor){var i=n.getContext("2d");i.fillStyle=e.bgcolor,i.fillRect(0,0,n.width,n.height)}return n}return n(t,e).then(h.makeImage).then(h.delay(100)).then(function(e){var n=i(t);return n.getContext("2d").drawImage(e,0,0),n})}function u(t,e,n){function i(t){return t instanceof HTMLCanvasElement?h.makeImage(t.toDataURL()):t.cloneNode(!1)}function o(t,e,n){var i=t.childNodes;return 0===i.length?Promise.resolve(e):function(t,e,n){var i=Promise.resolve();return e.forEach(function(e){i=i.then(function(){return u(e,n)}).then(function(e){e&&t.appendChild(e)})}),i}(e,h.asArray(i),n).then(function(){return e})}function r(t,e){function n(){!function(t,e){t.cssText?e.cssText=t.cssText:function(t,e){h.asArray(t).forEach(function(n){e.setProperty(n,t.getPropertyValue(n),t.getPropertyPriority(n))})}(t,e)}(window.getComputedStyle(t),e.style)}function i(){function n(n){var i=window.getComputedStyle(t,n),o=i.getPropertyValue("content");if(""!==o&&"none"!==o){var r=h.uid();e.className=e.className+" "+r;var a=document.createElement("style");a.appendChild(function(t,e,n){var i="."+t+":"+e,o=n.cssText?function(t){var e=t.getPropertyValue("content");return t.cssText+" content: "+e+";"}(n):function(t){function e(e){return e+": "+t.getPropertyValue(e)+(t.getPropertyPriority(e)?" !important":"")}return h.asArray(t).map(e).join("; ")+";"}(n);return document.createTextNode(i+"{"+o+"}")}(r,n,i)),e.appendChild(a)}}[":before",":after"].forEach(function(t){n(t)})}function o(){t instanceof HTMLTextAreaElement&&(e.innerHTML=t.value),t instanceof HTMLInputElement&&e.setAttribute("value",t.value)}function r(){e instanceof SVGElement&&(e.setAttribute("xmlns","http://www.w3.org/2000/svg"),e instanceof SVGRectElement&&["width","height"].forEach(function(t){var n=e.getAttribute(t);n&&e.style.setProperty(t,n)}))}return e instanceof Element?Promise.resolve().then(n).then(i).then(o).then(r).then(function(){return e}):e}return n||!e||e(t)?Promise.resolve(t).then(i).then(function(n){return o(t,n,e)}).then(function(e){return r(t,e)}):Promise.resolve()}function c(t){return p.resolveAll().then(function(e){var n=document.createElement("style");return t.appendChild(n),n.appendChild(document.createTextNode(e)),t})}function d(t){return f.inlineAll(t).then(function(){return t})}function g(t,e,n){return Promise.resolve(t).then(function(t){return t.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(t)}).then(h.escapeXhtml).then(function(t){return'<foreignObject x="0" y="0" width="100%" height="100%">'+t+"</foreignObject>"}).then(function(t){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+e+'" height="'+n+'">'+t+"</svg>"}).then(function(t){return"data:image/svg+xml;charset=utf-8,"+t})}var h=function(){function t(){var t="application/font-woff",e="image/jpeg";return{woff:t,woff2:t,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:e,jpeg:e,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}function e(t){var e=/\.([^\.\/]*?)$/g.exec(t);return e?e[1]:""}function n(n){var i=e(n).toLowerCase();return t()[i]||""}function i(t){return-1!==t.search(/^(data:)/)}function o(t){return new Promise(function(e){for(var n=window.atob(t.toDataURL().split(",")[1]),i=n.length,o=new Uint8Array(i),r=0;r<i;r++)o[r]=n.charCodeAt(r);e(new Blob([o],{type:"image/png"}))})}function r(t){return t.toBlob?new Promise(function(e){t.toBlob(e)}):o(t)}function a(t,e){var n=document.implementation.createHTMLDocument(),i=n.createElement("base");n.head.appendChild(i);var o=n.createElement("a");return n.body.appendChild(o),i.href=e,o.href=t,o.href}function s(t){return new Promise(function(e,n){var i=new Image;i.onload=function(){e(i)},i.onerror=n,i.src=t})}function l(t){var e=3e4;return w.impl.options.cacheBust&&(t+=(/\?/.test(t)?"&":"?")+(new Date).getTime()),new Promise(function(n){function i(){if(4===a.readyState){if(200!==a.status)return void(s?n(s):r("cannot fetch resource: "+t+", status: "+a.status));var e=new FileReader;e.onloadend=function(){var t=e.result.split(/,/)[1];n(t)},e.readAsDataURL(a.response)}}function o(){s?n(s):r("timeout of "+e+"ms occured while fetching resource: "+t)}function r(t){console.error(t),n("")}var a=new XMLHttpRequest;a.onreadystatechange=i,a.ontimeout=o,a.responseType="blob",a.timeout=e,a.open("GET",t,!0),a.send();var s;if(w.impl.options.imagePlaceholder){var l=w.impl.options.imagePlaceholder.split(/,/);l&&l[1]&&(s=l[1])}})}function u(t,e){return"data:"+e+";base64,"+t}function c(t){return t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")}function d(t){return function(e){return new Promise(function(n){setTimeout(function(){n(e)},t)})}}function g(t){for(var e=[],n=t.length,i=0;i<n;i++)e.push(t[i]);return e}function h(t){return t.replace(/#/g,"%23").replace(/\n/g,"%0A")}function m(t){var e=f(t,"border-left-width"),n=f(t,"border-right-width");return t.scrollWidth+e+n}function p(t){var e=f(t,"border-top-width"),n=f(t,"border-bottom-width");return t.scrollHeight+e+n}function f(t,e){var n=window.getComputedStyle(t).getPropertyValue(e);return parseFloat(n.replace("px",""))}return{escape:c,parseExtension:e,mimeType:n,dataAsUrl:u,isDataUrl:i,canvasToBlob:r,resolveUrl:a,getAndEncode:l,uid:function(){var t=0;return function(){return"u"+function(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}()+t++}}(),delay:d,asArray:g,escapeXhtml:h,makeImage:s,width:m,height:p}}(),m=function(){function t(t){return-1!==t.search(o)}function e(t){for(var e,n=[];null!==(e=o.exec(t));)n.push(e[1]);return n.filter(function(t){return!h.isDataUrl(t)})}function n(t,e,n,i){function o(t){return new RegExp("(url\\(['\"]?)("+h.escape(t)+")(['\"]?\\))","g")}return Promise.resolve(e).then(function(t){return n?h.resolveUrl(t,n):t}).then(i||h.getAndEncode).then(function(t){return h.dataAsUrl(t,h.mimeType(e))}).then(function(n){return t.replace(o(e),"$1"+n+"$3")})}function i(i,o,r){return function(){return!t(i)}()?Promise.resolve(i):Promise.resolve(i).then(e).then(function(t){var e=Promise.resolve(i);return t.forEach(function(t){e=e.then(function(e){return n(e,t,o,r)})}),e})}var o=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:i,shouldProcess:t,impl:{readUrls:e,inline:n}}}(),p=function(){function t(){return e(document).then(function(t){return Promise.all(t.map(function(t){return t.resolve()}))}).then(function(t){return t.join("\n")})}function e(){function t(t){return t.filter(function(t){return t.type===CSSRule.FONT_FACE_RULE}).filter(function(t){return m.shouldProcess(t.style.getPropertyValue("src"))})}function e(t){var e=[];return t.forEach(function(t){try{h.asArray(t.cssRules||[]).forEach(e.push.bind(e))}catch(e){console.log("Error while reading CSS rules from "+t.href,e.toString())}}),e}function n(t){return{resolve:function(){var e=(t.parentStyleSheet||{}).href;return m.inlineAll(t.cssText,e)},src:function(){return t.style.getPropertyValue("src")}}}return Promise.resolve(h.asArray(document.styleSheets)).then(e).then(t).then(function(t){return t.map(n)})}return{resolveAll:t,impl:{readAll:e}}}(),f=function(){function t(t){function e(e){return h.isDataUrl(t.src)?Promise.resolve():Promise.resolve(t.src).then(e||h.getAndEncode).then(function(e){return h.dataAsUrl(e,h.mimeType(t.src))}).then(function(e){return new Promise(function(n,i){t.onload=n,t.onerror=i,t.src=e})})}return{inline:e}}function e(n){return n instanceof Element?function(t){var e=t.style.getPropertyValue("background");return e?m.inlineAll(e).then(function(e){t.style.setProperty("background",e,t.style.getPropertyPriority("background"))}).then(function(){return t}):Promise.resolve(t)}(n).then(function(){return n instanceof HTMLImageElement?t(n).inline():Promise.all(h.asArray(n.childNodes).map(function(t){return e(t)}))}):Promise.resolve(n)}return{inlineAll:e,impl:{newImage:t}}}(),M={imagePlaceholder:void 0,cacheBust:!1},w={toSvg:n,toPng:o,toJpeg:r,toBlob:a,toPixelData:i,impl:{fontFaces:p,images:f,util:h,inliner:m,options:{}}};t.exports=w}()}),i=t(function(t){var n=n||function(t){if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,n=function(){return t.URL||t.webkitURL||t},i=e.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in i,r=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},a=/constructor/i.test(t.HTMLElement)||t.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent),l=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},u=function(t){var e=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};setTimeout(e,4e4)},c=function(t,e,n){e=[].concat(e);for(var i=e.length;i--;){var o=t["on"+e[i]];if("function"==typeof o)try{o.call(t,n||t)}catch(t){l(t)}}},d=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},g=function(e,l,g){g||(e=d(e));var h,m=this,p=e.type,f="application/octet-stream"===p,M=function(){c(m,"writestart progress write writeend".split(" "))};if(m.readyState=m.INIT,o)return h=n().createObjectURL(e),void setTimeout(function(){i.href=h,i.download=l,r(i),M(),u(h),m.readyState=m.DONE});!function(){if((s||f&&a)&&t.FileReader){var i=new FileReader;return i.onloadend=function(){var e=s?i.result:i.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,m.readyState=m.DONE,M()},i.readAsDataURL(e),void(m.readyState=m.INIT)}if(h||(h=n().createObjectURL(e)),f)t.location.href=h;else{t.open(h,"_blank")||(t.location.href=h)}m.readyState=m.DONE,M(),u(h)}()},h=g.prototype,m=function(t,e,n){return new g(t,e||t.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=d(t)),navigator.msSaveOrOpenBlob(t,e)}:(h.abort=function(){},h.readyState=h.INIT=0,h.WRITING=1,h.DONE=2,h.error=h.onwritestart=h.onprogress=h.onwrite=h.onabort=h.onerror=h.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||e.content);t.exports&&(t.exports.saveAs=n)});L.Control.EasyPrint=L.Control.extend({options:{title:"Print map",position:"topleft",sizeModes:["Current"],filename:"map",exportOnly:!1,hidden:!1,tileWait:500,hideControlContainer:!0,hideClasses:[],customWindowTitle:window.document.title,spinnerBgCOlor:"#0DC5C1",customSpinnerClass:"epLoader",defaultSizeTitles:{Current:"Current Size",A4Landscape:"A4 Landscape",A4Portrait:"A4 Portrait"}},onAdd:function(){this.mapContainer=this._map.getContainer(),this.options.sizeModes=this.options.sizeModes.map(function(t){return"Current"===t?{name:this.options.defaultSizeTitles.Current,className:"CurrentSize"}:"A4Landscape"===t?{height:this._a4PageSize.height,width:this._a4PageSize.width,name:this.options.defaultSizeTitles.A4Landscape,className:"A4Landscape page"}:"A4Portrait"===t?{height:this._a4PageSize.width,width:this._a4PageSize.height,name:this.options.defaultSizeTitles.A4Portrait,className:"A4Portrait page"}:t},this);var t=L.DomUtil.create("div","leaflet-control-easyPrint leaflet-bar leaflet-control");if(!this.options.hidden){this._addCss(),L.DomEvent.addListener(t,"mouseover",this._togglePageSizeButtons,this),L.DomEvent.addListener(t,"mouseout",this._togglePageSizeButtons,this);var e="leaflet-control-easyPrint-button";this.options.exportOnly&&(e+="-export"),this.link=L.DomUtil.create("a",e,t),this.link.id="leafletEasyPrint",this.link.title=this.options.title,this.holder=L.DomUtil.create("ul","easyPrintHolder",t),this.options.sizeModes.forEach(function(t){var e=L.DomUtil.create("li","easyPrintSizeMode",this.holder);e.title=t.name;L.DomUtil.create("a",t.className,e);L.DomEvent.addListener(e,"click",this.printMap,this)},this),L.DomEvent.disableClickPropagation(t)}return t},printMap:function(t,e){e&&(this.options.filename=e),this.options.exportOnly||(this._page=window.open("","_blank","toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10, top=10, width=200, height=250, visible=none"),this._page.document.write(this._createSpinner(this.options.customWindowTitle,this.options.customSpinnerClass,this.options.spinnerBgCOlor))),this.originalState={mapWidth:this.mapContainer.style.width,widthWasAuto:!1,widthWasPercentage:!1,mapHeight:this.mapContainer.style.height,zoom:this._map.getZoom(),center:this._map.getCenter()},"auto"===this.originalState.mapWidth?(this.originalState.mapWidth=this._map.getSize().x+"px",this.originalState.widthWasAuto=!0):this.originalState.mapWidth.includes("%")&&(this.originalState.percentageWidth=this.originalState.mapWidth,this.originalState.widthWasPercentage=!0,this.originalState.mapWidth=this._map.getSize().x+"px"),this._map.fire("easyPrint-start",{event:t}),this.options.hidden||this._togglePageSizeButtons({type:null}),this.options.hideControlContainer&&this._toggleControls(),this.options.hideClasses.length>0&&this._toggleClasses(this.options.hideClasses);var n="string"!=typeof t?t.target.className:t;if("CurrentSize"===n)return this._printOpertion(n);this.outerContainer=this._createOuterContainer(this.mapContainer),this.originalState.widthWasAuto&&(this.outerContainer.style.width=this.originalState.mapWidth),this._createImagePlaceholder(n)},_createImagePlaceholder:function(t){var e=this;n.toPng(this.mapContainer,{width:parseInt(this.originalState.mapWidth.replace("px")),height:parseInt(this.originalState.mapHeight.replace("px"))}).then(function(n){e.blankDiv=document.createElement("div");var i=e.blankDiv;e.outerContainer.parentElement.insertBefore(i,e.outerContainer),i.className="epHolder",i.style.backgroundImage='url("'+n+'")',i.style.position="absolute",i.style.zIndex=1011,i.style.display="initial",i.style.width=e.originalState.mapWidth,i.style.height=e.originalState.mapHeight,e._resizeAndPrintMap(t)}).catch(function(t){console.error("oops, something went wrong!",t)})},_resizeAndPrintMap:function(t){this.outerContainer.style.opacity=0;var e=this.options.sizeModes.filter(function(e){return e.className===t});e=e[0],this.mapContainer.style.width=e.width+"px",this.mapContainer.style.height=e.height+"px",this.mapContainer.style.width>this.mapContainer.style.height?this.orientation="portrait":this.orientation="landscape",this._map.setView(this.originalState.center),this._map.setZoom(this.originalState.zoom),this._map.invalidateSize(),this.options.tileLayer?this._pausePrint(t):this._printOpertion(t)},_pausePrint:function(t){var e=this,n=setInterval(function(){e.options.tileLayer.isLoading()||(clearInterval(n),e._printOpertion(t))},e.options.tileWait)},_printOpertion:function(t){var e=this,o=this.mapContainer.style.width;(this.originalState.widthWasAuto&&"CurrentSize"===t||this.originalState.widthWasPercentage&&"CurrentSize"===t)&&(o=this.originalState.mapWidth),n.toPng(e.mapContainer,{width:parseInt(o),height:parseInt(e.mapContainer.style.height.replace("px"))}).then(function(t){var n=e._dataURItoBlob(t);e.options.exportOnly?i.saveAs(n,e.options.filename+".png"):e._sendToBrowserPrint(t,e.orientation),e._toggleControls(!0),e._toggleClasses(e.options.hideClasses,!0),e.outerContainer&&(e.originalState.widthWasAuto?e.mapContainer.style.width="auto":e.originalState.widthWasPercentage?e.mapContainer.style.width=e.originalState.percentageWidth:e.mapContainer.style.width=e.originalState.mapWidth,e.mapContainer.style.height=e.originalState.mapHeight,e._removeOuterContainer(e.mapContainer,e.outerContainer,e.blankDiv),e._map.invalidateSize(),e._map.setView(e.originalState.center),e._map.setZoom(e.originalState.zoom)),e._map.fire("easyPrint-finished")}).catch(function(t){console.error("Print operation failed",t)})},_sendToBrowserPrint:function(t,e){this._page.resizeTo(600,800);var n=this._createNewWindow(t,e,this);this._page.document.body.innerHTML="",this._page.document.write(n),this._page.document.close()},_createSpinner:function(t,e,n){return"<html><head><title>"+t+"</title></head><body><style>\n      body{\n        background: "+n+";\n      }\n      .epLoader,\n      .epLoader:before,\n      .epLoader:after {\n        border-radius: 50%;\n      }\n      .epLoader {\n        color: #ffffff;\n        font-size: 11px;\n        text-indent: -99999em;\n        margin: 55px auto;\n        position: relative;\n        width: 10em;\n        height: 10em;\n        box-shadow: inset 0 0 0 1em;\n        -webkit-transform: translateZ(0);\n        -ms-transform: translateZ(0);\n        transform: translateZ(0);\n      }\n      .epLoader:before,\n      .epLoader:after {\n        position: absolute;\n        content: '';\n      }\n      .epLoader:before {\n        width: 5.2em;\n        height: 10.2em;\n        background: #0dc5c1;\n        border-radius: 10.2em 0 0 10.2em;\n        top: -0.1em;\n        left: -0.1em;\n        -webkit-transform-origin: 5.2em 5.1em;\n        transform-origin: 5.2em 5.1em;\n        -webkit-animation: load2 2s infinite ease 1.5s;\n        animation: load2 2s infinite ease 1.5s;\n      }\n      .epLoader:after {\n        width: 5.2em;\n        height: 10.2em;\n        background: #0dc5c1;\n        border-radius: 0 10.2em 10.2em 0;\n        top: -0.1em;\n        left: 5.1em;\n        -webkit-transform-origin: 0px 5.1em;\n        transform-origin: 0px 5.1em;\n        -webkit-animation: load2 2s infinite ease;\n        animation: load2 2s infinite ease;\n      }\n      @-webkit-keyframes load2 {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n      @keyframes load2 {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n      </style>\n    <div class=\""+e+'">Loading...</div></body></html>'},_createNewWindow:function(t,e,n){return"<html><head>\n        <style>@media print {\n          img { max-width: 98%!important; max-height: 98%!important; }\n          @page { size: "+e+";}}\n        </style>\n        <script>function step1(){\n        setTimeout('step2()', 10);}\n        function step2(){window.print();window.close()}\n        <\/script></head><body onload='step1()'>\n        <img src=\""+t+'" style="display:block; margin:auto;"></body></html>'},_createOuterContainer:function(t){var e=document.createElement("div");return t.parentNode.insertBefore(e,t),t.parentNode.removeChild(t),e.appendChild(t),e.style.width=t.style.width,e.style.height=t.style.height,e.style.display="inline-block",e.style.overflow="hidden",e},_removeOuterContainer:function(t,e,n){e.parentNode&&(e.parentNode.insertBefore(t,e),e.parentNode.removeChild(n),e.parentNode.removeChild(e))},_addCss:function(){var t=document.createElement("style");t.type="text/css",t.innerHTML=".leaflet-control-easyPrint-button { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTI4LDMyaDI1NnY2NEgxMjhWMzJ6IE00ODAsMTI4SDMyYy0xNy42LDAtMzIsMTQuNC0zMiwzMnYxNjBjMCwxNy42LDE0LjM5OCwzMiwzMiwzMmg5NnYxMjhoMjU2VjM1Mmg5NiAgIGMxNy42LDAsMzItMTQuNCwzMi0zMlYxNjBDNTEyLDE0Mi40LDQ5Ny42LDEyOCw0ODAsMTI4eiBNMzUyLDQ0OEgxNjBWMjg4aDE5MlY0NDh6IE00ODcuMTk5LDE3NmMwLDEyLjgxMy0xMC4zODcsMjMuMi0yMy4xOTcsMjMuMiAgIGMtMTIuODEyLDAtMjMuMjAxLTEwLjM4Ny0yMy4yMDEtMjMuMnMxMC4zODktMjMuMiwyMy4xOTktMjMuMkM0NzYuODE0LDE1Mi44LDQ4Ny4xOTksMTYzLjE4Nyw0ODcuMTk5LDE3NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);\n      background-size: 16px 16px; \n      cursor: pointer; \n    }\n    .leaflet-control-easyPrint-button-export { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzMy41IDQzMy41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzMuNSA0MzMuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJmaWxlLWRvd25sb2FkIj4KCQk8cGF0aCBkPSJNMzk1LjI1LDE1M2gtMTAyVjBoLTE1M3YxNTNoLTEwMmwxNzguNSwxNzguNUwzOTUuMjUsMTUzeiBNMzguMjUsMzgyLjV2NTFoMzU3di01MUgzOC4yNXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);\n      background-size: 16px 16px; \n      cursor: pointer; \n    }\n    .easyPrintHolder a {\n      background-size: 16px 16px;\n      cursor: pointer;\n    }\n    .easyPrintHolder .CurrentSize{\n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPgogIDxnPgogICAgPGcgZmlsbD0iIzFEMUQxQiI+CiAgICAgIDxwYXRoIGQ9Ik0yNS4yNTUsMzUuOTA1TDQuMDE2LDU3LjE0NVY0Ni41OWMwLTEuMTA4LTAuODk3LTIuMDA4LTIuMDA4LTIuMDA4QzAuODk4LDQ0LjU4MiwwLDQ1LjQ4MSwwLDQ2LjU5djE1LjQwMiAgICBjMCwwLjI2MSwwLjA1MywwLjUyMSwwLjE1NSwwLjc2N2MwLjIwMywwLjQ5MiwwLjU5NCwwLjg4MiwxLjA4NiwxLjA4N0MxLjQ4Niw2My45NDcsMS43NDcsNjQsMi4wMDgsNjRoMTUuNDAzICAgIGMxLjEwOSwwLDIuMDA4LTAuODk4LDIuMDA4LTIuMDA4cy0wLjg5OC0yLjAwOC0yLjAwOC0yLjAwOEg2Ljg1NWwyMS4yMzgtMjEuMjRjMC43ODQtMC43ODQsMC43ODQtMi4wNTUsMC0yLjgzOSAgICBTMjYuMDM5LDM1LjEyMSwyNS4yNTUsMzUuOTA1eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJtNjMuODQ1LDEuMjQxYy0wLjIwMy0wLjQ5MS0wLjU5NC0wLjg4Mi0xLjA4Ni0xLjA4Ny0wLjI0NS0wLjEwMS0wLjUwNi0wLjE1NC0wLjc2Ny0wLjE1NGgtMTUuNDAzYy0xLjEwOSwwLTIuMDA4LDAuODk4LTIuMDA4LDIuMDA4czAuODk4LDIuMDA4IDIuMDA4LDIuMDA4aDEwLjU1NmwtMjEuMjM4LDIxLjI0Yy0wLjc4NCwwLjc4NC0wLjc4NCwyLjA1NSAwLDIuODM5IDAuMzkyLDAuMzkyIDAuOTA2LDAuNTg5IDEuNDIsMC41ODlzMS4wMjctMC4xOTcgMS40MTktMC41ODlsMjEuMjM4LTIxLjI0djEwLjU1NWMwLDEuMTA4IDAuODk3LDIuMDA4IDIuMDA4LDIuMDA4IDEuMTA5LDAgMi4wMDgtMC44OTkgMi4wMDgtMi4wMDh2LTE1LjQwMmMwLTAuMjYxLTAuMDUzLTAuNTIyLTAuMTU1LTAuNzY3eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==)\n    }\n    .easyPrintHolder .page {\n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0NC44MzMgNDQ0LjgzMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgzMyA0NDQuODMzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTUuMjUsNDQ0LjgzM2gzMzQuMzMzYzkuMzUsMCwxNy03LjY1LDE3LTE3VjEzOS4xMTdjMC00LjgxNy0xLjk4My05LjM1LTUuMzgzLTEyLjQ2N0wyNjkuNzMzLDQuNTMzICAgIEMyNjYuNjE3LDEuNywyNjIuMzY3LDAsMjU4LjExNywwSDU1LjI1Yy05LjM1LDAtMTcsNy42NS0xNywxN3Y0MTAuODMzQzM4LjI1LDQzNy4xODMsNDUuOSw0NDQuODMzLDU1LjI1LDQ0NC44MzN6ICAgICBNMzcyLjU4MywxNDYuNDgzdjAuODVIMjU2LjQxN3YtMTA4LjhMMzcyLjU4MywxNDYuNDgzeiBNNzIuMjUsMzRoMTUwLjE2N3YxMzAuMzMzYzAsOS4zNSw3LjY1LDE3LDE3LDE3aDEzMy4xNjd2MjI5LjVINzIuMjVWMzR6ICAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);\n    }\n    .easyPrintHolder .A4Landscape { \n      transform: rotate(-90deg);\n    }\n\n    .leaflet-control-easyPrint-button{\n      display: inline-block;\n    }\n    .easyPrintHolder{\n      margin-top:-31px;\n      margin-bottom: -5px;\n      margin-left: 30px;\n      padding-left: 0px;\n      display: none;\n    }\n\n    .easyPrintSizeMode {\n      display: inline-block;\n    }\n    .easyPrintHolder .easyPrintSizeMode a {\n      border-radius: 0px;\n    }\n\n    .easyPrintHolder .easyPrintSizeMode:last-child a{\n      border-top-right-radius: 2px;\n      border-bottom-right-radius: 2px;\n      margin-left: -1px;\n    }\n\n    .easyPrintPortrait:hover, .easyPrintLandscape:hover{\n      background-color: #757570;\n      cursor: pointer;\n    }",document.body.appendChild(t)},_dataURItoBlob:function(t){for(var e=atob(t.split(",")[1]),n=t.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(e.length),o=new DataView(i),r=0;r<e.length;r++)o.setUint8(r,e.charCodeAt(r));return new Blob([i],{type:n})},_togglePageSizeButtons:function(t){var e=this.holder.style,n=this.link.style;"mouseover"===t.type?(e.display="block",n.borderTopRightRadius="0",n.borderBottomRightRadius="0"):(e.display="none",n.borderTopRightRadius="2px",n.borderBottomRightRadius="2px")},_toggleControls:function(t){var e=document.getElementsByClassName("leaflet-control-container")[0];if(t)return e.style.display="block";e.style.display="none"},_toggleClasses:function(t,e){t.forEach(function(t){var n=document.getElementsByClassName(t)[0];if(e)return n.style.display="block";n.style.display="none"})},_a4PageSize:{height:715,width:1045}}),L.easyPrint=function(t){return new L.Control.EasyPrint(t)}});


},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/leaflet/dist/leaflet.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./images\\layers.png":[["layers.833a3ad0.png","../node_modules/leaflet/dist/images/layers.png"],"../node_modules/leaflet/dist/images/layers.png"],"./images\\layers-2x.png":[["layers-2x.7859b0a7.png","../node_modules/leaflet/dist/images/layers-2x.png"],"../node_modules/leaflet/dist/images/layers-2x.png"],"./images\\marker-icon.png":[["marker-icon.28bcaf97.png","../node_modules/leaflet/dist/images/marker-icon.png"],"../node_modules/leaflet/dist/images/marker-icon.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../employmentDataJSON.json":[function(require,module,exports) {
module.exports = {
  "query": [{
    "code": "Alue",
    "selection": {
      "filter": "item",
      "values": ["SSS", "KU020", "KU005", "KU009", "KU010", "KU016", "KU018", "KU019", "KU035", "KU043", "KU046", "KU047", "KU049", "KU050", "KU051", "KU052", "KU060", "KU061", "KU062", "KU065", "KU069", "KU071", "KU072", "KU074", "KU075", "KU076", "KU077", "KU078", "KU079", "KU081", "KU082", "KU086", "KU111", "KU090", "KU091", "KU097", "KU098", "KU102", "KU103", "KU105", "KU106", "KU108", "KU109", "KU139", "KU140", "KU142", "KU143", "KU145", "KU146", "KU153", "KU148", "KU149", "KU151", "KU152", "KU165", "KU167", "KU169", "KU170", "KU171", "KU172", "KU176", "KU177", "KU178", "KU179", "KU181", "KU182", "KU186", "KU202", "KU204", "KU205", "KU208", "KU211", "KU213", "KU214", "KU216", "KU217", "KU218", "KU224", "KU226", "KU230", "KU231", "KU232", "KU233", "KU235", "KU236", "KU239", "KU240", "KU320", "KU241", "KU322", "KU244", "KU245", "KU249", "KU250", "KU256", "KU257", "KU260", "KU261", "KU263", "KU265", "KU271", "KU272", "KU273", "KU275", "KU276", "KU280", "KU284", "KU285", "KU286", "KU287", "KU288", "KU290", "KU291", "KU295", "KU297", "KU300", "KU301", "KU304", "KU305", "KU312", "KU316", "KU317", "KU318", "KU398", "KU399", "KU400", "KU407", "KU402", "KU403", "KU405", "KU408", "KU410", "KU416", "KU417", "KU418", "KU420", "KU421", "KU422", "KU423", "KU425", "KU426", "KU444", "KU430", "KU433", "KU434", "KU435", "KU436", "KU438", "KU440", "KU441", "KU475", "KU478", "KU480", "KU481", "KU483", "KU484", "KU489", "KU491", "KU494", "KU495", "KU498", "KU499", "KU500", "KU503", "KU504", "KU505", "KU508", "KU507", "KU529", "KU531", "KU535", "KU536", "KU538", "KU541", "KU543", "KU545", "KU560", "KU561", "KU562", "KU563", "KU564", "KU309", "KU576", "KU577", "KU578", "KU445", "KU580", "KU581", "KU599", "KU583", "KU854", "KU584", "KU588", "KU592", "KU593", "KU595", "KU598", "KU601", "KU604", "KU607", "KU608", "KU609", "KU611", "KU638", "KU614", "KU615", "KU616", "KU619", "KU620", "KU623", "KU624", "KU625", "KU626", "KU630", "KU631", "KU635", "KU636", "KU678", "KU710", "KU680", "KU681", "KU683", "KU684", "KU686", "KU687", "KU689", "KU691", "KU694", "KU697", "KU698", "KU700", "KU702", "KU704", "KU707", "KU729", "KU732", "KU734", "KU736", "KU790", "KU738", "KU739", "KU740", "KU742", "KU743", "KU746", "KU747", "KU748", "KU791", "KU749", "KU751", "KU753", "KU755", "KU758", "KU759", "KU761", "KU762", "KU765", "KU766", "KU768", "KU771", "KU777", "KU778", "KU781", "KU783", "KU831", "KU832", "KU833", "KU834", "KU837", "KU844", "KU845", "KU846", "KU848", "KU849", "KU850", "KU851", "KU853", "KU857", "KU858", "KU859", "KU886", "KU887", "KU889", "KU890", "KU892", "KU893", "KU895", "KU785", "KU905", "KU908", "KU092", "KU915", "KU918", "KU921", "KU922", "KU924", "KU925", "KU927", "KU931", "KU934", "KU935", "KU936", "KU941", "KU946", "KU976", "KU977", "KU980", "KU981", "KU989", "KU992"]
    }
  }, {
    "code": "Pääasiallinen toiminta",
    "selection": {
      "filter": "item",
      "values": ["11+12", "11", "12"]
    }
  }, {
    "code": "Sukupuoli",
    "selection": {
      "filter": "item",
      "values": ["SSS"]
    }
  }, {
    "code": "Ikä",
    "selection": {
      "filter": "item",
      "values": ["18-64"]
    }
  }, {
    "code": "Vuosi",
    "selection": {
      "filter": "item",
      "values": ["2015", "2016", "2017", "2018", "2019", "2020"]
    }
  }],
  "response": {
    "format": "json-stat2"
  }
};
},{}],"../populationJSON.json":[function(require,module,exports) {
module.exports = {
  "query": [{
    "code": "Vuosi",
    "selection": {
      "filter": "item",
      "values": ["2015", "2016", "2017", "2018", "2019", "2020"]
    }
  }, {
    "code": "Alue",
    "selection": {
      "filter": "item",
      "values": ["SSS", "KU020", "KU005", "KU009", "KU010", "KU016", "KU018", "KU019", "KU035", "KU043", "KU046", "KU047", "KU049", "KU050", "KU051", "KU052", "KU060", "KU061", "KU062", "KU065", "KU069", "KU071", "KU072", "KU074", "KU075", "KU076", "KU077", "KU078", "KU079", "KU081", "KU082", "KU086", "KU111", "KU090", "KU091", "KU097", "KU098", "KU102", "KU103", "KU105", "KU106", "KU108", "KU109", "KU139", "KU140", "KU142", "KU143", "KU145", "KU146", "KU153", "KU148", "KU149", "KU151", "KU152", "KU165", "KU167", "KU169", "KU170", "KU171", "KU172", "KU176", "KU177", "KU178", "KU179", "KU181", "KU182", "KU186", "KU202", "KU204", "KU205", "KU208", "KU211", "KU213", "KU214", "KU216", "KU217", "KU218", "KU224", "KU226", "KU230", "KU231", "KU232", "KU233", "KU235", "KU236", "KU239", "KU240", "KU320", "KU241", "KU322", "KU244", "KU245", "KU249", "KU250", "KU256", "KU257", "KU260", "KU261", "KU263", "KU265", "KU271", "KU272", "KU273", "KU275", "KU276", "KU280", "KU284", "KU285", "KU286", "KU287", "KU288", "KU290", "KU291", "KU295", "KU297", "KU300", "KU301", "KU304", "KU305", "KU312", "KU316", "KU317", "KU318", "KU398", "KU399", "KU400", "KU407", "KU402", "KU403", "KU405", "KU408", "KU410", "KU416", "KU417", "KU418", "KU420", "KU421", "KU422", "KU423", "KU425", "KU426", "KU444", "KU430", "KU433", "KU434", "KU435", "KU436", "KU438", "KU440", "KU441", "KU475", "KU478", "KU480", "KU481", "KU483", "KU484", "KU489", "KU491", "KU494", "KU495", "KU498", "KU499", "KU500", "KU503", "KU504", "KU505", "KU508", "KU507", "KU529", "KU531", "KU535", "KU536", "KU538", "KU541", "KU543", "KU545", "KU560", "KU561", "KU562", "KU563", "KU564", "KU309", "KU576", "KU577", "KU578", "KU445", "KU580", "KU581", "KU599", "KU583", "KU854", "KU584", "KU588", "KU592", "KU593", "KU595", "KU598", "KU601", "KU604", "KU607", "KU608", "KU609", "KU611", "KU638", "KU614", "KU615", "KU616", "KU619", "KU620", "KU623", "KU624", "KU625", "KU626", "KU630", "KU631", "KU635", "KU636", "KU678", "KU710", "KU680", "KU681", "KU683", "KU684", "KU686", "KU687", "KU689", "KU691", "KU694", "KU697", "KU698", "KU700", "KU702", "KU704", "KU707", "KU729", "KU732", "KU734", "KU736", "KU790", "KU738", "KU739", "KU740", "KU742", "KU743", "KU746", "KU747", "KU748", "KU791", "KU749", "KU751", "KU753", "KU755", "KU758", "KU759", "KU761", "KU762", "KU765", "KU766", "KU768", "KU771", "KU777", "KU778", "KU781", "KU783", "KU831", "KU832", "KU833", "KU834", "KU837", "KU844", "KU845", "KU846", "KU848", "KU849", "KU850", "KU851", "KU853", "KU857", "KU858", "KU859", "KU886", "KU887", "KU889", "KU890", "KU892", "KU893", "KU895", "KU785", "KU905", "KU908", "KU092", "KU915", "KU918", "KU921", "KU922", "KU924", "KU925", "KU927", "KU931", "KU934", "KU935", "KU936", "KU941", "KU946", "KU976", "KU977", "KU980", "KU981", "KU989", "KU992"]
    }
  }, {
    "code": "Tiedot",
    "selection": {
      "filter": "item",
      "values": ["vaesto"]
    }
  }],
  "response": {
    "format": "json-stat2"
  }
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _frappeChartsMin = require("frappe-charts/dist/frappe-charts.min.esm");
var _leaflet = _interopRequireDefault(require("../node_modules/leaflet/dist/leaflet.js"));
var _leafletEasyprint = _interopRequireDefault(require("leaflet-easyprint"));
require("../node_modules/leaflet/dist/leaflet.css");
var _employmentDataJSON = _interopRequireDefault(require("../employmentDataJSON.json"));
var _populationJSON = _interopRequireDefault(require("../populationJSON.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var url1, res1, dataJson1, url2, res2, dataJson2, url3, res3, dataJson3;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url1 = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
            _context.next = 3;
            return fetch(url1);
          case 3:
            res1 = _context.sent;
            _context.next = 6;
            return res1.json();
          case 6:
            dataJson1 = _context.sent;
            url2 = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
            _context.next = 10;
            return fetch(url2, {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(_populationJSON.default)
            });
          case 10:
            res2 = _context.sent;
            _context.next = 13;
            return res2.json();
          case 13:
            dataJson2 = _context.sent;
            url3 = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115b.px";
            _context.next = 17;
            return fetch(url3, {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(_employmentDataJSON.default)
            });
          case 17:
            res3 = _context.sent;
            _context.next = 20;
            return res3.json();
          case 20:
            dataJson3 = _context.sent;
            return _context.abrupt("return", [dataJson1, dataJson2, dataJson3]);
          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function fetchData() {
    return _ref.apply(this, arguments);
  };
}();
var calculateRate = function calculateRate(laborForce, unemployed, year) {
  /*Calculates unemploymenrate*/
  var index = year - 2015;
  var unemploymentRate = unemployed[index] / laborForce[index];
  return unemploymentRate;
};
var buildPopulationChart = function buildPopulationChart(population, name) {
  var check = population[0] - population[5];
  var color = "#a1e048";
  if (check > 0) {
    color = "#dd645e";
  }
  var dataset = [{
    name: "Population",
    values: population
  }];
  var chartData = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: dataset
  };
  var chart = new _frappeChartsMin.Chart("#chart", {
    title: "Population in ".concat(name, " by different years"),
    data: chartData,
    type: "line",
    height: 450,
    colors: [color]
  });
};
var buildUnemploymentChart = function buildUnemploymentChart(unemployed, employed, name) {
  var dataset = [{
    name: "Unemployed",
    values: unemployed
  }, {
    name: "Employed",
    values: employed
  }];
  var chartData = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: dataset
  };
  var chart = new _frappeChartsMin.Chart("#chart", {
    title: "Unemployment in ".concat(name, " by different years"),
    data: chartData,
    type: "bar",
    height: 450,
    colors: ['#dd645e', "#a1e048"]
  });
};
var overlayBtn = document.getElementById("close-chart"); /*hides the popup when button clicked*/
overlayBtn.addEventListener("click", function () {
  var overlay = document.getElementById("right-container");
  overlay.style.display = "none";
  document.getElementById("chart").remove();
});
var overlay = document.getElementById("right-container"); /* hides the popup when user clicks out of the chart*/
overlay.addEventListener("click", function (event) {
  if (event.target.classList[0] === "overlay") {
    var _overlay = document.getElementById("right-container");
    _overlay.style.display = "none";
    document.getElementById("chart").remove();
  }
});
var makePopulationDiv = function makePopulationDiv(populationlist, name, pop) {
  /*Creates popupDiv for population layer*/
  var newDiv = document.createElement("div");
  var nameh2 = document.createElement("h2");
  nameh2.innerText = name;
  newDiv.append(nameh2);
  var poph2 = document.createElement("h2");
  poph2.innerText = "Population: " + pop;
  newDiv.append(poph2);
  var button = document.createElement("button");
  button.innerText = "Show datachart";
  button.addEventListener("click", function () {
    var overlay = document.getElementById("right-container");
    overlay.style.display = "flex";
    var chartDiv = document.createElement("div");
    chartDiv.id = "chart";
    chartDiv.classList.add("chart");
    chartDiv.style.width = "300px";
    document.getElementById("overlay-wrapper").append(chartDiv);
    buildPopulationChart(populationlist.years, name, pop);
  });
  newDiv.append(button);
  return newDiv;
};
var makeEmploymentDiv = function makeEmploymentDiv(laborForce, employed, unemployed, year, name) {
  /*Creates popupDiv for employment layer*/
  var index = year - 2015;
  var newDiv = document.createElement("div");
  var nameh2 = document.createElement("h2");
  nameh2.innerText = name;
  newDiv.append(nameh2);
  var totEmp = document.createElement("h3");
  totEmp.innerText = "Total employment: ".concat(employed[index]);
  newDiv.append(totEmp);
  var totUnEmp = document.createElement("h3");
  totUnEmp.innerText = "Total unemployment: ".concat(unemployed[index]);
  newDiv.append(totUnEmp);
  var unempRate = document.createElement("h3");
  var unemploymentRate = calculateRate(laborForce, unemployed, year);
  unempRate.innerText = "Unemployment rate: ".concat(Math.round(unemploymentRate * 1000) / 10, "%");
  newDiv.append(unempRate);
  var button = document.createElement("button");
  button.innerText = "Show datachart";
  button.addEventListener("click", function () {
    var overlay = document.getElementById("right-container");
    overlay.style.display = "flex";
    var chartDiv = document.createElement("div");
    chartDiv.id = "chart";
    chartDiv.classList.add("chart");
    chartDiv.style.width = "300px";
    document.getElementById("overlay-wrapper").append(chartDiv);
    buildUnemploymentChart(unemployed, employed, name);
  });
  newDiv.append(button);
  return newDiv;
};
var initMap = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(year, showColor, layerChoice, firstInit) {
    var dataList, geoJsonResponse, populationJsonResponse, empDataRes, index, map, showCountryPop, showCountryEmp, populationgeoJson, employmentgeoJSON, osm, legend, _legend;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchData();
          case 2:
            dataList = _context2.sent;
            geoJsonResponse = dataList[0];
            populationJsonResponse = dataList[1];
            empDataRes = dataList[2];
            index = year - 2015;
            /* This is used to get the right data from the api results */
            map = _leaflet.default.map('map');
            if (firstInit === true) {
              /* This is for the show country population and employment buttons and only done on the first initialization of the map*/
              showCountryPop = document.getElementById("whole-country-pop");
              showCountryPop.addEventListener("click", function () {
                var allYearsPopulation = [populationJsonResponse.value[310 * 0], populationJsonResponse.value[310 * 1], populationJsonResponse.value[310 * 2], populationJsonResponse.value[310 * 3], populationJsonResponse.value[310 * 4], populationJsonResponse.value[310 * 5]];
                var overlay = document.getElementById("right-container");
                overlay.style.display = "flex";
                var chartDiv = document.createElement("div");
                chartDiv.id = "chart";
                chartDiv.classList.add("chart");
                chartDiv.style.width = "300px";
                document.getElementById("overlay-wrapper").append(chartDiv);
                buildPopulationChart(allYearsPopulation, "whole country");
              });
              showCountryEmp = document.getElementById("whole-country-emp");
              showCountryEmp.addEventListener("click", function () {
                var employmentData = empDataRes.value.slice(0, 18);
                var unemployed = employmentData.slice(12, 18);
                var employed = employmentData.slice(6, 12);
                var overlay = document.getElementById("right-container");
                overlay.style.display = "flex";
                var chartDiv = document.createElement("div");
                chartDiv.id = "chart";
                chartDiv.classList.add("chart");
                chartDiv.style.width = "300px";
                document.getElementById("overlay-wrapper").append(chartDiv);
                buildUnemploymentChart(unemployed, employed, "whole country");
              });
            }
            if (layerChoice === "population") {
              /*Population data layer*/
              populationgeoJson = _leaflet.default.geoJSON(geoJsonResponse, {
                onEachFeature: function onEachFeature(feature, layer) {
                  var munCode = "KU" + feature.properties.kunta;
                  var name = feature.properties.nimi;
                  var municipalityIndex = Object.keys(populationJsonResponse.dimension.Alue.category.label).indexOf(munCode);
                  var population = populationJsonResponse.value[municipalityIndex + 310 * index];
                  var allYearsPopulation = {
                    /*Gets the whole country population data*/
                    index: municipalityIndex,
                    years: [populationJsonResponse.value[municipalityIndex + 310 * 0], populationJsonResponse.value[municipalityIndex + 310 * 1], populationJsonResponse.value[municipalityIndex + 310 * 2], populationJsonResponse.value[municipalityIndex + 310 * 3], populationJsonResponse.value[municipalityIndex + 310 * 4], populationJsonResponse.value[municipalityIndex + 310 * 5]]
                  };
                  var totalPopulation = populationJsonResponse.value[0 + 310 * index];
                  var populationRate = population / totalPopulation;
                  var populationPercent = populationRate * 100 * 80;
                  if (showColor === true) {
                    if (populationPercent < 120) {
                      layer.setStyle({
                        color: "hsl(".concat(populationPercent, ", 55%, 50%")
                      });
                    } else {
                      layer.setStyle({
                        color: "hsl(120, 55%, 50%"
                      });
                    }
                  }
                  var newPopulationDiv = makePopulationDiv(allYearsPopulation, name, population);
                  layer.bindPopup(newPopulationDiv);
                  layer.bindTooltip("".concat(name, "<br>Population: ").concat(population));
                }
              }).addTo(map);
              map.fitBounds(populationgeoJson.getBounds());
            } else {
              /*Employment layer, which is the default also if no layer is chosen and in the start*/
              employmentgeoJSON = _leaflet.default.geoJSON(geoJsonResponse, {
                onEachFeature: function onEachFeature(feature, layer) {
                  var munCode = "KU" + feature.properties.kunta;
                  var name = feature.properties.nimi;
                  var municipalityIndex = Object.keys(populationJsonResponse.dimension.Alue.category.label).indexOf(munCode);
                  var employmentData = empDataRes.value.slice(municipalityIndex * 18, municipalityIndex * 18 + 18);
                  var laborForce = employmentData.slice(0, 6); /*list is 0-5 indexed and 0 is 2015 and 6 is 2020*/
                  var employed = employmentData.slice(6, 12);
                  var unemployed = employmentData.slice(12, 18);
                  var unemploymentRate = calculateRate(laborForce, unemployed, year);
                  var newDiv = makeEmploymentDiv(laborForce, employed, unemployed, year, name);
                  layer.bindPopup(newDiv);
                  layer.bindTooltip("".concat(name));
                  if (showColor === true) {
                    layer.setStyle({
                      color: "hsl(".concat(110 - unemploymentRate * 400, ", 90%, 40%")
                    });
                  }
                }
              }).addTo(map);
              map.fitBounds(employmentgeoJSON.getBounds());
            }
            osm = _leaflet.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            if (showColor === true) {
              /*Map legend creation but only if the color is shown*/
              if (layerChoice === "employment") {
                legend = _leaflet.default.control({
                  position: "bottomleft"
                });
                legend.onAdd = function (map) {
                  var div = _leaflet.default.DomUtil.create("div", "legend");
                  div.id = "legend";
                  div.innerHTML = "<h2>Unemployment-%</h2>";
                  div.innerHTML += "<h4>Green: Low unemployment</h4>";
                  div.innerHTML += "<h4>Orange: Medium unemployment</h4>";
                  div.innerHTML += "<h4>Red: High unemployment</h4>";
                  return div;
                };
                legend.addTo(map);
              } else if (layerChoice === "population") {
                _legend = _leaflet.default.control({
                  position: "bottomleft"
                });
                _legend.onAdd = function (map) {
                  var div = _leaflet.default.DomUtil.create("div", "legend");
                  div.id = "legend";
                  div.innerHTML = "<h2>Population density</h2>";
                  div.innerHTML += "<h4>Red: Not dense</h4>";
                  div.innerHTML += "<h4>Orange: Dense</h4>";
                  div.innerHTML += "<h4>Green: Very dense</h4>";
                  return div;
                };
                _legend.addTo(map);
              }
            }
            _leaflet.default.easyPrint({
              /* Downloading the png file is done with easyprint */
              title: "Save as a PNG",
              position: "topleft",
              sizeModes: ["A4Portrait", "A4Landscape"],
              exportOnly: true,
              hideControlContainer: true
            }).addTo(map);
          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function initMap(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  /* Gets the data from user input and calls the initmap after it with the user values */
  event.preventDefault();
  var yearList = document.getElementById("years");
  var year = yearList.value;
  var dataList = document.getElementById("data-option");
  var layer = dataList.value;
  var checkbox = document.getElementById("show-color");
  var check = checkbox.checked;
  document.getElementById("map").remove();
  var newMap = document.createElement("div");
  newMap.id = "map";
  document.getElementById("map-holder").append(newMap);
  initMap(year, check, layer, false);
});
initMap("2020", true, "employment", true);
},{"frappe-charts/dist/frappe-charts.min.esm":"../node_modules/frappe-charts/dist/frappe-charts.min.esm.js","../node_modules/leaflet/dist/leaflet.js":"../node_modules/leaflet/dist/leaflet.js","leaflet-easyprint":"../node_modules/leaflet-easyprint/dist/bundle.js","../node_modules/leaflet/dist/leaflet.css":"../node_modules/leaflet/dist/leaflet.css","../employmentDataJSON.json":"../employmentDataJSON.json","../populationJSON.json":"../populationJSON.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55423" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map