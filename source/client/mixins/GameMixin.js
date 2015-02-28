'use strict';

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
    this.setState({
      environment: EnvironmentStore.get(),
      player: PlayerStore.get()
    });
  },

  // TODO: come up with better idea
  _alternate: function (methods) {
    return alternateMixin(GameMixin, methods);
  }
};

module.exports = GameMixin;
