'use strict';

var Player = require('../../models/Player');

// For the
function PlayerClient() {
  Player.call(this);
}

// Inheritance
PlayerClient.prototype = Object.create(Player.prototype);

PlayerClient.prototype.isLoggedIn = false;

PlayerClient.prototype.isLoggingIn = false;

module.exports = PlayerClient;
