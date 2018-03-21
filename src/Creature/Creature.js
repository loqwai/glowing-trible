import React from 'react'
import { withStyles } from 'material-ui/styles'

import Arms from './Arms'
import Body from './Body'
import Head from './Head'
import Legs from './Legs'

const styles = {
  root: {
    cursor: 'pointer',
  },
}

const Creature = ({ className, classes, genome, onClick }) => (
  <svg onClick={onClick} className={[className, classes.root].join(' ')}>
    <title>{JSON.stringify(genome, null, 2)}</title>

    <Legs power={genome.legs.power} />
    <Arms power={genome.arms.power} />
    <Body power={genome.body.power} color={genome.body.color} />
    <Head
      color={genome.head.color}
      eyes={genome.head.eyes}
      shape={genome.head.shape}
      mouth={genome.head.mouth}
    />
  </svg>
)

export default withStyles(styles)(Creature)
