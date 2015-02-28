'use strict';

function within(val, min, max) {
  return val > min && val < max;
}

module.exports = within;
