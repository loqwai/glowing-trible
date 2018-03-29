import random from "lodash/fp/random"
import cloneDeep from 'lodash/fp/cloneDeep'
const randomWithFloat = random.convert({ fixed: false })
const Round = (attacker, defender) =>  {
  const energyDrainMultiplier = 10
  const attackMultiplier = 20
  const bodyDivisor = 2 //make smaller for the body to soak more

  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  const attackerDamage = (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier + 1
  const  outcome = {attackerDamage, defenderDamage: 0}

  attacker.health -= attackerDamage
  if(attacker.health <= 0) {
      outcome.action = 'starves'
    return {attacker, defender, outcome}
  }

  let defenderDamage = attacker.arms * attackMultiplier
  const damageSoaker  =  1 - (defender.body / bodyDivisor)
  if (damageSoaker > 0) {
    defenderDamage *=  damageSoaker
  }

  defender.health -= defenderDamage
  outcome.action = 'hits'
  outcome.defenderDamage = defenderDamage
  return {attacker, defender, outcome}
}

export default Round
