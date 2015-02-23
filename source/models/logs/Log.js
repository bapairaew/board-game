'use strict';

var Entity = require('../Entity');

var stringFormat = require('../../utilities/stringFormat');

function Log() {
  Entity.call(this);
}

// Inheritance
Log.prototype = Object.create(Entity.prototype);

// For serialization
// Battle / Financial
Log.prototype.type = null;

Log.prototype.subject = null;

Log.prototype.object = null;

Log.prototype.action = null;

Log.prototype.timestamp = null;

Log.prototype.toString = function () {
  // TODO: this.subject.name?? this.object.name??
  return stringFormat('{0} {1} {2}', this.subject, this.action, this.object);
};

Log.prototype.getSymbolClasses = function () {
  return stringFormat('log-symbol {0}', this.getActionClass());
};

// TO BE OVERRIDDEN
Log.prototype.toHTMLString = function () {
  // TODO: HTML
  return stringFormat('{0} <span class="log-action {1}">{2}</span> {3}',
    this.subject, this.getActionClass(), this.action, this.object);
};

// TO BE OVERRIDDEN
Log.prototype.getHTMLSymbol = function () {
  return '<div />';
};

// TO BE OVERRIDDEN
Log.prototype.getActionClass = function () {
  return '';
};

Log.prototype.update = function (log) {
  Entity.prototype.update.call(this, log);
  this.type = log.type;
  this.timestamp = log.timestamp;
};

module.exports = Log;
