'use strict';

var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var EnvironmentClient = require('../models/EnvironmentClient');

var EnvironmentActionType = require('../../constants/EnvironmentActionType');
var RollActionType = require('../../constants/RollActionType');
var WalkActionType = require('../../constants/WalkActionType');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'ENVIRONMENT_CHANGE';

var environment = new EnvironmentClient();

var EnvironmentStore = _.extend({}, EventEmitter.prototype, {
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
    return environment;
  },

  dispatchToken: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case EnvironmentActionType.INITIALIZED:
        environment.update(action.environment);
        EnvironmentStore.emitChange();
        break;
      case EnvironmentActionType.ENVIRONMENT_PLAYER_CONNECTED:
      case EnvironmentActionType.ENVIRONMENT_PLAYER_DISCONNECTED:
      case RollActionType.ROLL_SUCCESS:
      case WalkActionType.WALK_SUCCESS:
        environment.updatePlayer(action.player);
        EnvironmentStore.emitChange();
        break;
    }

    return true;
  })
});

module.exports = EnvironmentStore;
