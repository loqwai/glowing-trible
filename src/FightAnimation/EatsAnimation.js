import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature'
import CreatureDamage from './CreatureDamage'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  CreatureWrapper: {
    height: '200px',
    display: 'flex',
    flex: 1,
  },
  Creature: {
    flex: 1,
  },
}

const EatsAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  return (
    <div className={[className, classes.root].join(' ')}>
      <CreatureDamage className={classes.CreatureWrapper} damage={logEntry.leftCreature.damageTaken}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </CreatureDamage>
      <CreatureDamage className={classes.CreatureWrapper} damage={logEntry.rightCreature.damageTaken}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </CreatureDamage>
    </div>
  )
}
export default withStyles(styles)(EatsAnimation)
