/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var Login = React.createClass({
  login: function () {
    alert('test');
  },
  render: function () {
    return (
      <div>
        <button onClick={ this.login }>Login</button>
      </div>
    );
  }
});

module.exports = Login;
