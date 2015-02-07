/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router-component');

var Locations = ReactRouter.Locations;
var Location = ReactRouter.Location;
var NotFound = ReactRouter.NotFound;

var Demo = require('./Demo.jsx');
var Login = require('./Login.jsx');
var PageNotFound = require('./PageNotFound.jsx');

var App = React.createClass({
  handleNavigation: function () {
    this.setProps({ path: window.location.pathname });
  },

  render: function () {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/build/app.css" />
          <script src="/build/app.js" />
          <title>Game</title>
        </head>
        <body className="container-fluid">
          <Locations path={ this.props.path } onNavigation={ this.handleNavigation }>
            <Location path="/" handler={ Demo } />
            <Location path="/login" handler={ Login } />
            <NotFound handler={ PageNotFound } />
          </Locations>
        </body>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(React.createElement(App, { path: window.location.pathname }), document);
  };
}
