import random from "lodash/fp/random"
import cloneDeep from 'lodash/fp/cloneDeep'

const randomWithFloat = random.convert({ fixed: false })
const Round = (attacker, defender) =>  {
  const energyDrainMultiplier = 15
  const attackMultiplier = 50
  const bodyMultiplier = 2
  const legsDivider = 2

  const log = []
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  const attackerDamage = (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier + 1
  const  outcome = {attackerDamage, defenderDamage: 0}
  log.push({})
  attacker.health -= attackerDamage
  if(attacker.health <= 0) {
      outcome.action = 'starves'
    return {attacker, defender, outcome}
  }

  if( (defender.legs / legsDivider) > randomWithFloat(0,1, true)) {
    outcome.action = 'misses'
    return {attacker, defender, outcome}
  }

  let defenderDamage = attacker.arms * attackMultiplier
  if(defender.body > 0) {
      defenderDamage /= ((defender.body+1) * bodyMultiplier)
  }

  defender.health -= defenderDamage
  outcome.action = 'hits'
  outcome.defenderDamage = defenderDamage
  return {attacker, defender, outcome}
}

export default Round
