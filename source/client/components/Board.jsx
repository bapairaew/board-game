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

var DOT = 'm 30.032962,0.40196916 a 0.70006999,0.70006999 0 0 0 -0.125,0.03125 0.70006999,0.70006999 0 0 0 -0.21875,0.09375 L 1.1579623,17.151969 a 0.70006999,0.70006999 0 0 0 0,1.21875 l 28.6562497,16.9375 a 0.70006999,0.70006999 0 0 0 0.71875,0 l 28.65625,-16.78125 a 0.70006999,0.70006999 0 0 0 0,-1.21875 L 30.376712,0.52696916 a 0.70006999,0.70006999 0 0 0 -0.34375,-0.125 z m 0,1.53125004 27.4375,15.9999998 -27.28125,15.96875 L 2.9079623,17.776969 30.032962,1.9332192 z';
var OUTSIDE_THRESHOLD = 5;

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
          <Shape fill="#f93" d={ DOT } />
        </Group>
      );
    });
  },

  renderMapPaths: function (map) {
    // TODO:
    return map.paths.map(function (_path) {
      var exit1Position = _path.exit1.position;
      var exit2Position = _path.exit2.position;

      // TODO: make it another components and use map client to choose which component to be render
      var d = stringFormat('m {0} {1} l {2} {3}', exit1Position.x, exit1Position.y,
        exit2Position.x - exit1Position.x, exit2Position.y - exit1Position.y);
      return (
        <Group key={ _path.exit1.id + _path.exit2.id } x={ 0 } y={ 0 }>
          <Shape stroke="#f93" d={ d } />
        </Group>
      );
    });
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
