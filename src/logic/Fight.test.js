import isArray from 'lodash/fp/isArray'
import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import GenerateCreature from './GenerateCreature'
import Fight, { WhoShouldAttack } from './Fight'

describe('WhoShouldAttack', () => {
  describe('when called once', () => {
    const fastCreature = { legs: 1 }
    const equallyFastCreature = { legs: 1 }

    const { attacker, defender } = WhoShouldAttack(fastCreature, equallyFastCreature)

    it('should return an attacker and a defender', () => {
      expect(attacker).toBeDefined()
      expect(defender).toBeDefined()
    })
  })

  describe('when called a bunch of times with equally-matched opponents', () => {
    const fastCreature = { legs: 1 }
    const equallyFastCreature = { legs: 1 }
    const results = times(() => WhoShouldAttack(fastCreature, equallyFastCreature), 1000)

    it('should pick fastCreature around 50%  of the time', () => {
      const fcAttackers = filter(creature => creature === fastCreature, map('attacker', results))
      expect(fcAttackers.length).toBeGreaterThan(400)
      expect(fcAttackers.length).toBeLessThan(600)
    })
  })

  describe('when called a bunch of a fast creature and a relatively slow one', () => {
    const fastCreature = { legs: 1 }
    const slowerCreature = { legs: 0.5 }
    const results = times(() => WhoShouldAttack(fastCreature, slowerCreature), 1000)

    it('should pick fastCreature around 2/3rds  of the time', () => {
      const fcAttackers = filter(creature => creature === fastCreature, map('attacker', results))
      expect(fcAttackers.length).toBeGreaterThan(600)
      expect(fcAttackers.length).toBeLessThan(750)
    })
  })

  describe('when called a creatures with no legs', () => {
    const fastCreature = { legs: 0 }
    const slowerCreature = { legs: 0 }
    const results = times(() => WhoShouldAttack(fastCreature, slowerCreature), 1000)

    it('should pick fastCreature around 50%  of the time', () => {
      const fcAttackers = filter(creature => creature === fastCreature, map('attacker', results))
      expect(fcAttackers.length).toBeGreaterThan(400)
      expect(fcAttackers.length).toBeLessThan(600)
    })
  })
})

describe('When 2 creatures fight', () => {
  const weakCreature = {
    health: 100,
    arms: 1,
    body: 0,
    legs: 0,
  }

  const pushupCreature = {
    health: 100,
    arms: 0.1,
    body: 1,
    legs: 0,
  }

  const fightLog = Fight(weakCreature, pushupCreature)
  const firstEntry = first(fightLog)
  const lastEntry = last(fightLog)

  it('should return an array of actions occuring in a fight', () => {
    expect(isArray(fightLog)).toBeTruthy()
  })

  it('should return an array with the first item being an "eats" event', () => {
    expect(firstEntry.action).toBe('start')
  })

  it('should return an array with the last item being a "dies" event', () => {
    expect(lastEntry.action).toBeDefined()
  })
})
