/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

// TO BE REMOVED
var Chance = require('Chance');
var chance = new Chance();
var BattleLog = require('../../models/logs/BattleLog');
var BattleLogType = require('../../constants/BattleLogType');

var joinClasses = require('../../utilities/joinClasses');
var getLogElements = require('../../utilities/getLogElements.jsx');

var GameBattlePanel = React.createClass({
  render: function () {
    var buffs = [
      'primal-spirit',
      'synergy',
      'reality'
    ];

    var debuffs = [
      'forst-bite',
      'battle-hunger',
      'rot'
    ];

    // TO BE REMOVED
    var mockUpLog = function () {
      var log = new BattleLog();
      log.subject = chance.name();
      log.action = BattleLogType[chance.pick(Object.keys(BattleLogType))];
      log.object = chance.name();
      return log;
    };

    var logs = chance.n(chance.integer, 20).map(function () { return mockUpLog(); });

    var getStatusElements = function (statues) {
      return statues.map(function (status) {
        return (
          <div key={ status } className={ joinClasses(status, 'game-skill') } />
        );
      });
    };

    return (
      <div>
        <div className="game-panel-header summary-header">
          Status
        </div>
        <div className="game-panel-content summary-content">
          <ul className="list-group no-margin">
            <li className="list-group-item game-panel-status-list buff">
              { getStatusElements(buffs) }
            </li>
            <li className="list-group-item game-panel-status-list debuff">
              { getStatusElements(debuffs) }
            </li>
          </ul>
        </div>
        <div className="game-panel-header details-header">
          Battle Log
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

module.exports = GameBattlePanel;
