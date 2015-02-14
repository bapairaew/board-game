'use strict';

var Effect = require('../../models/Effect');

function EffectServer() {
  Effect.call(this);
}

// Inheritance
EffectServer.prototype = Object.create(Effect.prototype);

EffectServer.prototype.execute = function (player) {
  // TODO:
  // If there is any player here, attack him.
  // If there is any cell here, do its execution.
  return true;
};

module.exports = EffectServer;
