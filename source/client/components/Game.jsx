/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;

var GameMixin = require('../mixins/GameMixin');

var GameClient = require('../utilities/GameClient');

var EnvironmentAction = require('../actions/EnvironmentAction');
var PlayerAction = require('../actions/PlayerAction');
var RollAction = require('../actions/RollAction');
var WalkAction = require('../actions/WalkAction');

var joinClasses = require('../../utilities/joinClasses');

var Menus = {
  HP: 'HP',
  COIN: 'COIN',
  AVATAR: 'AVATAR'
};

var Game = React.createClass({
  mixins: [GameMixin],

  showPanel: false,

  activeMenu: null,

  togglePanel: function (menu) {
    // TODO: click on other menu should not just collapse the current one.
    // TODO: animation on hide panel.
    this.showPanel = !this.showPanel;
    this.activeMenu = menu;
    this.forceUpdate();
  },

  render: function () {
    var avatarStyle = {
      'backgroundImage': 'url(//lh3.googleusercontent.com/-Y86IN-vEObo/AAAAAAAAAAI/AAAAAAADO1I/QzjOGHq5kNQ/s120-c/photo.jpg)'
    };

    var progressBarStyle = {
      'width': '60%'
    };

    var panel = !this.showPanel ? null : (
      <div className="game-panel">
      </div>
    );

    var hpButtonClasses = classSet({
      'menu-active': this.activeMenu === Menus.HP && this.showPanel
    });

    var coinButtonClasses = classSet({
      'menu-active': this.activeMenu === Menus.COIN && this.showPanel
    });

    var avatarButtonClasses = classSet({
      'menu-active': this.activeMenu === Menus.AVATAR && this.showPanel
    });

    return (
      <div className="game">
        <div className="game-toolbar">
          <div className="btn-group">
            <button className={ joinClasses(hpButtonClasses, 'btn btn-default game-hp-bar-container') }
              onClick={ this.togglePanel.bind(this, Menus.HP) }>
              <div className="progress">
                <div className="progress-bar" style={ progressBarStyle }></div>
              </div>
            </button>
            <button className={ joinClasses(coinButtonClasses, 'btn btn-default') }
              onClick={ this.togglePanel.bind(this, Menus.COIN) }>Coins: 10</button>
            <button className={ joinClasses(avatarButtonClasses, 'btn btn-default btn-avatar') } style={ avatarStyle }
              onClick={ this.togglePanel.bind(this, Menus.AVATAR) }></button>
          </div>
        </div>
        { panel }
      </div>
    )
  }
});

module.exports = Game;
