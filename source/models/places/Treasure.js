'use strict';

var Cell = require('./Cell');

var ItemParser = require('../items/ItemParser');

function Treasure() {
  Cell.call(this);
  this.type = 'Treasure';
}

// Inheritance
Treasure.prototype = Object.create(Cell.prototype);

// Items (and Effect later)
Treasure.prototype.contents = null;

Treasure.prototype.update = function (treasure) {
  Cell.prototype.update.call(this, treasure);
  this.contents = ItemParser.parseMany(treasure.contents);
};

module.exports = Treasure;
