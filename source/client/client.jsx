/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Routes = require('../routes.jsx');

var Client = {
  render: function (element) {
    ReactRouter.run(Routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(<Handler />, element);
    });
  }
};

module.exports = Client;

if (typeof window !== 'undefined') {
  window.onload = function() {
    Client.render(document.getElementById('app'));
  };
}
