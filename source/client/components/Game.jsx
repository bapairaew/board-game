/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameMixin = require('../mixins/GameMixin');

var GameClient = require('../utilities/GameClient');

var EnvironmentAction = require('../actions/EnvironmentAction');
var PlayerAction = require('../actions/PlayerAction');
var RollAction = require('../actions/RollAction');
var WalkAction = require('../actions/WalkAction');

var Game = React.createClass({
  mixins: [GameMixin],

  render: function () {
    var avatarStyle = {
      'backgroundImage': 'url(//lh3.googleusercontent.com/-Y86IN-vEObo/AAAAAAAAAAI/AAAAAAADO1I/QzjOGHq5kNQ/s120-c/photo.jpg)'
    };

    var progressBarStyle = {
      'width': '60%'
    };

    return (
      <div>
        <div className="game-toolbar">
          <div className="btn-group">
            <button className="btn btn-default game-hp-bar-container">
              <div className="progress">
                <div className="progress-bar" style={ progressBarStyle }></div>
              </div>
            </button>
            <button className="btn btn-default">Coins: 10</button>
            <button className="btn btn-default btn-avatar" style={ avatarStyle }></button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Game;
