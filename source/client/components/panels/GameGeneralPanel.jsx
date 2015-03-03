/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var _ = require('underscore');

var classSet = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var PlayerMixin = require('../../mixins/PlayerMixin')._alternate(['getInitialState']);

var PlayerItems = require('../player/PlayerItems.jsx');
var PlayerBadges = require('../player/PlayerBadges.jsx');
var PlayerFriends = require('../player/PlayerFriends.jsx');
var PlayerSettings = require('../player/PlayerSettings.jsx');

var Tabs = {
  ITEMS: 'ITEMS',
  BADGES: 'BADGES',
  FRIENDS: 'FRIENDS',
  SETTINGS: 'SETTINGS'
};

var GameGeneralPanel = React.createClass({
  mixins: [PlayerMixin],

  getInitialState: function () {
    return _.extend({
      activeTab: Tabs.ITEMS
    }, PlayerMixin._getInitialState());
  },

  changeTab: function (tab) {
    this.setState({ activeTab:  tab });
  },

  getTabContent: function (tab) {
    switch (tab) {
      case Tabs.ITEMS:
        return (
          <PlayerItems />
        );
      case Tabs.BADGES:
        return (
          <PlayerBadges />
        );
      case Tabs.FRIENDS:
        return (
          <PlayerFriends />
        );
      case Tabs.SETTINGS:
        return (
          <PlayerSettings />
        );
    }

    return null;
  },

  render: function () {
    var avatarStyle = {
      'backgroundImage': 'url(http://cdn8.staztic.com/app/a/5112/5112202/rubick-loadout-1-l-48x48.png)'
    };

    var itemsTabClasses = classSet({
      'active': this.state.activeTab === Tabs.ITEMS
    });

    var badgesTabClasses = classSet({
      'active': this.state.activeTab === Tabs.BADGES
    });

    var friendsTabClasses = classSet({
      'active': this.state.activeTab === Tabs.FRIENDS
    });

    var settingsTabClasses = classSet({
      'active': this.state.activeTab === Tabs.SETTINGS
    });

    return (
      <div>
        <div className="player-info">
          <div className="avatar player-avatar" style={ avatarStyle }></div>
          <div className="player-info-item">
            <div className="player-info-item-main highlight">{ this.state.player.name }</div>
            <div className="player-info-item-sub">Player</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">{ this.state.player.rank }</div>
            <div className="player-info-item-sub">Ranking</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">{ this.state.player.hours }</div>
            <div className="player-info-item-sub">Hours</div>
          </div>
        </div>
        <ul className="nav player-nav">
          <li key="items" className={ itemsTabClasses }><a onClick={ this.changeTab.bind(this, Tabs.ITEMS) }>Items</a></li>
          <li key="badges" className={ badgesTabClasses }><a onClick={ this.changeTab.bind(this, Tabs.BADGES) }>Badges</a></li>
          <li key="friends" className={ friendsTabClasses }><a onClick={ this.changeTab.bind(this, Tabs.FRIENDS) }>Friends</a></li>
          <li key="settings" className={ settingsTabClasses }><a onClick={ this.changeTab.bind(this, Tabs.SETTINGS) }>Settings</a></li>
        </ul>
        <ReactCSSTransitionGroup className="player-tab" component="div" transitionName="pane-content">
          <div key={ this.state.activeTab }>
            { this.getTabContent(this.state.activeTab) }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = GameGeneralPanel;
