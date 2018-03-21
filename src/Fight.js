import shuffle from 'lodash/fp/shuffle'
import Round from './Round'
const Fight = (creature1, creature2) => {
  const [attacker, defender] = shuffle([creature1, creature2])
  return []
}
export default Fight
