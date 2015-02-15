/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var GameGeneralPanel = React.createClass({
  render: function () {
    var avatarStyle = {
      'backgroundImage': 'url(http://cdn8.staztic.com/app/a/5112/5112202/rubick-loadout-1-l-48x48.png)'
    };

    return (
      <div>
        <div className="player-info">
          <div className="avatar player-avatar" style={ avatarStyle }></div>
          <div className="player-info-item">
            <div className="player-info-item-main highlight">Micheal Bay</div>
            <div className="player-info-item-sub">Player</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">1st</div>
            <div className="player-info-item-sub">Ranking</div>
          </div>
          <div className="player-info-item">
            <div className="player-info-item-main">2000</div>
            <div className="player-info-item-sub">Hours</div>
          </div>
        </div>
        <ul className="nav player-nav">
          <li className="active"><a href="#">Items</a></li>
          <li><a href="#">Badges</a></li>
          <li><a href="#">Friends</a></li>
        </ul>
        <div className="player-tab">
          <div className="player-item-list">
            <div className="player-item-list-item">
              <div className="game-object banana"></div>
            </div>
            <div className="player-item-list-item">
              <div className="game-object red-fruit"></div>
            </div>
            <div className="player-item-list-item">
              <div className="game-object nut"></div>
            </div>
              <div className="player-item-list-item">
                <div className="game-object banana"></div>
              </div>
              <div className="player-item-list-item">
                <div className="game-object red-fruit"></div>
              </div>
              <div className="player-item-list-item">
                <div className="game-object nut"></div>
              </div>
                <div className="player-item-list-item">
                  <div className="game-object banana"></div>
                </div>
                <div className="player-item-list-item">
                  <div className="game-object red-fruit"></div>
                </div>
                <div className="player-item-list-item">
                  <div className="game-object nut"></div>
                </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GameGeneralPanel;
