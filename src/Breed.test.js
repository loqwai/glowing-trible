import Breed from './Breed'
import times from 'lodash/fp/times'
import some from 'lodash/fp/some'
import reject from 'lodash/fp/reject'

describe('when breeding two creatures together', () => {
  const genome1  = {mutationRate: 0.1, luminosity: 0, hue: 0}
  const genome2  = {mutationRate: 0.1, luminosity: 1, hue: 1}
  const children =  times(()=> Breed([genome1, genome2]), 1000)

  it('should sometimes create a creature with a mixed luminosity', () => {
      expect(some({luminosity: 0.5}, children)).toBe(true)
  })

  it('should sometimes create a creature with a luminosity of 0', () => {
      expect(some({luminosity: 0}, children)).toBe(true)
  })

  it('should sometimes create a creature with a luminosity of 1', () => {
      expect(some({luminosity: 1}, children)).toBe(true)
  })

  it('should sometimes create a creature with a mixed hue', () => {
      expect(some({hue: 0.5}, children)).toBe(true)
  })

  it('should sometimes create a creature with a hue of 0', () => {
      expect(some({hue: 0}, children)).toBe(true)
  })

  it('should sometimes create a creature with a hue of 1', () => {
      expect(some({hue: 1}, children)).toBe(true)
  })

  it('should sometimes not be 0,1, or 0.5', () => {
    const mutatedCreatures = reject({luminosity: 1},
                              reject({luminosity: 0},
                                reject({luminosity: 0.5}, children)))
    expect(mutatedCreatures.length).not.toBe(0)

  })
})
