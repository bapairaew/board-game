/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
      <p>Page not found</p>
    );
  }
});

module.exports = NotFound;
