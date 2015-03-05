'use strict';

var _ = require('underscore');

var Place = require('./Place');
var Church = require('./Church');
var Portal = require('./Portal');
var Town = require('./Town');
var Treasure = require('./Treasure');

var PlaceParser = {
  parse: function (place) {
    if (_.isObject(place)) {
      var _place;
      switch (place.type) {
        case 'Church':
          _place = new Church();
          break;
        case 'Portal':
          _place = new Portal();
          break;
        case 'Town':
          _place = new Town();
          break;
        case 'Treasure':
          _place = new Treasure();
          break;
        default:
          _place = new Place();
          break;
      }
      _place.update(place);
      return _place;
    }

    return null;
  },
  parseMany: function (places) {
    return _.isArray(places) ? places.map(function (place) {
      return PlaceParser.parse(place);
    }) : [];
  }
};

module.exports = PlaceParser;
