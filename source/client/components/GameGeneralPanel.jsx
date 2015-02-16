/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var joinClasses = require('../../utilities/joinClasses');

var GameGeneralPanel = React.createClass({
  demoItems: [
    'clarity',
    'branch',
    'ring',
    'wand',
    'band',
    'basilius',
    'force',
    'crystalys',
    'hood',
    'dominator',
    'demon'
  ],

  getItemElements: function (items) {
    return items.map(function (item) {
      return (
        <div className="player-item-list-item">
          <div className={ joinClasses(item, 'game-item') }></div>
        </div>
      )
    });
  },

  render: function () {
    var avatarStyle = {
      'backgroundImage': 'url(http://cdn8.staztic.com/app/a/5112/5112202/rubick-loadout-1-l-48x48.png)'
    };

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
          <li className="active"><a href="#">Items</a></li>
          <li><a href="#">Badges</a></li>
          <li><a href="#">Friends</a></li>
        </ul>
        <div className="player-tab">
          <div className="player-item-list">
            { this.getItemElements(this.demoItems) }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GameGeneralPanel;
