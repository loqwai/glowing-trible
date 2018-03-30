import PropTypes from 'prop-types'
import get from 'lodash/fp/get'
import { withStyles } from 'material-ui/styles'
import React from 'react'

import DiesAnimation from './DiesAnimation'
import EatsAnimation from './EatsAnimation'
import HitsAnimation from './HitsAnimation'
import NoopAnimation from './NoopAnimation'

const styles = {
  root: {
    flexGrow: 1,
    minHeight: '200px',
  },
}

const getAnimation = action => {
  console.log('getAnimation', action)
  if (action === 'eats') return EatsAnimation
  if (action === 'hits') return HitsAnimation
  if (action === 'dies') return DiesAnimation
  if (action === 'starves') return DiesAnimation
  return NoopAnimation
}

const FightAnimation = ({ classes, leftCreature, logEntry, rightCreature }) => {
  const Animation = getAnimation(get('outcome.action', logEntry))

  return (
    <Animation
      className={classes.root}
      leftCreature={leftCreature}
      logEntry={logEntry}
      rightCreature={rightCreature}
    />
  )
}

FightAnimation.propTypes = {
  leftCreature: PropTypes.object.isRequired,
  logEntry: PropTypes.object,
  rightCreature: PropTypes.object.isRequired,
}

export default withStyles(styles)(FightAnimation)
