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

const getLeftDamage = logEntry => {
  if (logEntry.attacker.id !== 0) return 0
  return logEntry.outcome.attackerDamage
}

const getRightDamage = logEntry => {
  if (logEntry.attacker.id !== 1) return 0
  return logEntry.outcome.attackerDamage
}

const EatsAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  const leftDamage = getLeftDamage(logEntry)
  const rightDamage = getRightDamage(logEntry)

  return (
    <div className={[className, classes.root].join(' ')}>
      <CreatureDamage className={classes.CreatureWrapper} damage={leftDamage}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </CreatureDamage>
      <CreatureDamage className={classes.CreatureWrapper} damage={rightDamage}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </CreatureDamage>
    </div>
  )
}
export default withStyles(styles)(EatsAnimation)
