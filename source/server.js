'use strict';

var path = require('path');
var express = require('express');
var browserify = require('connect-browserify');
var http = require('http');

var AppRenderer = require('./server/utilities/AppRenderer');
var GameServer = require('./server/utilities/GameServer');
var App = require('./client/components/App.jsx');

var renderer = new AppRenderer(App);
var __root = path.normalize(path.join(__dirname, '..'));
var app = express();

if (process.env.NODE_ENV !== 'production') {
  app.get('/build/app.js',
    browserify('./source/client/components/App.jsx', {
      debug: true,
      watch: true
    }));
}

app.use('/build', express.static(path.join(__root, 'build')))
  .use(renderer.render);

var server = http.Server(app);

GameServer.host(server);

server.listen(3000, function () {
    console.log('Server started: http://localhost:3000');
  });
