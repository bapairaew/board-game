/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var Navigation = require('react-router').Navigation;
var classSet = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');

var PlayerAction = require('../actions/PlayerAction');
var PlayerStore = require('../stores/PlayerStore');

var Chance = require('chance');
var chance = new Chance();

var facts = require('../../assets/facts.json');

var Login = React.createClass({
  mixins: [Navigation],

  isLoggedIn: function () {
    var player = this.state.player;
    return player.isLoggedIn;
  },

  getInitialState: function () {
    return {
      player: PlayerStore.get()
    };
  },

  componentDidMount: function () {
    if (this.isLoggedIn()) {
      this.transitionTo('/');
    }
    PlayerStore.addChangeListener(this.refreshState);
  },

  componentWillUnmount: function () {
    PlayerStore.removeChangeListener(this.refreshState);
  },

  refreshState: function () {
    if (this.isLoggedIn()) {
      this.transitionTo('/');
    } else {
      this.setState(this.state);
    }
  },

  login: function (e) {
    e.preventDefault();

    // TODO:
    PlayerAction.login();
  },

  render: function () {
    var player = this.state.player;
    var isLoggingIn = player.isLoggingIn;

    var formClasses = classSet({
      'move-hidden': isLoggingIn
    });

    var buttonInputClasses = classSet({
      'hidden': isLoggingIn
    });

    var loginContainerClasses = classSet({
      'login-container': true,
      'collapsed': isLoggingIn
    });

    var loadingBarClasses = classSet({
      'loading-bar': true,
      'progress': true,
      'started': isLoggingIn
    });

    var loadingTextClasses = classSet({
      'loading-text': true,
      'started': isLoggingIn
    });

    var progressBarStyle = {
      width: '100%'
    };

    var progressBarClasses = classSet({
      'active': isLoggingIn
    });

    return (
      <div className="login">
        <div className={ loginContainerClasses }>
          <h1 className="login-header">Eikonia</h1>
          <div className={ loadingTextClasses }>
            { chance.pick(facts) }
          </div>
          <div className={ loadingBarClasses }>
            <div className={ joinClasses(progressBarClasses, 'progress-bar progress-bar-striped' ) } style={ progressBarStyle }></div>
          </div>
          <form className={ joinClasses(formClasses, 'login-form') } onSubmit={ this.login }>
            <input type="text" name="username" className="form-control" placeholder="Username" />
            <input type="password" name="password" className="form-control" placeholder="Password" />
            <button className={ joinClasses(buttonInputClasses, 'btn btn-primary btn-block btn-login') } type="submit">Login</button>
          </form>
          <div className={ joinClasses(formClasses, 'register-container') }>
            <button className="btn btn-link btn-block btn-register">Don't have an account? <b>Sign Up Here!</b></button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
