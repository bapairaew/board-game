'use strict';

var PlayerStore = require('../stores/PlayerStore');

var PlayerMixin = {
  getState: function () {
    return {
      player: PlayerStore.get()
    };
  },

  getInitialState: function () {
    return this.getState();
  },

  componentDidMount: function () {
    PlayerStore.addChangeListener(this.refreshState);
  },

  componentWillUnmount: function () {
    PlayerStore.removeChangeListener(this.refreshState);
  },

  refreshState: function () {
    this.setState(this.getState());
  }
};

module.exports = PlayerMixin;
