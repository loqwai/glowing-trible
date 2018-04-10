import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import mean from 'lodash/fp/mean'
import some from 'lodash/fp/some'
import Round from './Round'
import GenerateCreature from './GenerateCreature'

describe('When 2 creatures fight', () => {
  let t = {}
  beforeEach(() => (t = {}))

  describe('When they are armless creatures', () => {
    beforeEach(() => {
      const armless = { health: 100, arms: 0, body: 1, legs: 1 }

      const logEntries = Round({
        leftCreature: armless,
        rightCreature: armless,
        attackerOverride: 'left',
      })

      const [eatsAction, hitsAction] = logEntries

      t.eatsAction = eatsAction
      t.hitsAction = hitsAction
    })

    it('should reduce the health of the attacking creature by 26 with an eat action', () => {
      expect(t.eatsAction).toEqual({
        action: 'eats',
        leftCreature: { damageDone: 0, damageTaken: 26, health: 74 },
        rightCreature: { damageDone: 0, damageTaken: 0, health: 100 },
      })
    })

    it('should reduce the health of the defending creature by 10', () => {
      expect(t.hitsAction).toEqual({
        action: 'hits',
        leftCreature: { damageDone: 10, damageTaken: 0, health: 74 },
        rightCreature: { damageDone: 0, damageTaken: 10, health: 90 },
      })
    })
  })

  describe('when the creatures have no arms & legs and just a half body', () => {
    beforeEach(() => {
      const halfBodiedCreature = {
        health: 100,
        arms: 0,
        body: 0.5,
        legs: 0,
      }

      const logEntries = Round({
        leftCreature: halfBodiedCreature,
        rightCreature: halfBodiedCreature,
        attackerOverride: 'left',
      })

      const [eatsAction, hitsAction] = logEntries
      t = { ...t, eatsAction, hitsAction }
    })

    it('should create an eatsAction that does 6.5 damage', () => {
      expect(t.eatsAction).toEqual({
        action: 'eats',
        leftCreature: { damageDone: 0, damageTaken: 6.5, health: 93.5 },
        rightCreature: { damageDone: 0, damageTaken: 0, health: 100 },
      })
    })

    it('should create a hitsAction that does X damage', () => {
      expect(t.hitsAction).toEqual({
        action: 'hits',
        leftCreature: { damageDone: 5, damageTaken: 0, health: 93.5 },
        rightCreature: { damageDone: 0, damageTaken: 5, health: 95 },
      })
    })
  })

  // describe('When they have huge arms and no body', () => {
  //   it('should do 65 damage', () => {
  //     const creature = {
  //       health: 100,
  //       arms: 1,
  //       body: 0,
  //       legs: 0,
  //     }
  //     const [{ outcome }] = Round(creature, creature)
  //     expect(outcome).toEqual({
  //       action: 'hits',
  //       defenderDamage: 65,
  //       attackerDamage: 14,
  //     })
  //   })
  // })
  //
  // describe('when the creature has perfect everything', () => {
  //   it('should reduce the health of the ULTIMATE CREATURE by 35.45', () => {
  //     const ultimateCreature = {
  //       health: 100,
  //       arms: 1,
  //       body: 1,
  //       legs: 1,
  //     }
  //     const [{ outcome }] = Round(ultimateCreature, ultimateCreature)
  //     expect(outcome.defenderDamage).toBeCloseTo(35.45)
  //   })
  // })
  //
  // describe('kinda strong ceature vs weak body', () => {
  //   it('should do 32.5 damage', () => {
  //     const creature = {
  //       health: 100,
  //       arms: 0.5,
  //       body: 0,
  //       legs: 0,
  //     }
  //
  //     const [{ outcome }] = Round(creature, creature)
  //     expect(outcome.defenderDamage).toBeCloseTo(32.5)
  //   })
  // })
  //
  // describe('If the attacker dies before it can attack', () => {
  //   it('should emit the correct outcome', () => {
  //     const creature = {
  //       health: 10,
  //       arms: 1,
  //       body: 1,
  //       legs: 1,
  //     }
  //
  //     const [{ outcome }] = Round(creature, creature)
  //     expect(outcome).toEqual({
  //       action: 'starves',
  //       attackerDamage: 40,
  //       defenderDamage: 0,
  //     })
  //   })
  // })
  //
  // describe('a big arm creature hits a tank', () => {
  //   it('it should absorb less damage', () => {
  //     const creature = {
  //       health: 100,
  //       arms: 1,
  //       body: 1,
  //       legs: 0,
  //     }
  //
  //     const [{ defender }] = Round(creature, creature)
  //     expect(defender.health).toBeCloseTo(64.545)
  //   })
  // })
  //
  // describe('when a weak creature hits a tank', () => {
  //   it('should not do damage', () => {
  //     const creature = {
  //       health: 100,
  //       arms: 0,
  //       body: 1,
  //       legs: 0,
  //     }
  //
  //     const [{ outcome }] = Round(creature, creature)
  //     expect(outcome.defenderDamage).toBeCloseTo(0)
  //   })
  // })
})
