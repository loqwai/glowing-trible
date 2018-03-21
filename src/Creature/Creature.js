import React from 'react'
import { withStyles } from 'material-ui/styles'

import Arms from './Arms'
import Body from './Body'
import Head from './Head'
import Legs from './Legs'
import Stats from './Stats'

const styles = {
  root: {
    cursor: 'pointer',
  },
}

const Creature = ({ className, classes, genome, onClick }) => {
  const legHeight = genome.legs.power * 100
  const creatureHeight = 150 + 40 + legHeight + 15
  const y = 300 - creatureHeight

  return (
    <svg onClick={onClick} className={classes} width="100" height="350">
      <title>{JSON.stringify(genome, null, 2)}</title>

      <svg y={y} height={creatureHeight}>
        <Legs power={genome.legs.power} color={genome.legs.color} />
        <Arms power={genome.arms.power} color={genome.arms.color} />
        <Body power={genome.body.power} color={genome.body.color} />
        <Head
          color={genome.head.color}
          eyes={genome.head.eyes}
          shape={genome.head.shape}
          mouth={genome.head.mouth}
        />
      </svg>
      <svg y="300" height="50">
        <Stats
          arms={genome.arms.power}
          body={genome.body.power}
          legs={genome.legs.power}
        />
      </svg>
    </svg>
  )
}

export default withStyles(styles)(Creature)
