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

var DOT = "M12.5,17 C16.0898511,17 19,14.0898511 19,10.5 C19,6.91014895 16.0898511,4 12.5,4 C8.91014895,4 6,6.91014895 6,10.5 C6,14.0898511 8.91014895,17 12.5,17 Z M12.5,17";
var OUTSIDE_THRESHOLD = 5;

var Board = React.createClass({
  mixins: [GameMixin],

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
    return within(x, 0, this.state.width - OUTSIDE_THRESHOLD) && within(y, 0, this.state.height - OUTSIDE_THRESHOLD);
  },

  isInsideMap: function (x, y) {
    // TODO: avoid draggin outside the map
    return true;
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
      if (this.isInsideScreen(x, y) && this.isInsideMap(x, y)) {
        this.setState({
          camera: {
            x: x - this.drag.x,
            y: y - this.drag.y
          }
        });
      } else {
        this.setState({ dragging: false });
      }
    }
  },

  handleMouseUp: function () {
    this.setState({ dragging: false });
  },

  renderMapElements: function (map) {
    // TODO: map client

    if (!map) {
      return null;
    }

    return map.places.map(function (cell) {
      // TODO: make it another components and use map client to choose which component to be render
      return (
        <Group key={ cell.id } x={ cell.position.x } y={ cell.position.y }>
          <Shape fill="#7BC7BA" d={ DOT } />
        </Group>
      );
    });
  },

  render: function() {
    var surfaceStyle = {
      'cursor': this.state.dragging ? 'move': 'default'
    };

    // TODO: get map info from props??
    var map = this.state.environment.maps[0] || null;

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
            <Group
              x={ this.state.camera.x }
              y={ this.state.camera.y }>
              { this.renderMapElements(map) }
            </Group>
        </Surface>
      </div>
    );
  }
});

module.exports = Board;
