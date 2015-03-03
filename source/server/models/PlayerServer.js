'use strict';

var Player = require('../../models/Player');
var Token = require('../../models/Token');

var Chance = require('chance');
var chance = new Chance();

var validateWalk = function () {
  // TODO: check if the walk is valid.
  return true;
};

var validateItem = function (item) {
  // TODO: check if the player owns this item.
  return true;
};

function PlayerServer() {
  Player.call(this);
}

// Inheritance
PlayerServer.prototype = Object.create(Player.prototype);

PlayerServer.prototype.roll = function () {
  if (this.coins > 0) {
    this.coins--;
    this.token = new Token();
    this.token.id = chance.guid();
    this.token.walks = chance.d6();
    return this.token;
  } else {
    throw 'Not Enough coins!';
  }
};

PlayerServer.prototype.walk = function (place, environment) {
  if (validateWalk()) {
    this.token = null;
    this.place = environment.getPlace(place);
    this.place.execute(this);
    return this.place;
  } else {
    throw 'Invalid walk path!';
  }
};

PlayerServer.prototype.use = function (item) {
  if (validateItem(item)) {
    var args = [this];
    Array.prototype.push.apply(args, arguments);
    return item.execute.apply(item, args);
  } else {
    throw 'You do not own this items!';
  }
};

module.exports = PlayerServer;
