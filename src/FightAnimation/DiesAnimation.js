import React from 'react'
import { withStyles } from 'material-ui/styles'

import Creature from '../Creature3D'
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

const DiesAnimation = props => {
  const { leftCreature, logEntry, rightCreature } = props
  const { className, classes } = props

  const LeftWrapper = logEntry.leftCreature.health < 0 ? CreatureDies : CreatureDamage
  const RightWrapper = logEntry.rightCreature.health < 0 ? CreatureDies : CreatureDamage

  return (
    <div className={[className, classes.root].join(' ')}>
      <LeftWrapper className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={leftCreature.genome} />
      </LeftWrapper>
      <RightWrapper className={classes.CreatureWrapper}>
        <Creature className={classes.Creature} genome={rightCreature.genome} />
      </RightWrapper>
    </div>
  )
}
export default withStyles(styles)(DiesAnimation)
