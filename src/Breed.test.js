import Breed  from './Breed'
import times  from 'lodash/fp/times'
import some from 'lodash/fp/some'

describe('when breeding two creatures together', () => {
  const genome1  = {luminosity: 0}
  const genome2  = {luminosity: 1}
  const children =  times(()=> Breed([genome1, genome2]), 1000)

  it('should sometimes create a creature with a mixed luminosity', () => {
      expect(some({luminosity: 0.5}, children)).toBe(true)
  })

  it('should sometimes create a creature with a luminosity of 0', () => {
      expect(some({luminosity: 0}, children)).toBe(true)
  })

  it('should sometimes create a creature with a luminosity of 0', () => {
      expect(some({luminosity: 1}, children)).toBe(true)
  })
})
