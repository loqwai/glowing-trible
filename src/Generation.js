import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: theme.breakpoints.values.lg,
    padding: theme.spacing.unit,
  },
})

const Generation = ({ children, classes }) => (
  <div className={classes.root}>{children}</div>
)

export default withStyles(styles)(Generation)
