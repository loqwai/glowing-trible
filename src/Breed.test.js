import Breed from './Breed'
import times from 'lodash/fp/times'
import some from 'lodash/fp/some'
import reject from 'lodash/fp/reject'
import GenerateCreature from './GenerateCreature'

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

  it('should sometimes be less than 0.5', () => {
    const mutatedCreatures = reject(
      creature => creature.luminosity >= 0.5, children)
    expect(mutatedCreatures.length).not.toBe(0)

  })

  it('should sometimes be greater than 0.5', () => {
    const mutatedCreatures = reject(
      creature => creature.luminosity > 0.5, children)
    expect(mutatedCreatures.length).not.toBe(0)
  })

})

describe('when breeding two creatures together with an array containing objects', () => {
  const genome1  = {
    mutationRate: 0.1,
    parts: [
      {aaronosity:1, mutationRate:0.1},
      {royishness:0, mutationRate: 0.1}
    ]
  }
  const genome2  = {
    mutationRate: 0.1,
    parts: [{cryptovision: 0}]
  }

  const children =  times(()=> Breed([genome1, genome2]), 1000)

  it('should sometimes create a creature with 1 part', () => {
      expect(some(({parts}) => parts.length == 1, children)).toBe(true)
  })
})

describe('when breeding two creatures together with nested properties', () => {
  const genome1  = {
    mutationRate: 0,
    head: {
      bigness: 0.5,
      noseHairs: 0.1
    }
  }
  const genome2  = {
    mutationRate: 0,
    head: {
      bigness: 0.9,
      noseHairs: 0.6
    }
  }

  const child =  Breed([genome1, genome2])

  it('should create a creature subproperties', () => {
    expect(child.head.bigness).toBeDefined()
  })
})

describe('when using some creatures generated by GenerateCreature', () => {
  it('should make a new creature', async () => {
    const creature1 = await GenerateCreature()
    const creature2 = await GenerateCreature()
    const child = Breed([creature1, creature2])
    expect(child).toBeDefined()
  })
})
