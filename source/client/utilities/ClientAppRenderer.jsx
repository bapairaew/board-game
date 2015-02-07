/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Routes = require('../components/Routes.jsx');

ReactRouter.run(Routes, function (Handler) {
  React.render(<Handler />);
});

module.exports = ClientAppRenderer;
