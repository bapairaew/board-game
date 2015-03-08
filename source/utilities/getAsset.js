'use strict';

var stringFormat = require('./stringFormat');

function getAsset(item, extension) {
  return stringFormat('/assets/{0}.{1}', item, (extension || 'png'));
}

module.exports = getAsset;
