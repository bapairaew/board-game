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
        </div>
      </div>
    );
  }
});

module.exports = GameBattlePanel;
