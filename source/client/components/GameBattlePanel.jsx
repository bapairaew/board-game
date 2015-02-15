/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameBattlePanel = React.createClass({
  render: function () {
    return (
      <div>
        <div className="game-panel-header summary-header">
          Status
        </div>
        <div className="game-panel-content summary-content">
          <ul className="list-group no-margin">
            <li className="list-group-item game-panel-status-list">
              <div className="game-object empower"></div>
              <div className="game-object attack-up"></div>
              <div className="game-object defense-up"></div>
              <div className="game-object speed-up"></div>
            </li>
            <li className="list-group-item game-panel-status-list">
              <div className="game-object stoned"></div>
              <div className="game-object unfortuned"></div>
            </li>
          </ul>
        </div>
        <div className="game-panel-header details-header">
          Battle Log
        </div>
        <div className="game-panel-content details-content">
          <ul className="list-group no-margin">
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = GameBattlePanel;
