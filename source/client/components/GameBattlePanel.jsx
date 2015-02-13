/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameBattlePanel = React.createClass({
  render: function () {
    return (
      <div>
        <div className="game-panel-header">
          Battle Log
        </div>
        <div className="game-panel-content">
          <ul className="list-group">
            <li className="list-group-item">Attack someone.</li>
            <li className="list-group-item">Someone attack.</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = GameBattlePanel;
