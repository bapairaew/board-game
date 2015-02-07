/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');

function ServerAppRenderer(Routes) {
  this.render = function (req, res, next) {
    ReactRouter.run(Routes, req.url, function (Handler) {
      var content = React.renderToString(<Handler />);
      res.send(
        '<!doctype html>\n' +
        '<html>\n' +
        '<head>\n' +
          '<link rel="stylesheet" href="/build/app.css" />\n' +
          '<title>Game</title>\n' +
        '</head>\n' +
        '<body>\n' +
          content +
          '<script src="/build/app.js"></script>\n' +
        '</body>\n' +
      '</html>');
    });
  };
}

module.exports = ServerAppRenderer;
