import map from 'lodash/fp/map'
import set from 'lodash/fp/set'
import times from 'lodash/fp/times'
import GenerateCreature from './GenerateCreature'

const GenerateSuitors = async number => {
  const creatures = await Promise.all(times(GenerateCreature, number))
  return map(set('mutationRate', 0.005), creatures)
}

export default GenerateSuitors
