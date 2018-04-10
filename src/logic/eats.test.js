import eats from './eats'

describe('When a creature eats', () => {
  describe('With a weak everything', () => {
    it('should take 0 damage', () => {
      const result = eats({ arms: 0.0, body: 0.0, legs: 0.0, health: 100 })
      expect(result).toEqual({
        damageDone: 0,
        damageTaken: 0,
        health: 100,
      })
    })
  })

  describe('With a strong everything', () => {
    it('should take 39 damage', () => {
      const result = eats({ arms: 1.0, body: 1.0, legs: 1.0, health: 100 })
      expect(result).toEqual({
        damageDone: 0,
        damageTaken: 39,
        health: 61,
      })
    })
  })
})
