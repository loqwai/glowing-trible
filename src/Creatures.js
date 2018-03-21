import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'
import Creature from './Creature'

const mapWithIndex = map.convert({ cap: false })

const styles = {
  root: {
    backgroundColor: '#f5f5f5',
    margin: '1em 0 1em 1em',
    padding: '1em',
    '&:last-child': {
      'margin-right': '1em',
    },
  },
  Creature: {
    width: '100px',
    height: '100px',
  },
  Creatures: {
    display: 'flex',
  },
}

const Creatures = ({ classes, genomes, title, onSelectParent }) => {
  const renderCreatures = mapWithIndex((genome, i) => {
    return (
      <Creature
        className={classes.Creature}
        genome={genome}
        key={i}
        onClick={() => onSelectParent(genome)}
      />
    )
  })

  return (
    <div className={classes.root}>
      <h3>{title}</h3>
      <div className={classes.Creatures}>{renderCreatures(genomes)}</div>
    </div>
  )
}

export default withStyles(styles)(Creatures)
