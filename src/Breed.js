import sample from 'lodash/fp/sample'
import first  from 'lodash/fp/first'
import last   from 'lodash/fp/last'
import mean   from 'lodash/fp/mean'
import map    from  'lodash/fp/map'

const Breed = (genomes) => {
  const luminosities = map('luminosity', genomes)
  const geneSelector = sample([sample, mean])  
  return {luminosity: geneSelector(luminosities)}
}

export default Breed
