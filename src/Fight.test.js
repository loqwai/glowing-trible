import Fight from './Fight'
import GenerateCreature from './GenerateCreature'

describe('When 2 creatures fight', () => {
  it('should reduce the health of the attacking armless creature by 10 each turn', () => {
      const armlessCreature = {
        health: 100,
        arms: 0,
        body: 1,
        legs: 0,
      }
      const [attacker, defender] = Fight(armlessCreature, armlessCreature)
      expect(attacker.health).toBe(90)
  })

  it('should reduce the health of the weaker attacking creature by 5 each turn', () => {
      const armlessCreature = {
        health: 100,
        arms: 0,
        body: 0.5,
        legs: 0,
      }
      const [attacker, defender] = Fight(armlessCreature, armlessCreature)
      expect(attacker.health).toBe(95)
  })

  it('should reduce the health of the ULTIMATE CREATURE by 30', () => {
      const ultimateCreature = {
        health: 100,
        arms: 1,
        body: 1,
        legs: 1,
      }
      const [attacker, defender] = Fight(ultimateCreature, ultimateCreature)
      expect(attacker.health).toBe(70)
  })

  it('should let a strong creature hit a creature with a weak body for 10', () => {
      const ultimateCreature = {
        health: 100,
        arms: 1,
        body: 1,
        legs: 1,
      }

      const pushupCreature = {
        health: 100,
        arms: 1,
        body: 0,
        legs: 0,
      }

      const [attacker, defender] = Fight(ultimateCreature, pushupCreature)
      expect(defender.health).toBe(90)
  })

  it('should let a kinda strong creature hit a creature with a weak body for 5', () => {
      const ultimateCreature = {
        health: 100,
        arms: 0.5,
        body: 1,
        legs: 1,
      }

      const pushupCreature = {
        health: 100,
        arms: 1,
        body: 0,
        legs: 0,
      }

      const [attacker, defender] = Fight(ultimateCreature, pushupCreature)
      expect(defender.health).toBe(95)
  })

})
