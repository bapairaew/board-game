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

  // TODO: get map info from props??
  getMap: function () {
    return this.state.environment.maps[0] || null;
  },

  renderMap: function (map) {
    // TODO: map client

    if (!map) {
      return null;
    }

    return map.places.map(function (cell) {
      return (
        <Group key={ cell.id } x={ cell.position.x } y={ cell.position.y }>
          <Shape fill="#7BC7BA" d={DOT} />
        </Group>
      );
    });
  },

  handleMouseDown: function (e) {
    console.log(e);
  },

  handleMouseMove: function (e) {
    console.log(e);
  },

  handleMouseUp: function (e) {
    console.log(e);
  },

  render: function() {
    // TODO: get map info from props??
    var map = this.getMap();
    var id = map && map.id;

    return (
      <div
        onMouseDown={ this.handleMouseDown }
        onMouseMove={ this.handleMouseMove }
        onMouseUp={ this.handleMouseUp }>
        <div style={{ 'position': 'absolute' }}>{ id }</div>
        <Surface
          width={ this.state.width }
          height={ this.state.height }>
          <Group
            x={ this.state.camera.x }
            y={ this.state.camera.y }>
            { this.renderMap(map) }
          </Group>
        </Surface>
      </div>
    );
  },
});

var DOT = "M12.5,17 C16.0898511,17 19,14.0898511 19,10.5 C19,6.91014895 16.0898511,4 12.5,4 C8.91014895,4 6,6.91014895 6,10.5 C6,14.0898511 8.91014895,17 12.5,17 Z M12.5,17";

module.exports = Board;
