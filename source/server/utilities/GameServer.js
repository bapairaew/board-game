'use strict';

var socketio = require('socket.io');

var EnvironmentActionType = require('../../constants/EnvironmentActionType');
var PlayerActionType = require('../../constants/PlayerActionType');
var RollActionType = require('../../constants/RollActionType');
var WalkActionType = require('../../constants/WalkActionType');

// TODO: remove this
var Mockup = require('./Mockup');

var GameServer = {
  host: function (http) {
    var io = socketio(http);
    var environment = Mockup.environment();

    io.on('connection', function (socket) {
      var player = Mockup.randomPlayer(environment);
      player.online = true;

      // TODO: modulize this
      // TODO: minimize interaction??

      socket.emit(PlayerActionType.INITIALIZED, player);
      socket.emit(EnvironmentActionType.INITIALIZED, environment.publicize(player));
      socket.broadcast.emit(EnvironmentActionType.ENVIRONMENT_PLAYER_CONNECTED, player.publicize());

      socket.on(RollActionType.ROLL, function () {
        try {
          player.roll();
          socket.emit(RollActionType.ROLL_SUCCESS, player);
          socket.broadcast.emit(RollActionType.ROLL_SUCCESS, player.publicize());
        } catch (ex) {
          socket.emit(RollActionType.ROLL_ERROR, ex);
        }
      });

      // TODO: duplicate code
      socket.on(WalkActionType.WALK, function (place) {
        try {
          player.walk(place, environment);
          socket.emit(WalkActionType.WALK_SUCCESS, player);
          socket.broadcast.emit(WalkActionType.WALK_SUCCESS, player.publicize());
        } catch (ex) {
          socket.emit(WalkActionType.WALK_ERROR, ex);
        }
      });

      socket.on('disconnect', function () {
        player.online = false;
        socket.broadcast.emit(EnvironmentActionType.ENVIRONMENT_PLAYER_DISCONNECTED, player.publicize());
      });
    });

    return io;
  }
};

module.exports = GameServer;
