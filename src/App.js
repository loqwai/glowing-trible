import React from 'react'
import AppBar from 'material-ui/AppBar'
import CssBaseline from 'material-ui/CssBaseline'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import Pick from './Pick'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
  },
  AppBarHeader: {
    ...theme.typography.title,
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
})

const App = ({ classes }) => (
  <Router>
    <div className={classes.root}>
      <CssBaseline />
      <Route path="/" component={Pick} />
      <AppBar>
        <Toolbar>
          <Link to="/" className={classes.AppBarHeader}>
            Glowing Trible
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  </Router>
)

export default withStyles(styles)(App)
