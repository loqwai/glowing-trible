import random from 'lodash/fp/random'
import each   from 'lodash/fp/each'
const randomWithFloat = random.convert({fixed: false})
const GenerateCreature = (properties) => {
  const child = {}
  each((property) => {
    child[property] = randomWithFloat(0.0, 1.0, true)
  }, properties)
  return child
}

export default GenerateCreature
