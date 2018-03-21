import React from 'react'
import noop from 'lodash/fp/noop'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'

import Arms from './Arms'
import Body from './Body'
import Head from './Head'
import Legs from './Legs'

const AddIcon = ({ added }) => {
  if (added) return null

  return <Icon>add_circle_outline</Icon>
}

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
        color={genome.head.color}
        eyes={genome.head.eyes}
        shape={genome.head.shape}
        mouth={genome.head.mouth}
        vOffset={vOffset}
      />
    </svg>
  )
}

export default Creature
