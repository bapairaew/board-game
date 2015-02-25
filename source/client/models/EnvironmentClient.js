'use strict';

var Environment = require('../../models/Environment');
var Player = require('../../models/Player');

var findWithAttr = require('../../utilities/findWithAttr');

function EnvironmentClient() {
  Environment.call(this);

  // TODO: INVESTIGATE WHY this.logs = []; is not required here.
  // this.logs = [];
}

// Inheritance
EnvironmentClient.prototype = Object.create(Environment.prototype);

EnvironmentClient.prototype.addPlayer = function (player) {
  var _player = new Player();
  _player.update(player);
  this.players.push(_player);
};

EnvironmentClient.prototype.removePlayer = function (player) {
  var idx = findWithAttr(this.players, 'id', player.id);
  if (idx > -1) {
    this.players.splice(idx, 1);
  }
};

EnvironmentClient.prototype.updatePlayer = function (player) {
  var idx = findWithAttr(this.players, 'id', player.id);
  if (idx > -1) {
    this.players[idx].update(player);
  }
};

module.exports = EnvironmentClient;
