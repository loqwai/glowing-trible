import random from "lodash/fp/random"
import cloneDeep from 'lodash/fp/cloneDeep'

const randomWithFloat = random.convert({ fixed: false })
const Fight = (attacker, defender) =>  {
  const energyDrainMultiplier = 10
  const attackMultiplier = 10
  const bodyMultiplier = 5
  const legsDivider = 2
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  attacker.health -= (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier
  if(attacker.health <= 0) {
    return {attacker, defender}
  }

  if( (defender.legs / legsDivider) > randomWithFloat(0,1, true)) {
    return {attacker, defender}
  }

  defender.health -= ((attacker.arms * attackMultiplier) - (defender.body * bodyMultiplier))
  return {attacker, defender}
}

export default Fight
