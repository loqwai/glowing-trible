import React from "react"
import Creature from "./Creature"
import map from "lodash/fp/map"

const mapWithIndex = map.convert({ cap: false })

const renderCreatures = mapWithIndex((genome, i) => (
  <Creature genome={genome} key={i} />
))

const Creatures = ({ genomes }) => {
  return <div>{renderCreatures(genomes)}</div>
}

export default Creatures
