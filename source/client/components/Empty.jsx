/**
* @jsx React.DOM
*/
'use strict';

var React = require('React');

// Mockup component to avoid react-art throwing error when server rendering
var Empty = React.createClass({
  render: function () {
    return (
      <div />
    );
  }
});

module.exports = Empty;
