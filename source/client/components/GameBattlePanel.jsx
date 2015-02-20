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
            <li className="list-group-item game-panel-status-list buff">
              <div className="game-skill reality"></div>
              <div className="game-skill synergy"></div>
              <div className="game-skill primal-spirit"></div>
            </li>
            <li className="list-group-item game-panel-status-list debuff">
              <div className="game-skill forst-bite"></div>
              <div className="game-skill battle-hunger"></div>
              <div className="game-skill rot"></div>
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
