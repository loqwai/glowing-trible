import shuffle from 'lodash/fp/shuffle'
import Round from './Round'
const Fight = (creature1, creature2) => {
  const log = []
  let [attacker, defender] = shuffle([creature1, creature2])
  var logEntry = {
    attacker,
    defender,
    outcome: {attackerDamage: 0, defenderDamage: 0, action: 'start'}
  }
  log.push(logEntry)
  while(logEntry.attacker.health > 0 && logEntry.defender.health > 0) {
    logEntry = Round(attacker, defender)
    attacker = logEntry.defender
    defender = logEntry.attacker
    log.push(logEntry)
  }

  return log
}
export default Fight
