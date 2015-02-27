'use strict';

var _ = require('underscore');

function alternateMixin(mixin, methods) {
  var _mixin = _.extend({}, mixin);
  (methods || []).forEach(function (method) {
    _mixin['_' + method] = _mixin[method];
    delete _mixin[method];
  });
  return _mixin;
}

module.exports = alternateMixin;
