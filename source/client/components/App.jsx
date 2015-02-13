/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
  mixins: [ReactRouter.State],
  render: function () {
    var name = this.getRoutes().reverse()[0].name;
    return (
      <ReactCSSTransitionGroup className="container-fluid" component="div" transitionName="page">
        <RouteHandler {...this.props} key={name} />
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = App;
