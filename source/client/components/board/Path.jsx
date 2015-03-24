/**
* @jsx React.DOM
*/
'use strict';

var _ = require('underscore');
var React = require('React');
var ReactPIXI = require('react-pixi');
var TilingSprite = ReactPIXI.TilingSprite;

var stringFormat = require('../../../utilities/stringFormat');
var getAsset = require('../../../utilities/getAsset');

var GameConstant = require('../../../constants/Game');

var Path = React.createClass({
  propTypes: {
    position1: React.PropTypes.object.isRequired,
    position2: React.PropTypes.object.isRequired
  },

  getDistance: function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  },

  getAngle: function (a, b) {
    return Math.atan2((b.y - a.y), (b.x - a.x));
  },

  render: function () {
    var width = this.getDistance(this.props.position1, this.props.position2) * GameConstant.BLOCK_SIZE;
    var rotation = this.getAngle(this.props.position1, this.props.position2);

    return (
      <TilingSprite
        x={ (this.props.position1.x + 1) * GameConstant.BLOCK_SIZE }
        y={ this.props.position1.y * GameConstant.BLOCK_SIZE }
        width={ width }
        height={ GameConstant.BLOCK_SIZE }
        rotation={ rotation }
        image={ getAsset('path') } />
    );
  }
});

module.exports = Path;
