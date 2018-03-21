import React, { Component } from 'react'
import bindAll from 'lodash/fp/bindAll'
import concat from 'lodash/fp/concat'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import times from 'lodash/fp/times'
import AppBar from 'material-ui/AppBar'
import CssBaseline from 'material-ui/CssBaseline'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import Breed from './Breed'
import Creatures from './Creatures'
import Generation from './Generation'
import GenerateSuitors from './GenerateSuitors'

import { numChildren, numSuitors } from './Configuration'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 10,
  },
})

class App extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(App.prototype), this)

    this.state = {
      parents: [],
      generations: [],
    }
    this.initialize()
  }

  async initialize() {
    const [children, suitors] = await Promise.all([
      GenerateSuitors(numChildren),
      GenerateSuitors(numSuitors),
    ])

    this.setState({
      generations: [{ children, suitors }],
    })
  }

  async selectParent(parent) {
    const parents = concat(this.state.parents, parent)

    if (size(parents) < 2) return this.setState({ parents })

    const generations = concat(this.state.generations, {
      children: times(() => Breed(parents), numChildren),
      suitors: await GenerateSuitors(numSuitors),
    })

    this.setState({
      parents: [],
      generations,
    })
  }

  render() {
    const { generations } = this.state

    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Glowing Trible
            </Typography>
          </Toolbar>
        </AppBar>
        {map(this.renderGeneration, generations)}
      </div>
    )
  }

  renderGeneration({ children, suitors, number }) {
    return (
      <Generation key={number}>
        <Creatures
          title="Children"
          genomes={children}
          onSelectParent={this.selectParent}
        />
        <Creatures
          title="Suitors"
          genomes={suitors}
          onSelectParent={this.selectParent}
        />
      </Generation>
    )
  }
}

export default withStyles(styles)(App)
