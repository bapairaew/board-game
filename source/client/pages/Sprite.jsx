/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var joinClasses = require('../../utilities/joinClasses');

var Sprite = React.createClass({
  objects: [
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

  getObjectsElement: function (objects) {
    var style = {
      'marginLeft': '10px'
    };

    return objects.map(function (object) {
      return (
        <div key={ object } style={ style } className={ joinClasses('game-item', object) }></div>
      );
    });
  },

  render: function() {
    return (
      <div>
        { this.getObjectsElement(this.objects) }
      </div>
    );
  }
});

module.exports = Sprite;
