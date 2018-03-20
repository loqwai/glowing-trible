import sample from 'lodash/fp/sample'
import first  from 'lodash/fp/first'
import last   from 'lodash/fp/last'
import mean   from 'lodash/fp/mean'

const Breed = (genome1, genome2) => {
  const geneSelectors = [first, last, mean]
  const geneSelector = sample([first, last, mean])
  return {luminosity: geneSelector([genome1.luminosity, genome2.luminosity])}
}

export default Breed
