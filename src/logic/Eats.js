const energyDrainMultiplier = 13

const Hits = ({ arms, body, legs }) => {
  return (arms + body + legs) * energyDrainMultiplier
}
export default Hits
