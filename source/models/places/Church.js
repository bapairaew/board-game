'use strict';

var Cell = require('./Cell');

function Church() {
  Cell.call(this);
  this.type = 'Church';
}

// Inheritance
Church.prototype = Object.create(Cell.prototype);

module.exports = Church;
