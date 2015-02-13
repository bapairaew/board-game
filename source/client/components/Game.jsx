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

  getPanelContent: function () {
    var panel = null;

    switch (this.activeMenu) {
      case Menus.HP:
        panel = (
          <GameBattlePanel />
        );
        break;
      case Menus.COIN:
        panel = (
          <GameFinancePanel />
        );
        break;
      case Menus.Avatar:
        panel = (
          <GameGeneralPanel />
        );
        break;
    }

    return (
      <div key={ this.activeMenu } className="game-panel-container">
        { panel }
      </div>
    );
  },

  getPanel: function () {
    // dummy div 'panel' is used for fixing react issue
    // message:
    // transition(): tried to perform an animation without an animationend or transitionend event after timeout (5000ms). You should either disable this transition in JS or add a CSS animation/transition.
    // https://github.com/facebook/react/issues/1707
    return !this.showPanel ? null : (
      <ReactCSSTransitionGroup className="game-panel" tabIndex="1" onClick={ this.stopPropagation }
        component="div" transitionName="pane-content">
        { this.getPanelContent() }
      </ReactCSSTransitionGroup>
    );
  },

  render: function () {
    var panel = this.getPanel();

    var avatarStyle = {
      'backgroundImage': 'url(//lh3.googleusercontent.com/-Y86IN-vEObo/AAAAAAAAAAI/AAAAAAADO1I/QzjOGHq5kNQ/s120-c/photo.jpg)'
    };

    var progressBarStyle = {
      'width': '60%'
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
        <div className="game-toolbar" tabIndex="1" onClick={ this.stopPropagation }>
          <div className="btn-group">
            <button className={ joinClasses(hpButtonClasses, 'btn btn-default game-hp-bar-container') }
              onClick={ this.togglePanel.bind(this, Menus.HP) }>
              <div className="progress">
                <div className="progress-bar" style={ progressBarStyle }></div>
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
