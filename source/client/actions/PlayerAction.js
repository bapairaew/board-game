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
  },
  login: function () {
    AppDispatcher.handleViewAction({
      actionType: PlayerActionType.LOGIN
    });

    setTimeout(function () {
      AppDispatcher.handleServerAction({
        actionType: PlayerActionType.LOGIN_SUCCESS
      });
    }, 1000);
  }
};

module.exports = PlayerAction;
