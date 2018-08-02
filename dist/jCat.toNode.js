(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}
			var jCat = g['jCat'] !== null && typeof g['jCat'] !== 'object' ? (g['jCat'] = {}) : g['jCat'];
			var _f = f();
			for(var i in _f) if(_f.hasOwnProperty(i)) jCat[i] = _f[i];
		}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;

function init() {
  var elementProto = Element.prototype,
      nodeProto = Node.prototype;
  var proxyMap = [{
    proto: elementProto,
    method: 'after',
    handleParams: '*'
  }, {
    proto: elementProto,
    method: 'append',
    handleParams: '*'
  }, {
    proto: nodeProto,
    method: 'appendChild',
    handleParams: [0]
  }, {
    proto: elementProto,
    method: 'before',
    handleParams: '*'
  }, {
    proto: nodeProto,
    method: 'contains',
    handleParams: [0]
  }, {
    proto: nodeProto,
    method: 'insertBefore',
    handleParams: [0, 1]
  }, {
    proto: elementProto,
    method: 'prepend',
    handleParams: '*'
  }, {
    proto: nodeProto,
    method: 'removeChild',
    handleParams: [0]
  }, {
    proto: nodeProto,
    method: 'replaceChild',
    handleParams: [0, 1]
  }, {
    proto: elementProto,
    method: 'replaceWith',
    handleParams: '*'
  }];
  proxyMap.forEach(function (_ref) {
    var proto = _ref.proto,
        method = _ref.method,
        handleParams = _ref.handleParams;
    return proxyMethod(proto, method, handleParams);
  });
}

function getParamsHandler(originMethod, indexes) {
  var indexesObject = null;

  if (indexes !== '*') {
    if (!Array.isArray(indexes)) {
      throw new Error('');
    }

    indexesObject = {};
    indexes.forEach(function (item) {
      return indexesObject[item] = true;
    });
  }

  return function () {
    for (var i = 0; i !== arguments.length; i++) {
      var item = arguments[i];

      if (item != null && (indexesObject === null || i in indexesObject) && !(item instanceof Node) && typeof item.toNode === 'function') {
        arguments[i] = item.toNode();
      }
    }

    return originMethod.apply(this, arguments);
  };
}

function proxyMethod(proto, method, handleParams) {
  var originMethod = proto[method];

  if (typeof originMethod === 'function') {
    proto[method] = getParamsHandler(originMethod, handleParams);
  }
}

init();
var handler = proxyMethod;
exports.handler = handler;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNode = void 0;

var toNode = _interopRequireWildcard(require("./src/toNode"));

exports.toNode = toNode;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

},{"./src/toNode":1}]},{},[2])(2)
});
