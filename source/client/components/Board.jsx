/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('React');
var ReactART = require('react-art');
var Surface = ReactART.Surface;
var Group = ReactART.Group;
var Shape = ReactART.Shape;

var GameMixin = require('../mixins/GameMixin')._alternate(['getInitialState']);

var within = require('../../utilities/within');
var restrictSize = require('../../utilities/restrictSize');
var stringFormat = require('../../utilities/stringFormat');

// height: 70 width: 60
var SQUARE = 'm 30 30 l 30 20 l -30 20 l -30 -20 z';
var OUTSIDE_THRESHOLD = 5;

var Direction = {
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT'
};

var Board = React.createClass({
  mixins: [GameMixin],

  getMap: function () {
    return this.state.environment.maps[0] || null;
  },

  setWindowSize: function () {
    this.setState(this.getWindowSize());
  },

  getWindowSize: function () {
    return {
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight
    };
  },

  getInitialState: function () {
    return _.extend({
        camera: { x: 0, y: 0 },
        dragging: false
      },
      this.getWindowSize(),
      GameMixin._getInitialState());
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.setWindowSize);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.setWindowSize);
  },

  drag: { x: 0, y: 0 },

  isInsideScreen: function (x, y) {
    return within(x, 0, this.state.width - OUTSIDE_THRESHOLD) &&
      within(y, OUTSIDE_THRESHOLD, this.state.height - OUTSIDE_THRESHOLD);
  },

  // Restric x, y to be inside map
  insideMap: function (x, y) {
    var map = this.getMap();

    return {
      x: restrictSize(x, -1 * (map.width - this.state.width), 0),
      y: restrictSize(y, -1 * (map.height - this.state.height), 0)
    };
  },

  handleMouseDown: function (e) {
    this.drag.x = e.clientX - this.state.camera.x;
    this.drag.y = e.clientY - this.state.camera.y;
    this.setState({ dragging: true });
  },

  handleMouseMove: function (e) {
    if (this.state.dragging) {
      var x = e.clientX;
      var y = e.clientY;
      if (this.isInsideScreen(x, y)) {
        this.setState({ camera: this.insideMap(x - this.drag.x, y - this.drag.y) });
      } else {
        this.setState({ dragging: false });
      }
    }
  },

  handleMouseUp: function () {
    this.setState({ dragging: false });
  },

  renderMapPlaces: function (map) {
    return map.places.map(function (cell) {
      // TODO: make it another components and use map client to choose which component to be render
      return (
        <Group key={ cell.id } x={ cell.position.x } y={ cell.position.y }>
          <Shape stroke={ '#f93' } strokeWidth={ 3 } d={ SQUARE } />
        </Group>
      );
    });
  },

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

  renderPathGroup: function (key, position1, position2) {
    var sorted = this.sortDirection(position1, position2);
    position1 = sorted[0];
    position2 = sorted[1];

    var direction = this.getDirection(position1, position2);

    return (
      <Group key={ key }>
        { this.renderPath1(position1, position2, direction) }
        { this.renderPath2(position1, position2, direction) }
      </Group>
    );
  },

  renderMapPaths: function (map) {
    // TODO:
    return map.paths.map(function (_path) {
      var exit1Position = _path.exit1.position;
      var exit2Position = _path.exit2.position;

      // TODO: make it another components and use map client to choose which component to be render
      return this.renderPathGroup(_path.exit1.id + _path.exit2.id, exit1Position, exit2Position);
    }.bind(this));
  },

  renderCameraView: function () {
    // TODO: map client
    var map = this.getMap();

    if (!map) {
      return null;
    }

    return (
      <Group
        x={ this.state.camera.x }
        y={ this.state.camera.y }>
        { this.renderMapPlaces(map) }
        { this.renderMapPaths(map) }
      </Group>
    );
  },

  render: function() {
    var surfaceStyle = {
      'cursor': this.state.dragging ? 'move': 'default'
    };

    // TODO: Remove div
    return (
      <div
        style={ surfaceStyle }
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
        onMouseUp={ this.handleMouseUp }>
        <Surface
          width={ this.state.width }
          height={ this.state.height }>
          { this.renderCameraView() }
        </Surface>
      </div>
    );
  }
});

module.exports = Board;
