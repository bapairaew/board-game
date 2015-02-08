'use strict';

var GameClient = require('../utilities/GameClient');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var RollActionType = require('../../constants/RollActionType');

var handleRollSuccess = function (player) {
  AppDispatcher.handleServerAction({
    actionType: RollActionType.ROLL_SUCCESS,
    player: player
  });
};

var handleRollError = function (ex) {
  AppDispatcher.handleServerAction({
    actionType: RollActionType.ROLL_ERROR,
    expection: ex
  });
};

var RollAction = {
  listen: function () {
    GameClient.on(RollActionType.ROLL_SUCCESS, handleRollSuccess);
    GameClient.on(RollActionType.ROLL_ERROR, handleRollError);
  },
  roll: function () {
    GameClient.emit(RollActionType.ROLL);
    AppDispatcher.handleViewAction({
      actionType: RollActionType.ROLL
    });
  }
};

module.exports = RollAction;
