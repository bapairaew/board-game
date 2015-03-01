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
var Path = ReactART.Path;

var GameMixin = require('../mixins/GameMixin')._alternate(['getInitialState']);

var within = require('../../utilities/within');
var restrictSize = require('../../utilities/restrictSize');

var DOT = "M12.5,17 C16.0898511,17 19,14.0898511 19,10.5 C19,6.91014895 16.0898511,4 12.5,4 C8.91014895,4 6,6.91014895 6,10.5 C6,14.0898511 8.91014895,17 12.5,17 Z M12.5,17";
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
          <Shape fill="#7BC7BA" d={ DOT } />
        </Group>
      );
    });
  },

  renderMapPaths: function (map) {
    // TODO:
    map.paths.forEach(function (_path) {
      // TODO: make it another components and use map client to choose which component to be render
      var path = new Path();
      var exit1Position = _path.exit1.position;
      var exit2Position = _path.exit2.position;
      path.moveTo(exit1Position.x, exit1Position.y);
      path.lineTo(exit2Position.x, exit2Position.y);
    });
  },

  renderCameraView: function () {
    // TODO: map client
    var map = this.getMap();

    if (!map) {
      return null;
    }

    this.renderMapPaths(map);

    return (
      <Group
        x={ this.state.camera.x }
        y={ this.state.camera.y }>
        { this.renderMapPlaces(map) }
      </Group>
    );
  },

  render: function() {
    var surfaceStyle = {
      'cursor': this.state.dragging ? 'move': 'default'
    };

    console.log(this.getMap());

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
