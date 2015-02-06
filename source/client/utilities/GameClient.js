'use strict';

var io = require('socket.io-client');

var socket = null;

// Static class
var GameClient = {
  init: function (url) {
    socket = io(url);
  },
  on: function () {
    return socket.on.apply(socket, arguments);
  },
  emit: function () {
    return socket.emit.apply(socket, arguments);
  }
};

module.exports = GameClient;
