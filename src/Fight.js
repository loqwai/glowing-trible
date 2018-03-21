const cloneDeep = require('lodash/fp/cloneDeep')
const Fight = (creature1, creature2) =>  {
  creature1 = cloneDeep(creature1)
  creature2 = cloneDeep(creature2)
  creature1.health -= (creature1.body + creature1.legs + creature1.arms) * 10
  return [creature1, creature2]
}

export default Fight
