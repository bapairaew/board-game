'use strict';

var Entity = require('./Entity');
var Path = require('./Path');
var PlaceParser = require('./places/PlaceParser');

var mapEntity = require('../utilities/mapEntity');

function Map() {
  Entity.call(this);
  // TODO: WITHOUT THIS WILL CAUSE BUG IN REACT
  this.places = [];
  this.paths = [];
}

// Inheritance
Map.prototype = Object.create(Entity.prototype);

Map.prototype.places = [];

Map.prototype.paths = [];

Map.prototype.skin = null;

Map.prototype.width = null;

Map.prototype.height = null;

Map.prototype.update = function (map) {
  Entity.prototype.update.call(this, map);
  this.places = PlaceParser.parseMany(map.places);
  this.paths = mapEntity(map.paths, Path);
  this.skin = map.skin;
  this.width = map.width;
  this.height = map.height;
};

// Override
Map.prototype.publics = function () {
  return Entity.prototype.publics.call(this).concat(['places', 'paths', 'skin', 'width', 'height']);
};

module.exports = Map;
