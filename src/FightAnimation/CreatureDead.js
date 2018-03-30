import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    position: 'relative',
    '& > svg': {
      position: 'relative',
      transform: 'rotateZ(90deg)',
      top: '25%',
    },
  },
}

const CreatureDead = ({ children, classes, className }) => {
  return <div className={[classes.root, className].join(' ')}>{children}</div>
}
export default withStyles(styles)(CreatureDead)
