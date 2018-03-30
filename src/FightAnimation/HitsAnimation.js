import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature'
import CreatureDamage from './CreatureDamage'
import LeftCreatureHit from './LeftCreatureHit'
import RightCreatureHit from './RightCreatureHit'

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

const getDamage = (id, logEntry) => {
  if (logEntry.defender.id === id) return logEntry.outcome.defenderDamage
  return 0
}

const HitsAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  const leftDamage = getDamage(leftCreature.id, logEntry)
  const rightDamage = getDamage(rightCreature.id, logEntry)

  const LeftCreatureWrapper = rightDamage ? LeftCreatureHit : CreatureDamage
  const RightCreatureWrapper = leftDamage ? RightCreatureHit : CreatureDamage

  return (
    <div className={[className, classes.root].join(' ')}>
      <LeftCreatureWrapper
        className={classes.CreatureWrapper}
        damage={leftDamage}
        side={'left'}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </LeftCreatureWrapper>
      <RightCreatureWrapper
        className={classes.CreatureWrapper}
        damage={rightDamage}
        side={'right'}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </RightCreatureWrapper>
    </div>
  )
}
export default withStyles(styles)(HitsAnimation)
