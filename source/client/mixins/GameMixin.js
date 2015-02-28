'use strict';

var React = require('react/addons');
var updateState = React.addons.update;

var EnvironmentStore = require('../stores/EnvironmentStore');
var PlayerStore = require('../stores/PlayerStore');

var alternateMixin = require('../../utilities/alternateMixin');

var GameMixin = {
  getInitialState: function () {
    return {
      environment: EnvironmentStore.get(),
      player: PlayerStore.get()
    };
  },

  componentDidMount: function () {
    EnvironmentStore.addChangeListener(this.refreshState);
    PlayerStore.addChangeListener(this.refreshState);
  },

  componentWillUnmount: function () {
    EnvironmentStore.removeChangeListener(this.refreshState);
    PlayerStore.removeChangeListener(this.refreshState);
  },

  refreshState: function () {
    this.setState(updateState(this.state, {
      environment: { $set: EnvironmentStore.get() },
      player: { $set: PlayerStore.get() }
    }));
  },

  // TODO: come up with better idea
  _alternate: function (methods) {
    return alternateMixin(GameMixin, methods);
  }
};

module.exports = GameMixin;
