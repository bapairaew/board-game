'use strict';

var Log = require('./Log');

var stringFormat = require('../../utilities/stringFormat');
var FinancialLogType = require('../../constants/FinancialLogType');

function FinancialLog() {
  Log.call(this);
  this.type = 'FinancialLog';
}

// Inheritance
FinancialLog.prototype = Object.create(Log.prototype);


// AREN'T THESE VIEW LOGIC???

FinancialLog.prototype.toHTMLString = function () {
  switch (this.action) {
    case FinancialLogType.EARN:
      return stringFormat('{0} <span class="log-action text-success">earned from</span> {1}.', this.subject, this.object);
    case FinancialLogType.ROLL:
      return stringFormat('{0} <span class="log-action text-danger">rolled</span>.', this.subject, this.object);
    case FinancialLogType.BUY:
      return stringFormat('{0} <span class="log-action text-danger">bought</span> {1}.', this.subject, this.object);
    case FinancialLogType.LOSE:
      return stringFormat('{0} <span class="log-action text-danger">lose from</span> {1}.', this.subject, this.object);
    default:
      return stringFormat('{0} <span class="log-action">{1}</span> {2}.', this.subject, this.action, this.object);
  }
};

FinancialLog.prototype.getActionClass = function () {
  switch (this.action) {
    case FinancialLogType.EARN:
      return 'positive';
    case FinancialLogType.ROLL:
    case FinancialLogType.BUY:
    case FinancialLogType.LOSE:
      return 'negative';
    default:
      return 'neutral';
  }
};

module.exports = FinancialLog;
