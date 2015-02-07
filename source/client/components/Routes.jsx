/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;

var Login = require('./Login.jsx');

var Routes = (
  <Route path="/" handler={ Login } />
);

module.exports = Routes;
