import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: '100%',
  },
})

const Inventory = ({ className, classes }) => (
  <div className={[classes.root, className].join(' ')} />
)

export default withStyles(styles)(Inventory)
