import React, { Component } from 'react'
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
  },
})

class App extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <Router>
          <Route path="/" component={Pick} />
        </Router>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Glowing Trible
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(App)
