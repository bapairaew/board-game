/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var joinClasses = require('react/lib/joinClasses');

var PlayerItems = React.createClass({
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
        <div key={ item } className="player-item">
          <div className={ joinClasses(item, 'game-item') }></div>
        </div>
      )
    });
  },

  render: function () {
    return (
      <ReactCSSTransitionGroup className="player-item-list" transitionName="item">
        { this.getItemElements(this.demoItems) }
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = PlayerItems;
