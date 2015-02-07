/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');
var Navigation = require('react-router').Navigation;

var Login = React.createClass({
  mixins: [Navigation],
  login: function () {
    this.transitionTo('/');
  },
  render: function () {
    return (
      <div className="login">
        <button onClick={ this.login }>Login</button>
      </div>
    );
  }
});

module.exports = Login;
