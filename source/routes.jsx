/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var App = require('./client/pages/App.jsx');
var Game = require('./client/pages/Game.jsx');
var Demo = require('./client/pages/Demo.jsx');
var Login = require('./client/pages/Login.jsx');
var Sprite = require('./client/pages/Sprite.jsx');
var PageNotFound = require('./client/pages/PageNotFound.jsx');

var Routes = [
  <Route name="app" path="/" handler={ App }>
    <DefaultRoute name="game" handler={ Game } />
    <Route name="demo" path="/demo" handler={ Demo } />
    <Route name="login" path="/login" handler={ Login } />
    <Route name="sprite" path="/sprite" handler={ Sprite } />
  </Route>,
  <NotFoundRoute handler={ PageNotFound } />
];

module.exports = Routes;
