'use strict';

var BattleLogType = {
  ATTACK: 'BATTLE_LOG_ATTACK',
  BE_ATTACKED: 'BATTLE_LOG_BE_ATTACKED',
  BUFF_ACTIVATE: 'BATTLE_LOG_BUFF_ACTIVATE',
  DEBUFF_ACTIVATE: 'BATTLE_LOG_DEBUFF_ACTIVATE',
  BUFF_EXPIRED: 'BATTLE_LOG_BUFF_EXPIRED',
  DEBUFF_EXPIRED: 'BATTLE_LOG_DEBUFF_EXPIRED',
  DIED: 'BATTLE_LOG_DIED',
  RESPAWN: 'BATTLE_LOG_RESPAWN'
};

module.exports = BattleLogType;