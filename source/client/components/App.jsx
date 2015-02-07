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
  mixins: [ReactRouter.State],
  render: function () {
    var name = this.getRoutes().reverse()[0].name;
    return (
      <div className="container-fluid">
        <ul>
          <li><Link to="/">Demo</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <ReactCSSTransitionGroup component="div" transitionName="example">
          <RouteHandler {...this.props} key={name} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = App;
