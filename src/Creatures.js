import React from "react"
import map from "lodash/fp/map"
import Creature from "./Creature"

const mapWithIndex = map.convert({ cap: false })

const Creatures = ({ genomes, title, onSelectParent }) => {
  const renderCreatures = mapWithIndex((genome, i) => {
    return (
      <Creature
        genome={genome}
        key={i}
        onClick={() => onSelectParent(genome)}
      />
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      {renderCreatures(genomes)}
    </div>
  )
}

export default Creatures
