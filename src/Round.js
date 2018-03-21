import random from "lodash/fp/random"
import cloneDeep from 'lodash/fp/cloneDeep'

const randomWithFloat = random.convert({ fixed: false })
const Round = (attacker, defender) =>  {
  const energyDrainMultiplier = 10
  const attackMultiplier = 30
  const bodyMultiplier = 2
  const legsDivider = 2
  const  outcome = {}
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  const attackerDamage = (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier
  outcome.attackerDamage = attackerDamage

  attacker.health -= attackerDamage
  if(attacker.health <= 0) {
    return {attacker, defender}
  }

  if( (defender.legs / legsDivider) > randomWithFloat(0,1, true)) {
    return {attacker, defender}
  }

  let defenderDamage = attacker.arms * attackMultiplier
  if(defender.body > 0) {
      defenderDamage /= (defender.body * bodyMultiplier)
  }

  defender.health -= defenderDamage
  outcome.event = 'hit'
  outcome.defenderDamage = defenderDamage
  return {attacker, defender, outcome}
}

export default Round
