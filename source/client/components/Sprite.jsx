/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var joinClasses = require('../../utilities/joinClasses');

var Sprite = React.createClass({
  objects: [
    'black-fruit',
    'red-fruit',
    'green-apple',
    'red-apple',
    'orange',
    'green-grape',
    'purple-grape',
    'watermelon',
    'strawberry',
    'green-fruit',
    'lemon',
    'pieapple',
    'banana',
    'nut'
  ],

  getObjectsElement: function (objects) {
    return objects.map(function (object) {
      return (
        <div key={ object } className={ joinClasses('game-object', object) }></div>
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
