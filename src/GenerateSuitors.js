import map from 'lodash/fp/map'
import set from 'lodash/fp/set'
import times from 'lodash/fp/times'
import GenerateCreature from './GenerateCreature'
import { mutationRate } from './Configuration.json'

const GenerateSuitors = async number => {
  const creatures = await Promise.all(times(GenerateCreature, number))
  return map(set('mutationRate', mutationRate), creatures)
}

export default GenerateSuitors
