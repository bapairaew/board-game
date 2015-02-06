'use strict';

var GameClient = require('../utilities/GameClient');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var WalkActionType = require('../../constants/WalkActionType');

var handleWalkSuccess = function (player) {
  AppDispatcher.handleServerAction({
    actionType: WalkActionType.WALK_SUCCESS,
    player: player
  });
};

var handleWalkError = function (ex) {
  AppDispatcher.handleServerAction({
    actionType: WalkActionType.WALK_ERROR,
    expection: ex
  });
};

var WalkAction = {
  listen: function () {
    GameClient.on(WalkActionType.WALK_SUCCESS, handleWalkSuccess);
    GameClient.on(WalkActionType.WALK_ERROR, handleWalkError);
  },
  walk: function (position) {
    GameClient.emit(WalkActionType.WALK, position);
    AppDispatcher.handleServerAction({
      actionType: WalkActionType.WALK
    });
  }
};

module.exports = WalkAction;
