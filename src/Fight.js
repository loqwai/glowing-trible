const cloneDeep = require('lodash/fp/cloneDeep')
const Fight = (attacker, defender) =>  {
  attacker = cloneDeep(attacker)
  defender = cloneDeep(defender)
  attacker.health -= (attacker.body + attacker.legs + attacker.arms) * 10
  defender.health -= attacker.arms * 10
  return [attacker, defender]
}

export default Fight
