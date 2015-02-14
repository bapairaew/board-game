'use strict';

var Cell = require('./Cell');

function Town() {
  Cell.call(this);
  this.type = 'Town';
}

// Inheritance
Town.prototype = Object.create(Cell.prototype);

Town.prototype.type = 'Town';

Town.prototype.income = null;

Town.prototype.update = function (town) {
  Cell.prototype.update.call(this, town);
  this.income = town.income;
};

module.exports = Town;
