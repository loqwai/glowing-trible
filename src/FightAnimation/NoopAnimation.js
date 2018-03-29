import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature'

const styles = {
  Creature: {
    width: 'calc(50% - 20px)',
  },
}

const NoopAnimation = props => {
  const { leftCreature, rightCreature } = props
  const { className, classes } = props

  return (
    <div className={className}>
      <Creature className={classes.Creature} genome={leftCreature.genome} />
      <Creature className={classes.Creature} genome={rightCreature.genome} />
    </div>
  )
}
export default withStyles(styles)(NoopAnimation)
