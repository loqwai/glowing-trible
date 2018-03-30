import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  '@keyframes dies': {
    '0%': {
      top: 0,
      transform: 'rotateZ(0)',
    },
    '100%': {
      top: '25%',
      transform: 'rotateZ(90deg)',
    },
  },
  root: {
    position: 'relative',
    '& > svg': {
      position: 'relative',
      transform: 'rotateZ(90deg)',
      top: '25%',
      animationName: 'dies',
      animationDuration: '1s',
      animationIterationCount: 1,
      animationTimingFunction: 'cubic-bezier(0, 0, 1, -0.5)',
    },
  },
}

const CreatureDies = ({ children, classes, className, side }) => {
  return <div className={[classes.root, className].join(' ')}>{children}</div>
}
export default withStyles(styles)(CreatureDies)
