import cloneDeep from 'lodash/fp/cloneDeep'
import Round from './Round'
import random from "lodash/fp/random"
import isNaN from 'lodash/fp/isNaN'

const randomWithFloat = random.convert({ fixed: false })

export const WhoShouldAttack = (creature1, creature2) => {

  let creature1Ratio = creature1.legs / (creature1.legs + creature2.legs)
  if(isNaN(creature1Ratio)) creature1Ratio = 0.5

  if(randomWithFloat(0, 1, true) < creature1Ratio)
    return {attacker: creature1, defender: creature2}
  return {attacker: creature2, defender: creature1}
}

const Fight = (creature1, creature2) => {
  const log = []
  let {attacker, defender} = WhoShouldAttack(creature1, creature2)

  var logEntry = {
    attacker,
    defender,
    outcome: {attackerDamage: 0, defenderDamage: 0, action: 'start'}
  }

  log.push(logEntry)

  while(logEntry.attacker.health > 0 && logEntry.defender.health > 0) {

    const fightOrder = WhoShouldAttack(logEntry.attacker, logEntry.defender)
    logEntry = Round(fightOrder.attacker, fightOrder.defender)

    const eatsEntry = cloneDeep(logEntry)
    eatsEntry.outcome.action = 'eats'
    eatsEntry.defender = defender
    eatsEntry.outcome.defenderDamage = 0
    log.push(eatsEntry)
    logEntry.outcome.attackerDamage = 0
    log.push(logEntry)
  }
  const outcome = cloneDeep(logEntry.outcome)

  if(outcome.action === 'starves') {
    log.push({
      attacker: logEntry.defender,
      defender: logEntry.attacker,
      outcome: {
        action: 'wins',
        defenderDamage: 0,
        attackerDamage: 0,
      }
    })
    return log
  }

  outcome.action = "dies"
  log.push({defender: logEntry.defender, attacker: logEntry.defender, outcome})
  log.push({
    attacker: logEntry.attacker,
    defender: logEntry.defender,
    outcome: {
      action: 'wins',
      defenderDamage: 0,
      attackerDamage: 0,
    }
  })
  return log
}
export default Fight
