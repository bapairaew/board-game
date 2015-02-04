'use strict';

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Player = require('../../models/Player');

var PlayerActionType = require('../../constants/PlayerActionType');
var RollActionType = require('../../constants/RollActionType');
var WalkActionType = require('../../constants/WalkActionType');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'PLAYER_CHANGE';

var player = new Player();

var PlayerStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function () {
    return player;
  },

  dispatchToken: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case PlayerActionType.INITIALIZED:
      case PlayerActionType.UPDATED:
        player.update(action.player);
        PlayerStore.emitChange();
        break;
      case RollActionType.ROLL_SUCCESS:
      case WalkActionType.WALK_SUCCESS:
        if (player.id === action.player.id) {
          player.update(action.player);
          PlayerStore.emitChange();
        }
        break;
    }

    return true;
  })
});

module.exports = PlayerStore;
