/**
* @jsx React.DOM
*/
'use strict';

var React = require('React');
var ReactART = require('react-art');
var Group = ReactART.Group;
var Shape = ReactART.Shape;

// height: 70 width: 60
var SQUARE = 'm 30 30 l 30 20 l -30 20 l -30 -20 z';

var Place = React.createClass({
  render: function () {
    return (
      <Group x={ this.props.place.position.x } y={ this.props.place.position.y }>
        <Shape stroke={ '#f93' } strokeWidth={ 3 } d={ SQUARE } />
      </Group>
    );
  }
});

module.exports = Place;