'use strict';

var Entity = require('../Entity');
var Position = require('../Position');

function Cell() {
  Entity.call(this);
  this.type = 'Cell';
}

// Inheritance
Cell.prototype = Object.create(Entity.prototype);

// For serialization
Cell.prototype.type = null;

Cell.prototype.name = null;

Cell.prototype.thumbnail = null;

Cell.prototype.skin = null;

Cell.prototype.position = null;

Cell.prototype.toString = function () {
  return this.type + ' ' + this.name + ' - ' + (this.position && this.position.toString());
};

Cell.prototype.update = function (cell) {
  Entity.prototype.update.call(this, cell);
  this.type = cell.type;
  this.name = cell.name;
  this.thumbnail = cell.thumbnail;
  this.skin = cell.skin;
  this.position = new Position();
  this.position.update(cell.position);
};

module.exports = Cell;
