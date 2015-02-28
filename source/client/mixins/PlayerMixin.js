'use strict';

var PlayerStore = require('../stores/PlayerStore');

var alternateMixin = require('../../utilities/alternateMixin');

var PlayerMixin = {
  getInitialState: function () {
    return {
      player: PlayerStore.get()
    };
  },

  componentDidMount: function () {
    PlayerStore.addChangeListener(this.refreshState);
  },

  componentWillUnmount: function () {
    PlayerStore.removeChangeListener(this.refreshState);
  },

  refreshState: function () {
    this.setState({ player: PlayerStore.get() });
  },

  // TODO: come up with better idea
  _alternate: function (methods) {
    return alternateMixin(PlayerMixin, methods);
  }
};

module.exports = PlayerMixin;
