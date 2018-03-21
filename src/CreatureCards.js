import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'
import CreatureCard from './Creature/CreatureCard'

const mapWithIndex = map.convert({ cap: false })

const styles = theme => ({
  root: {
    marginRight: 8 * theme.spacing.unit,
    '&:last-child': {
      marginRight: 0,
    },
  },
  Creatures: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

const Creatures = props => {
  const { classes, onAddToInventory, onSelectParent } = props
  const { creatures, title } = props

  const renderCreatures = mapWithIndex((creature, i) => {
    return (
      <CreatureCard
        genome={creature.genome}
        key={i}
        onAddToInventory={() => onAddToInventory(creature)}
        onSelectParent={() => onSelectParent(creature)}
      />
    )
  })

  return (
    <div className={classes.root}>
      <h3>{title}</h3>
      <div className={classes.Creatures}>{renderCreatures(creatures)}</div>
    </div>
  )
}

export default withStyles(styles)(Creatures)
