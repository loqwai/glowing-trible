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
      const [creature1, creature2] = Fight(armlessCreature, armlessCreature)
      expect(creature1.health).toBe(90)
  })

  it('should reduce the health of the weaker attacking creature by 5 each turn', () => {
      const armlessCreature = {
        health: 100,
        arms: 0,
        body: 0.5,
        legs: 0,
      }
      const [creature1, creature2] = Fight(armlessCreature, armlessCreature)
      expect(creature1.health).toBe(95)
  })

  it('should reduce the health of the ULTIMATE CREATURE by 30', () => {
      const armlessCreature = {
        health: 100,
        arms: 1,
        body: 1,
        legs: 1,
      }
      const [creature1, creature2] = Fight(armlessCreature, armlessCreature)
      expect(creature1.health).toBe(70)
  })

})
