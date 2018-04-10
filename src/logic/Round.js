import cloneDeep from 'lodash/fp/cloneDeep'
import eats from './eats'

const buildEatsAction = ({ leftCreature, rightCreature, attacker }) => {
  if (attacker === 'left') {
    return {
      action: 'eats',
      leftCreature: eats(leftCreature),
      rightCreature: { damageDone: 0, damageTaken: 0, health: rightCreature.health },
    }
  }

  return {
    action: 'eats',
    leftCreature: { damageDone: 0, damageTaken: 0, health: leftCreature.health },
    rightCreature: eats(rightCreature),
  }
}

const buildHitsAction = ({ leftCreature, rightCreature, attacker, eatsAction }) => {
  if (attacker === 'left') {
    const damageDone = 10 * leftCreature.arms * (1 - rightCreature.body)
    return {
      action: 'hits',
      leftCreature: { damageDone: damageDone, damageTaken: 0, health: eatsAction.leftCreature.health },
      rightCreature: { damageDone: 0, damageTaken: damageDone, health: eatsAction.rightCreature.health - damageDone },
    }
  }

  const damageDone = 10 * leftCreature.body
  return {
    action: 'hits',
    leftCreature: { damageDone: 0, damageTaken: damageDone, health: eatsAction.leftCreature.health - damageDone },
    rightCreature: { damageDone: damageDone, damageTaken: 0, health: eatsAction.rightCreature.health },
  }
}

const Round = ({ leftCreature, rightCreature, attackerOverride }) => {
  const attacker = attackerOverride
  const eatsAction = buildEatsAction({ leftCreature, rightCreature, attacker })
  const hitsAction = buildHitsAction({ leftCreature, rightCreature, attacker, eatsAction })

  return [eatsAction, hitsAction]
  // const energyDrainMultiplier = 13
  // const attackMultiplier = 65
  // const bodyDivisor = 2.2 //make smaller for the body to soak more
  //
  // attacker = cloneDeep(attacker)
  // defender = cloneDeep(defender)
  //
  // const attackerDamage = (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier + 1
  // const outcome = { attackerDamage, defenderDamage: 0 }
  //
  // attacker.health -= attackerDamage
  // if (attacker.health <= 0) {
  //   outcome.action = 'starves'
  //   return [{ attacker, defender, outcome }]
  // }
  //
  // let defenderDamage = attacker.arms * attackMultiplier
  // const damageSoaker = 1 - defender.body / bodyDivisor
  // if (damageSoaker > 0) {
  //   defenderDamage *= damageSoaker
  // }
  //
  // defender.health -= defenderDamage
  // outcome.action = 'hits'
  // outcome.defenderDamage = defenderDamage
  // return [{ attacker, defender, outcome }]
}

export default Round
