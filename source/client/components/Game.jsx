/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('react/addons');
var classSet = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var joinClasses = require('../../utilities/joinClasses');

var GameMixin = require('../mixins/GameMixin');

var GameClient = require('../utilities/GameClient');

var EnvironmentAction = require('../actions/EnvironmentAction');
var PlayerAction = require('../actions/PlayerAction');
var RollAction = require('../actions/RollAction');
var WalkAction = require('../actions/WalkAction');

var GameBattlePanel = require('./GameBattlePanel.jsx');
var GameFinancePanel = require('./GameFinancePanel.jsx');
var GameGeneralPanel = require('./GameGeneralPanel.jsx');

var Menus = {
  HP: 'HP',
  COIN: 'COIN',
  AVATAR: 'AVATAR'
};

var Game = React.createClass({
  mixins: [GameMixin],

  showPanel: false,

  activeMenu: Menus.AVATAR,

  togglePanel: function (menu) {
    // TODO: animation on hide panel.
    if (!_.isString(menu)) {
      this.showPanel = false;
    } else {
      // Close if the click the same menu
      this.showPanel = this.activeMenu !== menu || !this.showPanel;
      this.activeMenu = menu;
    }
    this.forceUpdate();
  },

  stopPropagation: function (event) {
    event.stopPropagation();
  },

  getPanelContent: function (menu) {
    switch (menu) {
      case Menus.HP:
        return (
          <GameBattlePanel />
        );
      case Menus.COIN:
        return (
          <GameFinancePanel />
        );
      case Menus.AVATAR:
        return (
          <GameGeneralPanel />
        );
    }

    return null;
  },

  getPanel: function (menu) {
    return (
      <ReactCSSTransitionGroup className="game-panel" tabIndex="1" onClick={ this.stopPropagation }
        component="div" transitionName="pane-content">
        <div key={ menu } className="game-panel-container">
          { this.getPanelContent(menu) }
        </div>
      </ReactCSSTransitionGroup>
    );
  },

  render: function () {
    var panel = this.showPanel ? this.getPanel(this.activeMenu) : null;

    var avatarStyle = {
      'backgroundImage': 'url(http://cdn8.staztic.com/app/a/5112/5112202/rubick-loadout-1-l-48x48.png)'
    };

    var remainingHp = 60;
    var maxHp = 100;

    var progressBarStyle = {
      'width': (remainingHp * 100 / maxHp) + '%'
    };

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
      <div className="game" tabIndex="1" onClick={ this.togglePanel }>
        <div className="game-toolbar">
          <button className="btn btn-primary game-btn-roll">Roll</button>
          <div className="btn-group" tabIndex="1" onClick={ this.stopPropagation }>
            <button className={ joinClasses(hpButtonClasses, 'btn btn-default game-hp-bar-container') }
              onClick={ this.togglePanel.bind(this, Menus.HP) }>
              <div className="progress">
                <div className="progress-bar" style={ progressBarStyle }>
                  { remainingHp } / { maxHp }
                </div>
              </div>
            </button>
            <button className={ joinClasses(coinButtonClasses, 'btn btn-default') }
              onClick={ this.togglePanel.bind(this, Menus.COIN) }><span className="coin fa fa-btc"></span> 10</button>
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
