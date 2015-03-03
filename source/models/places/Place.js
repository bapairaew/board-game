'use strict';

var Entity = require('../Entity');
var Position = require('../Position');

function Place() {
  Entity.call(this);
  this.type = 'Place';
}

// Inheritance
Place.prototype = Object.create(Entity.prototype);

// For serialization
Place.prototype.type = null;

Place.prototype.name = null;

Place.prototype.thumbnail = null;

Place.prototype.skin = null;

Place.prototype.position = null;

Place.prototype.toString = function () {
  return this.type + ' ' + this.name + ' - ' + (this.position && this.position.toString());
};

Place.prototype.update = function (place) {
  Entity.prototype.update.call(this, place);
  this.type = place.type;
  this.name = place.name;
  this.thumbnail = place.thumbnail;
  this.skin = place.skin;
  this.position = new Position();
  this.position.update(place.position);
};

module.exports = Place;
