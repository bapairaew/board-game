'use strict';

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var PlayerActionType = require('../../constants/PlayerActionType');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'PLAYER_CHANGE';

var player = {
  id: null,
  coins: null,
  token: null,
  position: null
};

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
        _.extend(player, action.player);
        PlayerStore.emitChange();
        break;
    };

    return true;
  })
});

module.exports = PlayerStore;
