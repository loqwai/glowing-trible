import shuffle from 'lodash/fp/shuffle'
import cloneDeep from 'lodash/fp/cloneDeep'
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
    const eatsEntry = cloneDeep(logEntry)
    eatsEntry.outcome.action = 'eats'
    eatsEntry.defender = defender
    eatsEntry.outcome.defenderDamage = 0
    log.push(eatsEntry)
    logEntry.outcome.attackerDamage = 0
    log.push(logEntry)

    attacker = logEntry.defender
    defender = logEntry.attacker
  }
  const outcome = cloneDeep(logEntry.outcome)

  if(outcome.action === 'starves') {
    return log
  }

  outcome.action = "dies"
  log.push({attacker, defender, outcome})
  return log
}
export default Fight
