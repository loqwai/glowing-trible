import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  '@keyframes hits': {
    '0%': {
      right: 0,
    },
    '50%': {
      right: 'calc(90%)',
    },
    '100%': {
      right: 0,
    },
  },
  root: {
    position: 'relative',
    '&:first-child': {
      position: 'relative',
      animationName: 'hits',
      animationDuration: '1s',
      animationIterationCount: 1,
    },
  },
}

const RightCreatureHit = ({ children, classes, className, side }) => {
  return <div className={[classes.root, className].join(' ')}>{children}</div>
}
export default withStyles(styles)(RightCreatureHit)
