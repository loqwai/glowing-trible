import random from "lodash/fp/random"
import cloneDeep from 'lodash/fp/cloneDeep'

const randomWithFloat = random.convert({ fixed: false })
const Round = (attacker, defender) =>  {
  const energyDrainMultiplier = 10
  const attackMultiplier = 30
  const bodyMultiplier = 2
  const legsDivider = 2
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  const attackerDamage = (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier
  const  outcome = {attackerDamage, defenderDamage: 0}

  attacker.health -= attackerDamage
  if(attacker.health <= 0) {
    outcome.event = 'starve'
    return {attacker, defender, outcome}
  }

  if( (defender.legs / legsDivider) > randomWithFloat(0,1, true)) {
    outcome.event = 'miss'
    return {attacker, defender, outcome}
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
