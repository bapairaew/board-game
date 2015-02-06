'use strict';

var GameClient = require('../utilities/GameClient');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerActionType = require('../../constants/PlayerActionType');

var handlePlayerInitialized = function (player) {
  AppDispatcher.handleServerAction({
    actionType: PlayerActionType.INITIALIZED,
    player: player
  });
};

var handlePlayerUpdated = function (player) {
  AppDispatcher.handleServerAction({
    actionType: PlayerActionType.UPDATED,
    player: player
  });
};

var PlayerAction = {
  listen: function () {
    GameClient.on(PlayerActionType.INITIALIZED, handlePlayerInitialized);
    GameClient.on(PlayerActionType.UPDATED, handlePlayerUpdated);
  }
};

module.exports = PlayerAction;
