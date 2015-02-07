/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Routes = require('../routes.jsx');

var Server = {
  render: function (req, res, next) {
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
          '<div id="app">\n' +
            content +
          '</div>\n' +
          '<script src="/build/app.js"></script>\n' +
        '</body>\n' +
      '</html>');
    });
  }
};

module.exports = Server;
