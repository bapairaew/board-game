/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var joinClasses = require('../../utilities/joinClasses');

var PlayerBadges = React.createClass({
  demoBadges: [
    // TODO: badge sprite
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

  getBadgeElements: function (badges) {
    return badges.map(function (badge) {
      return (
        <div key={ badge } className="player-item">
          <div className={ joinClasses(badge, 'game-item') }></div>
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
