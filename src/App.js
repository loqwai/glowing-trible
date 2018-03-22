import React from 'react'
import AppBar from 'material-ui/AppBar'
import CssBaseline from 'material-ui/CssBaseline'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Arena from './Arena'
import Dating from './Dating'
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
  <Router basename="glowing-tribble">
    <div className={classes.root}>
      <CssBaseline />
      <Switch>
        <Route path="/arena" component={Arena} />
        <Route path="/dating" component={Dating} />
        <Route path="/" component={Pick} />
      </Switch>
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
