/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('react/addons');
var classSet = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var joinClasses = require('react/lib/joinClasses');

var GameMixin = require('../mixins/GameMixin')._alternate(['getInitialState']);

var GameClient = require('../utilities/GameClient');

var EnvironmentAction = require('../actions/EnvironmentAction');
var PlayerAction = require('../actions/PlayerAction');
var RollAction = require('../actions/RollAction');
var WalkAction = require('../actions/WalkAction');

var Board = typeof window === 'undefined' ? require('../components/Empty.jsx') : require('../components/board/Board.jsx');
var GameBattlePanel = require('../components/panels/GameBattlePanel.jsx');
var GameFinancePanel = require('../components/panels/GameFinancePanel.jsx');
var GameGeneralPanel = require('../components/panels/GameGeneralPanel.jsx');

var Menus = {
  HP: 'HP',
  COIN: 'COIN',
  AVATAR: 'AVATAR'
};

var Game = React.createClass({
  mixins: [GameMixin],

  getInitialState: function () {
    return _.extend({
      activeMenu: Menus.AVATAR,
      showPanel: false,
    }, GameMixin._getInitialState());
  },

  componentDidMount: function () {
    GameClient.init(window.location.origin);
    EnvironmentAction.listen();
    PlayerAction.listen();
    RollAction.listen();
    WalkAction.listen();
  },

  togglePanel: function (menu) {
    // TODO: animation on hide panel.
    var stateToUpdate;
    if (!_.isString(menu)) {
      stateToUpdate = { showPanel: false };
    } else {
      // Close if the click the same menu
      stateToUpdate = {
        showPanel: this.state.activeMenu !== menu || !this.state.showPanel,
        activeMenu: menu
      };
    }
    this.setState(stateToUpdate);
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
    var panel = this.state.showPanel ? this.getPanel(this.state.activeMenu) : null;

    var avatarStyle = {
      'backgroundImage': 'url(http://cdn8.staztic.com/app/a/5112/5112202/rubick-loadout-1-l-48x48.png)'
    };

    var remainingHp = 60;
    var maxHp = 100;

    var progressBarStyle = {
      'width': (remainingHp * 100 / maxHp) + '%'
    };

    var hpButtonClasses = classSet({
      'menu-active': this.state.activeMenu === Menus.HP && this.state.showPanel
    });

    var coinButtonClasses = classSet({
      'menu-active': this.state.activeMenu === Menus.COIN && this.state.showPanel
    });

    var avatarButtonClasses = classSet({
      'menu-active': this.state.activeMenu === Menus.AVATAR && this.state.showPanel
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
        <Board map={ this.state.environment.maps[0] } />
      </div>
    )
  }
});

module.exports = Game;
