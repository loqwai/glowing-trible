import React from 'react'
import noop from 'lodash/fp/noop'

import Arms from './Arms'
import Body from './Body'
import Head from './Head'
import Legs from './Legs'

const Creature = ({ className, genome, onClick = noop }) => {
  const legHeight = genome.legs.power * 100
  const creatureHeight = 150 + 40 + legHeight + 15
  const vOffset = 300 - creatureHeight

  return (
    <svg
      className={className}
      onClick={onClick}
      preserveAspectRatio="xMidYMax meet"
      viewBox="0 0 100 350"
    >
      <Legs
        power={genome.legs.power}
        color={genome.legs.color}
        vOffset={vOffset}
      />
      <Arms
        power={genome.arms.power}
        color={genome.arms.color}
        vOffset={vOffset}
      />
      <Body
        power={genome.body.power}
        color={genome.body.color}
        vOffset={vOffset}
      />
      <Head
        genome={genome.head}
        vOffset={vOffset}
      />
    </svg>
  )
}

export default Creature
