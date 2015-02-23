'use strict';

var Log = require('./Log');

function FinancialLog() {
  Log.call(this);
  this.type = 'FinancialLog';
}

// Inheritance
FinancialLog.prototype = Object.create(Log.prototype);

// Actions:
// buy
// roll
// gain
// lose

FinancialLog.prototype.update = function (log) {
  Log.prototype.update.call(this, log);
};

module.exports = FinancialLog;
