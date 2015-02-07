/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <ul>
          <li><Link to="/">Demo</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <ReactCSSTransitionGroup component="div" transitionName="example">
          <RouteHandler {...this.props} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = App;
