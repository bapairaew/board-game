'use strict';

var Creature = require('./Creature');
var Token = require('./Token');
var Place = require('./places/Place');

var ItemParser = require('./items/ItemParser');

var stringFormat = require('../utilities/stringFormat');
var enitityUpdate = require('../utilities/enitityUpdate');

function Player() {
  Creature.call(this);
}

// Inheritance
Player.prototype = Object.create(Creature.prototype);

Player.prototype.name = null;

Player.prototype.coins = null;

Player.prototype.token = null;

Player.prototype.place = null;

Player.prototype.online = null;

Player.prototype.items = [];

Player.prototype.rank = null;

Player.prototype.hours = null;

Player.prototype.battleLogs = [];

Player.prototype.financialLogs = [];

Player.prototype.toString = function () {
  return stringFormat('{0}', this.name);
};

Player.prototype.update = function (player) {
  Creature.prototype.update.call(this, player);
  this.name = player.name;
  this.coins = player.coins;
  this.online = player.online;
  this.items = ItemParser.parseMany(player.items);
  this.rank = player.rank;
  this.hours = player.hours;
  enitityUpdate(this, 'token', player.token, Token);
  enitityUpdate(this, 'place', player.place, Place);
};

// Override
Player.prototype.publics = function () {
  return Creature.prototype.publics.call(this).concat(['name', 'coins', 'token', 'place', 'online', 'items',
    'battleLogs', 'financialLogs']);
};

module.exports = Player;
