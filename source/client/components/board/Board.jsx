/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('React');
var ReactPIXI = require('react-pixi');
var Stage = ReactPIXI.Stage;
var DisplayObjectContainer = ReactPIXI.DisplayObjectContainer;
var TilingSprite = ReactPIXI.TilingSprite;

var Place = require('./Place.jsx');
var Path = require('./Path.jsx');

var GameConstant = require('../../../constants/Game');

var GameMixin = require('../../mixins/GameMixin')._alternate(['getInitialState']);

var within = require('../../../utilities/within');
var restrictSize = require('../../../utilities/restrictSize');
var getAsset = require('../../../utilities/getAsset');

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
    return within(x, 0, this.state.width - OUTSIDE_THRESHOLD) &&
      within(y, OUTSIDE_THRESHOLD, this.state.height - OUTSIDE_THRESHOLD);
  },

  // Restric x, y to be inside map
  insideMap: function (x, y) {
    var map = this.props.map;
    var mapActualWidth = map.width * GameConstant.BLOCK_SIZE;
    var mapActualHeight = map.width * GameConstant.BLOCK_SIZE;

    return {
      x: restrictSize(x, -1 * (mapActualWidth - this.state.width), 0),
      y: restrictSize(y, -1 * (mapActualHeight - this.state.height), 0)
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
    return map.places.map(function (place) {
      return (
        <Place key={ place.id } place={ place } />
      );
    });
  },

  renderMapPaths: function (map) {
    return map.paths.map(function (_path) {
      var exit1Position = _path.exit1.position;
      var exit2Position = _path.exit2.position;

      return (
        <Path key={ _path.exit1.id + _path.exit2.id } position1={ exit1Position } position2={ exit2Position } />
      );
    }.bind(this));
  },

  renderMapBackground: function (map) {
    return (
      <TilingSprite
        image={ getAsset('background') }
        width={ map.width * GameConstant.BLOCK_SIZE }
        height={ map.height * GameConstant.BLOCK_SIZE } />
    );
  },

  renderCameraView: function () {
    // TODO: map client
    var map = this.props.map;

    if (!map) {
      return null;
    }

    return (
      <DisplayObjectContainer
        x={ this.state.camera.x }
        y={ this.state.camera.y }>
        { this.renderMapBackground(map) }
        { this.renderMapPaths(map) }
        { this.renderMapPlaces(map) }
      </DisplayObjectContainer>
    );
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.map !== nextProps.map || this.state !== nextState;
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
        <Stage
          width={ this.state.width }
          height={ this.state.height }
          backgroundcolor={ 0xDDDDDD }
          image={ getAsset('background') }>
          { this.renderCameraView() }
        </Stage>
      </div>
    );
  }
});

module.exports = Board;
