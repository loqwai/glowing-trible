import random from 'lodash/fp/random'
import each   from 'lodash/fp/each'
import times  from 'lodash/fp/times'
const randomWithFloat = random.convert({fixed: false})
const GenerateCreature = (properties) => {
  const child = {}
  each((property) => {
    child[property] = randomWithFloat(0.0, 1.0, true)
  }, properties)

  if(random(0,2) !== 0) return child

  child.parts = []
  times(() => {
    child.parts.push(GenerateCreature(properties))
  }, random(0,4))

  return child
}

export default GenerateCreature
