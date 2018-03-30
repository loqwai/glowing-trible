import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature'
import CreatureDamage from './CreatureDamage'
import CreatureDies from './CreatureDies'

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

const getHealth = (id, logEntry) => {
  if (logEntry.attacker.id === id) return logEntry.attacker.health
  if (logEntry.defender.id === id) return logEntry.defender.health
  return 0
}

const DiesAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  const leftHealth = getHealth(leftCreature.id, logEntry)
  const LeftCreatureWrapper = leftHealth < 0 ? CreatureDies : CreatureDamage
  const rightHealth = getHealth(rightCreature.id, logEntry)
  const RightCreatureWrapper = rightHealth < 0 ? CreatureDies : CreatureDamage

  return (
    <div className={[className, classes.root].join(' ')}>
      <LeftCreatureWrapper className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </LeftCreatureWrapper>
      <RightCreatureWrapper className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </RightCreatureWrapper>
    </div>
  )
}
export default withStyles(styles)(DiesAnimation)
