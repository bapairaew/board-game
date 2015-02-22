/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;

var joinClasses = require('../../utilities/joinClasses');

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
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = GameFinancePanel;
