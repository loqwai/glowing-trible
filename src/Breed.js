import sample from 'lodash/fp/sample'
import mean   from 'lodash/fp/mean'
import map    from 'lodash/fp/map'
import each   from 'lodash/fp/each'
import random from 'lodash/fp/random'

const randomWithFloat = random.convert({fixed: false})
const eachWithKey = each.convert({cap: false})

const Breed = (genomes) => {
  const child = {}
  const favoriteParent = sample(genomes)
  const mutationRate = favoriteParent.mutationRate || 0

  eachWithKey((value, key) => {
    if(randomWithFloat(0,1) < mutationRate) {
      child[key] = randomWithFloat(0,1, true)
      return
    }
    const geneSelector = sample([sample, mean])
    const props = map(key, genomes)
    child[key] = geneSelector(props)

  }, favoriteParent)

  return child
}

export default Breed
