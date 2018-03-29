import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature'

const styles = {
  root: {
    flexGrow: 1,
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  Creature: {
    width: 'calc(50% - 20px)',
  },
}

const getAnimation = action => {
  if (action == 'eats') return EatsAnimation
  return NoopView
}

const FightAnimation = ({ classes, leftCreature, logEntry, rightCreature }) => {
  const Animation = getAnimation(logEntry.action)

  return (
    <Animation
      className={classes.root}
      leftCreature={leftCreature}
      logEntry={logEntry}
      rightCreature={rightCreature}
    />
  )
}
export default withStyles(styles)(FightAnimation)
