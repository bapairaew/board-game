'use strict';

var Environment = require('../../models/Environment');

var PlaceServer = require('./places/PlaceServer');

function EnvironmentServer() {
  Environment.call(this);
}

// Inheritance
EnvironmentServer.prototype = Object.create(Environment.prototype);

EnvironmentServer.prototype.items = [];

EnvironmentServer.prototype.effects = [];

EnvironmentServer.prototype.addPlayer = function (player) {
  var index = this.players.indexOf(player);
  if (index === -1) {
    this.players.push(player);
  }
};

EnvironmentServer.prototype.removePlayer = function (player) {
  var index = this.players.indexOf(player);
  if (index !== -1) {
    this.players.splice(index, 1);
  }
};

EnvironmentServer.prototype.getPlace = function (place) {
  // TODO: search for place in maps
  var _place = new PlaceServer();
  _place.update(place);
  return _place;
};

// Override
EnvironmentServer.prototype.publicize = function (player) {
  return {
    players: this.players.filter(function (_player) {
      return _player !== player;
    }).map(function (_player) {
      return _player.publicize();
    }),
    maps: this.maps
  };
};

module.exports = EnvironmentServer;
