import React from "react"
import map from "lodash/fp/map"
import styled from "styled-components"
import Creature from "./Creature"

const mapWithIndex = map.convert({ cap: false })

const renderCreatures = mapWithIndex((genome, i) => (
  <Creature genome={genome} key={i} />
))

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`

const Creatures = ({ genomes }) => {
  return <Column>{renderCreatures(genomes)}</Column>
}

export default Creatures
