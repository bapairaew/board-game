/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameGeneralPanel = React.createClass({
  render: function () {
    return (
      <div>
        <div className="game-panel-header">
          General
        </div>
        <div className="game-panel-content">
        </div>
      </div>
    );
  }
});

module.exports = GameGeneralPanel;
