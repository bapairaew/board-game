/**
* @jsx React.DOM
*/
'use strict';

var React = require('React');
var ReactPIXI = require('react-pixi');
var Sprite = ReactPIXI.Sprite;

var GameConstant = require('../../../constants/Game');
var getAsset = require('../../../utilities/getAsset');

var ASSETS = {
  Place: 'place',
  Portal: 'portal',
  Treasure: 'treasure',
  Town: 'town',
  Church: 'church'
};

var Place = React.createClass({
  propTypes: {
    place: React.PropTypes.object.isRequired
  },

  handleClick: function () {
    window.alert(this.props.place.position.x + ', ' + this.props.place.position.y);
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.place !== this.props.place;
  },

  render: function () {
    return (
      <Sprite
        x={ this.props.place.position.x * GameConstant.BLOCK_SIZE }
        y={ this.props.place.position.y * GameConstant.BLOCK_SIZE }
        image={ getAsset(ASSETS[this.props.place.type]) }
        interactive={ true }
        click={ this.handleClick } />
    );
  }
});

module.exports = Place;
