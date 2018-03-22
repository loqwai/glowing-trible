import React, { Component } from 'react'
import bindAll from 'lodash/fp/bindAll'
import concat from 'lodash/fp/concat'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import times from 'lodash/fp/times'
import { withStyles } from 'material-ui/styles'

import Breed from './Breed'
import Generations from './Generations'
import GenerateSuitors from './GenerateSuitors'
import Inventory from './Inventory'

import { numChildren, numSuitors } from './Configuration.json'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  Generations: {
    flex: 1,
    overflowY: 'scroll',
  },
  Inventory: {
    maxHeight: '64px',
    flexShrink: 0,
  },
}

class Pick extends Component {
  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(Pick.prototype), this)

    this.state = {
      parents: [],
      generations: [],
      inventory: [],
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

  async addToInventory(creature) {
    this.setState({
      inventory: concat(this.state.inventory, creature),
    })
  }

  async selectParent(parent) {
    const parents = concat(this.state.parents, parent)

    if (size(parents) < 2) return this.setState({ parents })

    const childrenGenomes = times(
      () => Breed(map('genome', parents)),
      numChildren,
    )

    const generations = concat(this.state.generations, {
      children: map(genome => ({ genome, health: 0 }), childrenGenomes),
      suitors: await GenerateSuitors(numSuitors),
    })

    this.setState({
      parents: [],
      generations,
    })
  }

  render() {
    const { generations, inventory } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Generations
          className={classes.Generations}
          generations={generations}
          onAddToInventory={this.addToInventory}
          onSelectParent={this.selectParent}
        />
        <Inventory className={classes.Inventory} creatures={inventory} />
      </div>
    )
  }
}

export default withStyles(styles)(Pick)
