import React from 'react'
import { withStyles } from 'material-ui/styles'

import Head from './Head'

const styles = {
  root: {
    cursor: 'pointer',
  },
}

// const formatPercent = n => `${n}%`

const Creature = ({ className, classes, genome, onClick }) => (
  <svg onClick={onClick} className={[className, classes.root].join(' ')}>
    <title>{JSON.stringify(genome, null, 2)}</title>

    <Head
      color={genome.head.color}
      eyes={genome.head.eyes}
      shape={genome.head.shape}
    />
  </svg>
)

export default withStyles(styles)(Creature)
