import cloneDeep from 'lodash/fp/cloneDeep'
import Round from './Round'
import find from 'lodash/fp/find'
import map from 'lodash/fp/map'
import random from 'lodash/fp/random'
import isNaN from 'lodash/fp/isNaN'

const randomWithFloat = random.convert({ fixed: false })

export const WhoShouldAttack = (leftCreature, rightCreature) => {
  let leftCreatureRatio = leftCreature.legs / (leftCreature.legs + rightCreature.legs)
  if (isNaN(leftCreatureRatio)) leftCreatureRatio = 0.5

  if (randomWithFloat(0, 1, true) < leftCreatureRatio) return { attacker: leftCreature, defender: rightCreature }
  return { attacker: rightCreature, defender: leftCreature }
}

const damageDone = (id, logEntry) => {
  if (id === logEntry.defender.id) return logEntry.outcome.attackerDamage
  return logEntry.outcome.defenderDamage
}

const damageTaken = (id, logEntry) => {
  if (id === logEntry.attacker.id) return logEntry.outcome.attackerDamage
  return logEntry.outcome.defenderDamage
}

const transformAugmentedLogEntry = ({ leftCreatureId, logEntry, rightCreatureId }) => {
  const leftCreature = find({ id: leftCreatureId }, logEntry)
  const rightCreature = find({ id: rightCreatureId }, logEntry)

  return {
    action: logEntry.outcome.action,
    leftCreature: {
      ...leftCreature,
      damageDone: damageDone(leftCreatureId, logEntry),
      damageTaken: damageTaken(leftCreatureId, logEntry),
    },
    rightCreature: {
      ...rightCreature,
      damageDone: damageDone(rightCreatureId, logEntry),
      damageTaken: damageTaken(rightCreatureId, logEntry),
    },
  }
}

const transformLog = ({ leftCreatureId, log, rightCreatureId }) => {
  const augmentedLog = map(logEntry => ({ leftCreatureId, rightCreatureId, logEntry }), log)
  return map(transformAugmentedLogEntry, augmentedLog)
}

const Fight = (leftCreature, rightCreature) => {
  const log = []
  const leftCreatureId = leftCreature.id
  const rightCreatureId = rightCreature.id

  let { attacker, defender } = WhoShouldAttack(leftCreature, rightCreature)

  var logEntry = {
    attacker,
    defender,
    outcome: { attackerDamage: 0, defenderDamage: 0, action: 'start' },
  }

  log.push(logEntry)

  while (logEntry.attacker.health > 0 && logEntry.defender.health > 0) {
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

  if (outcome.action === 'starves') {
    log.push({
      attacker: logEntry.defender,
      defender: logEntry.attacker,
      outcome: {
        action: 'wins',
        defenderDamage: 0,
        attackerDamage: 0,
      },
    })
    return transformLog({ leftCreatureId, log, rightCreatureId })
  }

  outcome.action = 'dies'
  log.push({ defender: logEntry.defender, attacker: logEntry.defender, outcome })
  log.push({
    attacker: logEntry.attacker,
    defender: logEntry.defender,
    outcome: {
      action: 'wins',
      defenderDamage: 0,
      attackerDamage: 0,
    },
  })
  return transformLog({ leftCreatureId, log, rightCreatureId })
}
export default Fight
