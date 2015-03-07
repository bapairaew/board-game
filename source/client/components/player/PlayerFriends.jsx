/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');

var GameMixin = require('../../mixins/GameMixin');

var PlayerFriends = React.createClass({
  mixins: [GameMixin],

  sortPlayers: function (a, b) {
    return a.online ? -1 : 1;
  },

  getPlayerElements: function (players) {
    return players.map(function (player) {
      var playerClasses = classSet({
        'online': player.online
      });

      return (
        <li key={ player.id || 'undefined' } className={ joinClasses(playerClasses, 'player-list-item list-group-item inner-padding') }>
          <span className="avatar"></span>
          <span className="player-name">{ player.name }</span>
        </li>
      );
    });
  },

  render: function () {
    return (
      <ul className="player-list list-group no-margin">
        { this.getPlayerElements(this.state.environment.players.sort(this.sortPlayers)) }
      </ul>
    );
  }
});

module.exports = PlayerFriends;
