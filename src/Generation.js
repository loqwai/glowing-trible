import React from 'react'
import Card from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  Card: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '912px',
  },
}

const Generation = ({ children, classes }) => (
  <div className={classes.root}>
    <Card className={classes.Card}>{children}</Card>
  </div>
)

export default withStyles(styles)(Generation)
