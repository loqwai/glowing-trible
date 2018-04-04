import React from 'react'
import AppBar from 'material-ui/AppBar'
import CssBaseline from 'material-ui/CssBaseline'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Arena from './Arena'
import Breed from './Breed'
import CreatureSelection from './CreatureSelection'
import Dating from './Dating'
import Drawing from './Drawing'
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
      <Switch>
        <Route path="/arena" component={Arena} />
        <Route path="/breed" component={Breed} />
        <Route path="/creature-selection" component={CreatureSelection} />
        <Route path="/dating" component={Dating} />
        <Route path="/drawing" component={Drawing} />
        <Route path="/pick" component={Pick} />
        <Route path="/" component={CreatureSelection} />
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
