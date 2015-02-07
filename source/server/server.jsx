/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Routes = require('../routes.jsx');

var fs = require('fs');

var htmlRegex = /¡HTML!/;
var template = fs.readFileSync('source/index.html').toString('utf8');

var Server = {
  render: function (req, res, next) {
    ReactRouter.run(Routes, req.url, function (Handler) {
      var content = React.renderToString(<Handler />);
      res.send(template.replace(htmlRegex, content));
    });
  }
};

module.exports = Server;
