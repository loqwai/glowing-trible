import GenerateCreature  from './GenerateCreature'
import keys from 'lodash/fp/keys'
import isEqual from 'lodash/fp/isEqual'

describe('when breeding two creatures together', () => {
  const properties = ['royishness', 'aaronosity' ]
  const creature   = GenerateCreature(properties)
  it('should create a creature', () => {
    expect(creature).toBeDefined()
  })

  it('should create a creature with all of the properties', () => {
    expect(keys(creature)).toEqual(expect.arrayContaining(properties))
  })

  it('should create a "parts" array', () => {
    expect(creature.parts).toBeTruthy
  })
})
