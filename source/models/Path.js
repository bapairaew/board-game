'use strict';

var Entity = require('./Entity');
var Place = require('./places/Place');

var enitityUpdate = require('../utilities/enitityUpdate');

function Path() {
  Entity.call(this);
}

Path.prototype.exit1 = null;

Path.prototype.exit2 = null;

Path.prototype.update = function (path) {
  Entity.prototype.update.call(this, path);
  enitityUpdate(this, 'exit1', path.exit1, Place);
  enitityUpdate(this, 'exit2', path.exit2, Place);
};

module.exports = Path;
