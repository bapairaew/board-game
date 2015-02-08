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

var Position = require('../../models/Position');

// TODO: Remove this
var Chance = require('chance');
var chance = new Chance();

var roll = function () {
  RollAction.roll();
};

var sortPlayer = function (a, b) {
  return a.online ? -1 : 1;
};

var getPlayerItem = function (player, idx) {
  return (
    <li key={ player.id || 'undefined' } className={ player.online ? 'online' : '' }>
      { toString(player.name) } - { toString(player.place) }
    </li>
  );
};

var getListItem = function (item, idx) {
  return (
    <li key={ idx }>{ item }</li>
  );
};

var getListItemString = function (item, idx) {
  return (
    <li key={ idx }>{ item.toString() }</li>
  );
};

var toString = function (obj) {
  return (obj && obj.toString && obj.toString()) || '';
};

var Demo = React.createClass({
  mixins: [GameMixin],

  componentDidMount: function () {
    GameClient.init(window.location.origin);
    EnvironmentAction.listen();
    PlayerAction.listen();
    RollAction.listen();
    WalkAction.listen();
  },

  render: function () {
    var walkButton = {
      display: this.state.player.token ? '' : 'none'
    };

    var walk = function () {
      // MOCKUP
      var map = chance.pick(this.state.environment.maps);
      WalkAction.walk(chance.pick(map.places));
    }.bind(this);

    return (
      <div className="demo">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>{ this.state.player.name }</h4>
            <dl className="dl-horizontal">
              <dt>ID</dt>
              <dd>{ this.state.player.id }</dd>
              <dt>Coins</dt>
              <dd>{ this.state.player.coins }</dd>
              <dt>Token</dt>
              <dd>{ toString(this.state.player.token) }</dd>
              <dt>Place</dt>
              <dd>{ toString(this.state.player.place) }</dd>
            </dl>
            <button className="btn btn-primary" onClick={ roll }>Roll</button>
            <button className="btn btn-primary" style={ walkButton } onClick={ walk }>Walk</button>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body demo-list-container">
            <h4>Items</h4>
            <ul>
              { this.state.player.items.map(getListItemString) }
            </ul>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body player-list">
            <h4>Players</h4>
            <ul>
              { [this.state.player].concat(this.state.environment.players).sort(sortPlayer).map(getPlayerItem) }
            </ul>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body demo-list-container">
            <h4>Logs</h4>
            <ul>
              { this.state.environment.logs.map(getListItem) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Demo;
