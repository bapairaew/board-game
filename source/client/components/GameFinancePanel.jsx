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
          <ul className="list-group">
            <li className="list-group-item">Earn 1 coin from something.</li>
            <li className="list-group-item">Loss 2 coins for something.</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = GameFinancePanel;
