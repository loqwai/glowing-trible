import uuid from 'uuid'

export const creatureToFighter = ({ genome, health = 100, id }) => ({
  health: 100,
  arms: genome.arms.power,
  body: genome.body.power,
  legs: genome.legs.power,
  id: id,
})

export const genomeToCreature = (genome) => ({
  health: 100,
  id: uuid.v4(),
  genome,
})
