import isArray from 'lodash/fp/isArray'
import last    from 'lodash/fp/last'
import first   from 'lodash/fp/first'

import GenerateCreature from './GenerateCreature'
import Fight from './Fight'

describe('When 2 creatures fight', () => {
  const weakCreature = {
    health: 100,
    arms: 0,
    body: 0,
    legs: 0,
  }

  const pushupCreature = {
    health: 100,
    arms: 1,
    body: 0,
    legs: 0,
  }

  const fightLog  = Fight(weakCreature, pushupCreature)
  const firstEntry = first(fightLog)
  const lastEntry = last(fightLog)
  it('should return an array of actions occuring in a fight', () => {
    expect(isArray(fightLog)).toBeTruthy()
  })

  it('should return an array with the first item being an "eats" event', () => {
    expect(firstEntry.outcome.action).toBe('eats')
  })

  it('should return an array with the last item being a "dies" event', () => {
    console.log(lastEntry)
    expect(lastEntry.outcome.action).toBe('dies')
  })

})
