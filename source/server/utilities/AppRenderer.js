'use strict';

var url = require('url');
var React = require('react');
var ReactAsync  = require('react-async');
require('node-jsx').install({ extension: '.jsx' });

function AppRenderer(_app) {
  var app = _app;

  this.render = function (req, res, next) {
    var path = url.parse(req.url).pathname;
    var appElement = React.createElement(app, { path: path });
    ReactAsync.renderToStringAsync(appElement, function (err, markup) {
      if (err) {
        return next(err);
      }
      res.send('<!doctype html>\n' + markup);
    });
  };
}

module.exports = AppRenderer;
