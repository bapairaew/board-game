'use strict';

function restrictSize(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = restrictSize;
