import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import mean from 'lodash/fp/mean'
import Round from './Round'
import GenerateCreature from './GenerateCreature'

describe('When 2 creatures fight', () => {
  it('should reduce the health of the attacking armless creature by 10 each turn', () => {
      const armlessCreature = {
        health: 100,
        arms: 0,
        body: 1,
        legs: 0,
      }
      const {attacker, defender} = Round(armlessCreature, armlessCreature)
      expect(attacker.health).toBe(90)
  })

  it('should reduce the health of the weaker attacking creature by 5 each turn', () => {
      const armlessCreature = {
        health: 100,
        arms: 0,
        body: 0.5,
        legs: 0,
      }
      const {attacker, defender} = Round(armlessCreature, armlessCreature)
      expect(attacker.health).toBe(95)
  })

  it('should reduce the health of the ULTIMATE CREATURE by 30', () => {
      const ultimateCreature = {
        health: 100,
        arms: 1,
        body: 1,
        legs: 1,
      }
      const {attacker, defender} = Round(ultimateCreature, ultimateCreature)
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

      const {attacker, defender} = Round(ultimateCreature, pushupCreature)
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

      const {attacker, defender} = Round(ultimateCreature, pushupCreature)
      expect(defender.health).toBe(95)
  })

  it('If the attacker dies before it can attack, it shouldnt hurt the defender', () => {
      const ultimateCreature = {
        health: 10,
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

      const {attacker, defender} = Round(ultimateCreature, pushupCreature)
      expect(defender.health).toBe(100)
  })

  it('If a hard-hitting creature hits a tank, it should absorb less damage', ()=> {
    const pushupCreature = {
      health: 100,
      arms: 1,
      body: 0,
      legs: 0,
    }

    const tankCreature = {
      health: 100,
      arms: 0,
      body: 1,
      legs: 0,
    }
    const {attacker, defender} = Round(pushupCreature, tankCreature)
    expect(defender.health).toBe(95)
  })


  it('If a hard-hitting creature is up against a runner, the runner should be hit 50% of the time', ()=> {
    const pushupCreature = {
      health: 100,
      arms: 1,
      body: 0,
      legs: 0,
    }

    const runnerCreature = {
      health: 100,
      arms: 0,
      body: 0,
      legs: 1,
    }
    const results =  times(()=> Round(pushupCreature, runnerCreature), 1000)
    const averageDefenderHealth = mean(map('defender.health',results))
    expect(averageDefenderHealth).toBeGreaterThan(90)
  })

})
