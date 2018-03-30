import GenerateCreature  from './GenerateCreature'
import keys from 'lodash/fp/keys'
import isEqual from 'lodash/fp/isEqual'

describe('when generating a creature', () => {
  it('should create a creature', async () => {
    const creature = await GenerateCreature()
    expect(creature).toBeTruthy()
    expect(creature.id).toBeDefined()
  })
})
