import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  '@keyframes wins': {
    '0%': {
      bottom: 0,
      transform: 'rotateZ(0)',
    },
    '25%': {
      bottom: '5%',
      transform: 'rotateZ(10deg)',
    },
    '50%': {
      bottom: '10%',
      transform: 'rotateZ(0)',
    },
    '75%': {
      bottom: '5%',
      transform: 'rotateZ(-10deg)',
    },
    '100%': {
      bottom: 0,
      transform: 'rotateZ(0)',
    },
  },
  root: {
    position: 'relative',
    '&:first-child': {
      position: 'relative',
      transform: 'rotateZ(0)',
      bottom: '0%',
      animationName: 'wins',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
    },
  },
}

const CreatureWins = ({ children, classes, className, side }) => {
  return <div className={[classes.root, className].join(' ')}>{children}</div>
}
export default withStyles(styles)(CreatureWins)
