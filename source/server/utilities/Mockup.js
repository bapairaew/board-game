'use strict';

var _ = require('underscore');

var EnvironmentServer = require('../models/EnvironmentServer');
var PlayerServer = require('../models/PlayerServer');

var ArmorServer = require('../models/items/ArmorServer');
var ConsumableServer = require('../models/items/ConsumableServer');
var ScrollServer = require('../models/items/ScrollServer');
var WeaponServer = require('../models/items/WeaponServer');

var CellServer = require('../models/places/CellServer');
var ChurchServer = require('../models/places/ChurchServer');
var PortalServer = require('../models/places/PortalServer');
var TownServer = require('../models/places/TownServer');
var TreasureServer = require('../models/places/TreasureServer');
var EffectServer = require('../models/EffectServer');

var Position = require('../../models/Position');
var Path = require('../../models/Path');
var Map = require('../../models/Map');

var Chance = require('chance');
var chance = new Chance();

var isUniquePath = function (path, paths) {
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].exit1.id === path.exit1.id && paths[i].exit2.id === path.exit2.id) {
      return false;
    }
  }
  return true;
};

var mockItem = function (item) {
  item.id = chance.guid();
  item.name = chance.word();
  item.description = chance.paragraph();
  return item;
};

var mockCell = function (cell) {
  cell.id = chance.guid();
  cell.name = chance.word();
  return cell;
};

var Mockup = {
  environment: function () {
    var environment = new EnvironmentServer();
    environment.maps = chance.n(chance.integer, chance.integer({ min: 5, max: 10 }))
      .map(function () { return Mockup.map(); });
    environment.effects = chance.n(chance.integer, chance.integer({ min: 100, max: 200 }))
      .map(function () { return Mockup.effect(); });
    environment.items = chance.n(chance.integer, chance.integer({ min: 100, max: 200 }))
      .map(function () { return Mockup.item(environment); });
    environment.players = chance.n(chance.integer, chance.integer({ min: 100, max: 200 }))
      .map(function () { return Mockup.player(environment); });

    var nonTreasureItems = environment.items.filter(function (item) { return !(item instanceof TreasureServer); });
    var tresureItems = environment.items.filter(function (item) { return item instanceof TreasureServer; });
    tresureItems.forEach(function (treasure) { treasure.contents = chance.pick(nonTreasureItems, 10); });

    var allCells = _.flatten(environment.maps.map(function (map) { return map.places; }));
    var nonPortalCells = allCells.filter(function (cell) { return !(cell instanceof PortalServer); });
    var portalCells = allCells.filter(function (cell) { return cell instanceof PortalServer; });
    portalCells.forEach(function (cell) { cell.destination = chance.pick(nonPortalCells); });

    return environment;
  },
  player: function (environment) {
    var player = new PlayerServer();
    player.id = chance.guid();
    player.name = chance.name();
    player.coins = chance.integer({ min: 1, max: 20 });
    player.token = null;
    player.online = false;
    player.rank = chance.integer({ min: 1, max: 20 });
    player.hours = chance.integer({ min: 1, max: 2000 });
    if (environment instanceof EnvironmentServer) {
      player.cell = Mockup.randomCell(environment);
      player.items = chance.pick(environment.items, chance.integer({ min: 5, max: 10 }));
    }
    return player;
  },
  map: function () {
    var map = new Map();
    map.id = chance.guid();
    map.width = 4000;
    map.height = 4000;
    chance.n(chance.integer, chance.integer({ min: 200, max: 500 }))
      .forEach(function () { map.places.push(Mockup.cell(map.width, map.height)); });
    chance.n(chance.integer, chance.integer({ min: 100, max: 200 }))
      .forEach(function () { map.paths.push(Mockup.uniquePath(map.places, map.paths)); });
    return map;
  },
  effect: function () {
    var effect = new EffectServer();
    effect.name = chance.word();
    effect.status = chance.word();
    effect.value = chance.integer({ min: 0, max: 100 });
    effect.lifespan = chance.integer({ min: 0, max: 100 });
    return effect;
  },
  item: function (environment) {
    return chance.pick([Mockup.armor, Mockup.consumable, Mockup.scroll, Mockup.weapon])(environment);
  },
  armor: function (environment) {
    var armor = new ArmorServer();
    mockItem(armor);
    armor.lifespan = chance.integer({ min: 0, max: 100 });
    armor.defence = chance.integer({ min: 1, max: 10 });
    if (environment instanceof EnvironmentServer) {
      armor.effect = chance.pick(environment.effects);
    }
    return armor;
  },
  consumable: function (environment) {
    var consumable = new ConsumableServer();
    mockItem(consumable);
    if (environment instanceof EnvironmentServer) {
      consumable.effect = chance.pick(environment.effects);
    }
    return consumable;
  },
  scroll: function () {
    var scroll = new ScrollServer();
    mockItem(scroll);
    scroll.attack = chance.integer({ min: 10, max: 200 });
    scroll.attackVary = chance.integer({ min: 5, max: 20 });
    scroll.aoe = chance.integer({ min: 1, max: 100 });
    return scroll;
  },
  weapon: function (environment) {
    var weapon = new WeaponServer();
    mockItem(weapon);
    weapon.lifespan = chance.integer({ min: 0, max: 100 });
    weapon.attack = chance.integer({ min: 10, max: 200 });
    if (environment instanceof EnvironmentServer) {
      weapon.effect = chance.pick(environment.effects);
    }
    return weapon;
  },
  cell: function (width, height) {
    var cell = chance.weighted([Mockup.emptyCell, Mockup.church, Mockup.portal, Mockup.town, Mockup.treasure],
    [90, 2.5, 2.5, 2.5, 2.5])();
    cell.position = new Position(chance.integer({ min: 0, max: width || 100 }), chance.integer({ min: 0, max: height || 100 }));
    return cell;
  },
  emptyCell: function () {
    var cellServer = new CellServer();
    mockCell(cellServer);
    return cellServer;
  },
  church: function () {
    var church = new ChurchServer();
    mockCell(church);
    return church;
  },
  portal: function () {
    var portal = new PortalServer();
    mockCell(portal);
    // portal.destination
    return portal;
  },
  town: function () {
    var town = new TownServer();
    mockCell(town);
    town.income = chance.integer({ min: 10, max: 500 });
    return town;
  },
  treasure: function () {
    var treasure = new TreasureServer();
    mockCell(treasure);
    // treasure.contents
    return treasure;
  },

  uniquePath: function (places, paths) {
    var path = new Path();
    do {
      path.exit1 = chance.pick(places);
      path.exit2 = chance.pick(places);
    } while(path.exit1.id === path.exit2.id || !isUniquePath(path, paths));
    return path;
  },
  randomPlayer: function (environment) {
    return chance.pick(environment.players);
  },
  randomCell: function (environment) {
    return chance.pick(chance.pick(environment.maps).places);
  }
};

module.exports = Mockup;
