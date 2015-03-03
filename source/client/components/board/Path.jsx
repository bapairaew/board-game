/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('React');
var ReactART = require('react-art');
var Group = ReactART.Group;
var Shape = ReactART.Shape;

var stringFormat = require('../../../utilities/stringFormat');

var Direction = {
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT'
};

var Path = React.createClass({
  getDirection: function (position1, position2) {
    var vertical = position1.y < position2.y ? 'BOTTOM' : 'TOP';
    var horizontal = position1.x < position2.x ? 'RIGHT' : 'LEFT';
    return Direction[stringFormat('{0}_{1}', vertical, horizontal)];
  },

  // TOP->LEFT->BOTTOM->RIGHT
  sortDirection: function (position1, position2) {
    return [position1, position2].sort(function (a, b) {
      var ySort = a.y - b.y;
      return ySort === 0 ? a.x - b.x : ySort;
    });
  },

  renderPath1: function (position1, position2, direction) {
    var start = _.extend({}, position1);
    var end = {
      x: position2.x - start.x,
      y: position2.y - start.y
    };

    switch (direction) {
      case Direction.TOP_LEFT:
      case Direction.TOP_RIGHT:
        console.debug('this should be unused', direction);
        break;
      case Direction.BOTTOM_RIGHT:
        start.x += 60;
        start.y += 50;
        end.x -= 30;
        end.y -= 20;
        break;
      case Direction.BOTTOM_LEFT:
        start.x += 30;
        start.y += 70;
        end.x += 30;
        end.y -= 20;
        break;
    }

    return this.renderPath(stringFormat('m {0} {1} l {2} {3}', start.x, start.y, end.x, end.y));
  },

  renderPath2: function (position1, position2, direction) {
    var start = _.extend({}, position1);
    var end = {
      x: position2.x - start.x,
      y: position2.y - start.y
    };

    switch (direction) {
      case Direction.TOP_LEFT:
      case Direction.TOP_RIGHT:
        console.debug('this should be unused', direction);
        break;
      case Direction.BOTTOM_RIGHT:
        start.x += 30;
        start.y += 70;
        end.x -= 30;
        end.y -= 20;
        break;
      case Direction.BOTTOM_LEFT:
        start.y += 50;
        end.x += 30;
        end.y -= 20;
        break;
    }

    return this.renderPath(stringFormat('m {0} {1} l {2} {3}', start.x, start.y, end.x, end.y));
  },

  renderPath: function (d) {
    return (
      <Shape stroke={ '#f93' } strokeWidth={ 2 } d={ d } />
    );
  },

  render: function () {
    var sorted = this.sortDirection(this.props.position1, this.props.position2);
    var position1 = sorted[0];
    var position2 = sorted[1];

    var direction = this.getDirection(position1, position2);

    return (
      <Group>
        { this.renderPath1(position1, position2, direction) }
        { this.renderPath2(position1, position2, direction) }
      </Group>
    );
  }
});

module.exports = Path;
