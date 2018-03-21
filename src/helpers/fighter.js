const creatureToFighter = ({ genome, health = 100 }) => ({
  health: 100,
  arms: genome.arms.power,
  body: genome.body.power,
  legs: genome.legs.power,
})
