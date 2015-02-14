'use strict';

var Cell = require('../../../models/places/Cell');

function CellServer() {
  Cell.call(this);
}

// Inheritance
CellServer.prototype = Object.create(Cell.prototype);

CellServer.prototype.execute = function (player) {
  // TODO:
  // If there is any player here, attack him.
  // Execute cell.
  return true;
};

module.exports = CellServer;
