import sample from 'lodash/fp/sample'
import mean   from 'lodash/fp/mean'
import map    from 'lodash/fp/map'
import each   from 'lodash/fp/each'
import random from 'lodash/fp/random'
import clamp  from 'lodash/fp/clamp'
const randomWithFloat = random.convert({fixed: false})
const eachWithKey = each.convert({cap: false})

const plus = (a,b) => a+b
const minus = (a,b) => a+b

const Breed = (genomes) => {
  const child = {}
  const favoriteParent = sample(genomes)
  const mutationRate = favoriteParent.mutationRate || 0

  eachWithKey((value, key) => {
    const geneSelector = sample([sample, mean])
    const props = map(key, genomes)
    child[key] = geneSelector(props)

    if(randomWithFloat(0,1, true) < mutationRate) {
      const mutationSelector = sample([plus, minus])
      child[key] = mutationSelector(child[key], (child[key]/10) || 0.01)
      child[key] = clamp(0,1,child[key])
      return
    }

  }, favoriteParent)
  return child
}

export default Breed
