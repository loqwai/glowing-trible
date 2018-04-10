import cloneDeep from 'lodash/fp/cloneDeep'
import eats from './eats'

const Round = ({ leftCreature, rightCreature }) => {
  const eatsAction = {
    action: 'eats',
    leftCreature: eats(leftCreature),
    rightCreature: { damageDone: 0, damageTaken: 0, health: 100 },
  }

  const damageDone = 10 * rightCreature.body
  const hitsAction = {
    action: 'hits',
    leftCreature: { ...eatsAction.leftCreature, damageDone: damageDone, damageTaken: 0 },
    rightCreature: { damageDone: 0, damageTaken: damageDone, health: rightCreature.health - damageDone },
  }
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
