import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  '@keyframes floating-text': {
    '0%': {
      opacity: 0,
      top: 'calc(100px)',
    },
    '50%': {
      opacity: 1,
      top: 'calc(50px)',
    },
    '100%': {
      opacity: 0,
      top: '0',
    },
  },
  root: {
    position: 'relative',
  },
  damage: {},
  damageText: {
    opacity: 0,
    color: '#f00',
    fontSize: '32px',
    position: 'absolute',
    top: 'calc(20px)',
    left: 'calc(50% - 80px)',
    animationName: 'floating-text',
    animationDuration: '1s',
    animationIterationCount: 1,
  },
}

const damageText = (classes, damage) => {
  if (damage > 0) {
    return <p className={classes.damageText}>-{parseInt(damage, 10)}</p>
  }

  return null
}

const getRootClassname = (classes, className, damage) => {
  if (damage > 0) return [classes.root, classes.damage, className].join(' ')
  return [classes.root, className].join(' ')
}

const CreatureDamage = ({ children, classes, className, damage }) => {
  return (
    <div className={getRootClassname(classes, className, damage)}>
      {damageText(classes, damage)}
      {children}
    </div>
  )
}
export default withStyles(styles)(CreatureDamage)
