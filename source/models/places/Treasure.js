'use strict';

var Place = require('./Place');

var ItemParser = require('../items/ItemParser');

function Treasure() {
  Place.call(this);
  this.type = 'Treasure';
}

// Inheritance
Treasure.prototype = Object.create(Place.prototype);

// Items (and Effect later)
Treasure.prototype.contents = null;

Treasure.prototype.update = function (treasure) {
  Place.prototype.update.call(this, treasure);
  this.contents = ItemParser.parseMany(treasure.contents);
};

module.exports = Treasure;
