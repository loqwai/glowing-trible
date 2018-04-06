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

const HitsAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  const LeftWrapper = logEntry.leftCreature.damageDone ? LeftCreatureHit : CreatureDamage
  const RightWrapper = logEntry.rightCreature.damageDone ? RightCreatureHit : CreatureDamage

  return (
    <div className={[className, classes.root].join(' ')}>
      <LeftWrapper className={classes.CreatureWrapper} damage={logEntry.leftCreature.damageTaken} side={'left'}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </LeftWrapper>
      <RightWrapper className={classes.CreatureWrapper} damage={logEntry.rightCreature.damageTaken} side={'right'}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </RightWrapper>
    </div>
  )
}
export default withStyles(styles)(HitsAnimation)
