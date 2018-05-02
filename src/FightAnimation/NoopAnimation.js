import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature3D'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  CreatureWrapper: {
    width: '50%',
    height: '200px',
    display: 'flex',
  },
  Creature: {
    flex: 1,
  },
}

const NoopAnimation = props => {
  const { leftCreature, rightCreature } = props
  const { className, classes } = props

  return (
    <div className={[className, classes.root].join(' ')}>
      <div className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </div>
      <div className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </div>
    </div>
  )
}
export default withStyles(styles)(NoopAnimation)
