'use strict';

var _ = require('underscore');

// TODO: Try using Object.create to replace _alternate
// NOTE: mixins: [Object.create(<MIXIN>)] did not work as the component was not updated
function alternateMixin(mixin, methods) {
  var _mixin = _.extend({}, mixin);
  (methods || []).forEach(function (method) {
    _mixin['_' + method] = _mixin[method];
    delete _mixin[method];
  });
  return _mixin;
}

module.exports = alternateMixin;
