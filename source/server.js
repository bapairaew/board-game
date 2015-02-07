'use strict';

var path = require('path');
var express = require('express');
var browserify = require('connect-browserify');
var http = require('http');

require('node-jsx').install({ extension: '.jsx' });

var ServerAppRenderer = require('./server/utilities/ServerAppRenderer.jsx');
var GameServer = require('./server/utilities/GameServer');
var Routes = require('./client/components/Routes.jsx');

var renderer = new ServerAppRenderer(Routes);
var __root = path.normalize(path.join(__dirname, '..'));
var app = express();

if (process.env.NODE_ENV !== 'production') {
  app.get('/build/app.js',
    browserify('./source/client/utilities/ClientAppRenderer.jsx', {
      debug: true,
      watch: true
    }));
}

app.use('/build', express.static(path.join(__root, 'build')))
  .get('/favicon.ico', function (req, res, next) {
    res.send();
  })
  .use(renderer.render);

var server = http.Server(app);

GameServer.host(server);

server.listen(3000, function () {
    console.log('Server started: http://localhost:3000');
  });
