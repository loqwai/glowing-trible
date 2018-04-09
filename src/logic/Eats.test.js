import Eats from './Eats'

describe('When a creature eats', () => {
  describe('With a weak everything', () => {
    it('should return 0', () => {
      const damage = Eats({ arms: 0.0, body: 0.0, legs: 0.0 })
      expect(damage).toBeCloseTo(0)
    })
  })

  describe('With a strong everything', () => {
    it('should return 0', () => {
      const damage = Eats({ arms: 1.0, body: 1.0, legs: 1.0 })
      expect(damage).toBeCloseTo(39)
    })
  })
})
