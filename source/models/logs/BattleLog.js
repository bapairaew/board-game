'use strict';

var Log = require('./Log');

var stringFormat = require('../../utilities/stringFormat');
var BattleLogType = require('../../constants/BattleLogType');

function BattleLog() {
  Log.call(this);
  this.type = 'BattleLog';
}

// Inheritance
BattleLog.prototype = Object.create(Log.prototype);

// Actions:
// attack
// be attacked
// buff activate
// debuff activate
// buff expired
// debuff expired
// died
// respawn

BattleLog.prototype.toHTMLString = function () {
  switch (this.action) {
    case BattleLogType.ATTACK:
      return stringFormat('{0} <span class="log-action text-info">attacked</span> {1}.', this.subject, this.object);
    case BattleLogType.BE_ATTACKED:
      return stringFormat('{0} <span class="log-action text-danger">attacked</span> {1}.', this.subject, this.object);
    case BattleLogType.BUFF_ACTIVATE:
      return stringFormat('{0} <span class="log-action text-success">activated</span> {1}.', this.subject, this.object);
    case BattleLogType.DEBUFF_ACTIVATE:
      return stringFormat('{0} <span class="log-action text-danger">activated</span> {1}.', this.subject, this.object);
    case BattleLogType.BUFF_EXPIRED:
    case BattleLogType.DEBUFF_EXPIRED:
      return stringFormat('{0} <span class="log-action text-info">expired</span>.', this.object);
    case BattleLogType.RESPAWN:
      return stringFormat('{0} <span class="log-action text-success">respawned</span>.', this.subject);
    case BattleLogType.DIED:
      return stringFormat('{0} <span class="log-action text-danger">died</span>.', this.subject);
    default:
      return stringFormat('{0} <span class="log-action">{1}</span> {2}.', this.subject, this.action, this.object);
  }

  return stringFormat('{0} <span class="log-action {1}">{2}</span> {3}',
    this.subject, this.getActionClass(), this.action, this.object);
};

BattleLog.prototype.getHTMLSymbol = function () {
  switch (this.action) {
    case BattleLogType.ATTACK:
      return '<div class="fa fa-bolt"></div>';
    case BattleLogType.BE_ATTACKED:
      return '<div class="fa fa-shield"></div>';
    case BattleLogType.BUFF_ACTIVATE:
      return '<div class="fa fa-star"></div>';
    case BattleLogType.DEBUFF_ACTIVATE:
      return '<div class="fa fa-heartbeat"></div>';
    case BattleLogType.BUFF_EXPIRED:
      return '<div class="fa fa-star-o"></div>';
    case BattleLogType.DEBUFF_EXPIRED:
      return '<div class="fa fa-heart-o"></div>';
    case BattleLogType.RESPAWN:
      return '<div class="fa fa-user"></div>';
    case BattleLogType.DIED:
      return '<div class="fa fa-truck"></div>';
    default:
      return '<div class="fa fa-question"></div>';
  }
};

BattleLog.prototype.getActionClass = function () {
  switch (this.action) {
    case BattleLogType.BUFF_ACTIVATE:
    case BattleLogType.RESPAWN:
      return 'positive-block';
    case BattleLogType.BE_ATTACKED:
    case BattleLogType.DEBUFF_ACTIVATE:
    case BattleLogType.DIED:
      return 'negative-block';
    case BattleLogType.ATTACK:
    case BattleLogType.BUFF_EXPIRED:
    case BattleLogType.DEBUFF_EXPIRED:
    default:
      return 'neutral-block';
  }
};

BattleLog.prototype.update = function (log) {
  Log.prototype.update.call(this, log);
};

module.exports = BattleLog;
