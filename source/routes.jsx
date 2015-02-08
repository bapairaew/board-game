/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var App = require('./client/components/App.jsx');
var Game = require('./client/components/Game.jsx');
var Demo = require('./client/components/Demo.jsx');
var Login = require('./client/components/Login.jsx');
var PageNotFound = require('./client/components/PageNotFound.jsx');

var Routes = [
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute name="game" handler={ Game } />
    <Route name="demo" path="/demo" handler={ Demo } />
    <Route name="login" path="/login" handler={ Login } />
  </Route>,
  <NotFoundRoute handler={ PageNotFound } />
];

module.exports = Routes;
