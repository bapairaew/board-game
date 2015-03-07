/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var joinClasses = require('react/lib/joinClasses');

var PlayerBadges = React.createClass({
  demoBadges: [
    'treasure-1',
    'treasure-2',
    'treasure-3'
  ],

  getBadgeElements: function (badges) {
    return badges.map(function (badge) {
      return (
        <div key={ badge } className="player-item">
          <div className={ joinClasses(badge, 'game-treasure') }></div>
        </div>
      )
    });
  },

  render: function () {
    return (
      <ReactCSSTransitionGroup className="player-item-list" transitionName="item">
        { this.getBadgeElements(this.demoBadges) }
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = PlayerBadges;
