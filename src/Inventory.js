import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'
import Creature from './Creature'

const mapWithIndex = map.convert({ cap: false })

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: '100%',
    display: 'flex',
  },
  Creature: {
    width: '48px',
    backgroundColor: theme.palette.primary.contrastText,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
})

const Inventory = ({ className, classes, creatures }) => {
  const renderCreatures = mapWithIndex((creature, i) => (
    <Creature
      added={false}
      className={classes.Creature}
      genome={creature.genome}
      key={i}
    />
  ))

  return (
    <div className={[classes.root, className].join(' ')}>
      {renderCreatures(creatures)}
    </div>
  )
}

export default withStyles(styles)(Inventory)
