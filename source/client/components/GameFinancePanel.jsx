/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameFinancePanel = React.createClass({
  render: function () {
    return (
      <div>
        <div className="game-panel-header">
          Finance
        </div>
        <div className="game-panel-content">
        </div>
      </div>
    );
  }
});

module.exports = GameFinancePanel;
