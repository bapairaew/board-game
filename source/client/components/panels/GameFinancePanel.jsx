/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;

// TO BE REMOVED
var Chance = require('Chance');
var chance = new Chance();
var FinancialLog = require('../../../models/logs/FinancialLog');
var FinancialLogType = require('../../../constants/FinancialLogType');

var joinClasses = require('../../../utilities/joinClasses');
var getLogElements = require('../../../utilities/getLogElements.jsx');

var GameFinancePanel = React.createClass({
  render: function () {
    var weekSummary = -100;
    var passiveIncome = 100;

    var weekSummaryClasses = classSet({
      'positive-block': weekSummary >= 0,
      'negative-block': weekSummary < 0
    });

    var passiveIncomeClasses = classSet({
      'positive-block': passiveIncome >= 0,
      'negative-block': passiveIncome < 0
    });

    // TO BE REMOVED
    var mockUpLog = function () {
      var log = new FinancialLog();
      log.subject = chance.name();
      log.action = FinancialLogType[chance.pick(Object.keys(FinancialLogType))];
      log.object = chance.name();
      return log;
    };

    var logs = chance.n(chance.integer, 20).map(function () { return mockUpLog(); });

    return (
      <div>
        <div className="game-panel-header summary-header">
          Finance
        </div>
        <div className="game-panel-content summary-content">
          <ul className="list-group no-margin">
            <li className="list-group-item inner-padding financial-block">
              <span className="financial-title">
                Week Summary:
              </span>
              <span className={ joinClasses(weekSummaryClasses, 'financial-figure pull-right') }>
                { weekSummary }
              </span>
            </li>
            <li className="list-group-item inner-padding financial-block">
              <span className="financial-title">
                Passive Income:
              </span>
              <span className={ joinClasses(passiveIncomeClasses, 'financial-figure pull-right') }>
                { passiveIncome }
              </span>
            </li>
          </ul>
        </div>
        <div className="game-panel-header details-header">
          Financial Log
        </div>
        <div className="game-panel-content details-content">
          <ul className="list-group no-margin">
            { getLogElements(logs) }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = GameFinancePanel;
