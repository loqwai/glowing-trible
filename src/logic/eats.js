const energyDrainMultiplier = 10

const Hits = ({ arms, body, legs, health }) => {
  const damageTaken = (arms + body + legs) * energyDrainMultiplier
  return {
    damageDone: 0,
    damageTaken,
    health: health - damageTaken,
  }
}
export default Hits
