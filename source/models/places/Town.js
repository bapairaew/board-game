'use strict';

var Place = require('./Place');

function Town() {
  Place.call(this);
  this.type = 'Town';
}

// Inheritance
Town.prototype = Object.create(Place.prototype);

Town.prototype.type = 'Town';

Town.prototype.income = null;

Town.prototype.update = function (town) {
  Place.prototype.update.call(this, town);
  this.income = town.income;
};

module.exports = Town;
