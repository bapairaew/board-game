'use strict';

var Creature = require('./Creature');
var Token = require('./Token');
var Cell = require('./places/Cell');

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

Player.prototype.cell = null;

Player.prototype.online = null;

Player.prototype.items = [];

Player.prototype.toString = function () {
  return stringFormat('{0}', this.name);
};

Player.prototype.update = function (player) {
  Creature.prototype.update.call(this, player);
  this.name = player.name;
  this.coins = player.coins;
  this.online = player.online;
  this.items = ItemParser.parseMany(player.items);
  enitityUpdate(this, 'token', player.token, Token);
  enitityUpdate(this, 'cell', player.cell, Cell);
};

// Override
Player.prototype.publics = function () {
  return Creature.prototype.publics.call(this).concat(['name', 'coins', 'token', 'cell', 'online', 'items']);
};

module.exports = Player;
