'use strict';

var Place = require('./Place');

var enitityUpdate = require('../../utilities/enitityUpdate');

function Portal() {
  Place.call(this);
  this.type = 'Portal';
}

// Inheritance
Portal.prototype = Object.create(Place.prototype);

Portal.prototype.destination = null;

Portal.prototype.update = function (portal) {
  Place.prototype.update.call(this, portal);
  enitityUpdate(this, 'destination', portal.destination, Place);
};

module.exports = Portal;
