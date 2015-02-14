'use strict';

var Cell = require('./Cell');

var enitityUpdate = require('../../utilities/enitityUpdate');

function Portal() {
  Cell.call(this);
  this.type = 'Portal';
}

// Inheritance
Portal.prototype = Object.create(Cell.prototype);

Portal.prototype.destination = null;

Portal.prototype.update = function (portal) {
  Cell.prototype.update.call(this, portal);
  enitityUpdate(this, 'destination', portal.destination, Cell);
};

module.exports = Portal;
