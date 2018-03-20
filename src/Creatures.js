import React from "react"
import Creature from "./Creature"
import map from "lodash/fp/map"

const renderCreatures = map(genome => <Creature genome={genome} />)

const Creatures = ({ genomes }) => {
  return <div>{renderCreatures(genomes)}</div>
}

export default Creatures
