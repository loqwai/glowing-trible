const cloneDeep = require('lodash/fp/cloneDeep')
const Fight = (attacker, defender) =>  {
  const energyDrainMultiplier = 10
  const attackMultiplier = 10
  const bodyMultiplier = 5
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)

  attacker.health -= (attacker.body + attacker.legs + attacker.arms) * energyDrainMultiplier
  if(attacker.health <= 0) {
    return [attacker, defender]
  }

  defender.health -= ((attacker.arms * attackMultiplier) - (defender.body * bodyMultiplier))
  return [attacker, defender]
}

export default Fight
