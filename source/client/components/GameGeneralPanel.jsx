/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var classSet = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var PlayerItems = require('./PlayerItems.jsx');
var PlayerBadges = require('./PlayerBadges.jsx');
var PlayerFriends = require('./PlayerFriends.jsx');
var PlayerSettings = require('./PlayerSettings.jsx');

var Tabs = {
  ITEMS: 'ITEMS',
  BADGES: 'BADGES',
  FRIENDS: 'FRIENDS',
  SETTINGS: 'SETTINGS'
};

var GameGeneralPanel = React.createClass({
  activeTab: Tabs.ITEMS,

  changeTab: function (tab) {
    this.activeTab = tab;
    this.forceUpdate();
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
      'active': this.activeTab === Tabs.ITEMS
    });

    var badgesTabClasses = classSet({
      'active': this.activeTab === Tabs.BADGES
    });

    var friendsTabClasses = classSet({
      'active': this.activeTab === Tabs.FRIENDS
    });

    var settingsTabClasses = classSet({
      'active': this.activeTab === Tabs.SETTINGS
    });

    return (
      <div>
        <div className="player-info">
          <div className="avatar player-avatar" style={ avatarStyle }></div>
          <div className="player-info-item">
            <div className="player-info-item-main highlight">Micheal Bay</div>
            <div className="player-info-item-sub">Player</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">1st</div>
            <div className="player-info-item-sub">Ranking</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">2000</div>
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
          <div key={ this.activeTab }>
            { this.getTabContent(this.activeTab) }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = GameGeneralPanel;