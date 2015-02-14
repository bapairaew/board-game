'use strict';

var Cell = require('./Cell');

function Church() {
  Cell.call(this);
  this.type = 'Church';
}

// Inheritance
Church.prototype = Object.create(Cell.prototype);

Church.prototype.update = function (church) {
  Cell.prototype.update.call(this, church);
};

module.exports = Church;
