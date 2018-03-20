import sample from 'lodash/fp/sample'
import first  from 'lodash/fp/first'
import last   from 'lodash/fp/last'
import mean   from 'lodash/fp/mean'
import map    from 'lodash/fp/map'
import each   from 'lodash/fp/each'

const eachWithKey = each.convert({cap: false})

const Breed = (genomes) => {
  const child = {}
  const favoriteParent = sample(genomes)
  eachWithKey((value, key) => {
    const geneSelector = sample([sample, mean])
    const props = map(key, genomes)
    child[key] = geneSelector(props)
  }, favoriteParent)
  
  return child
}

export default Breed
