import React, { Component } from 'react'
import isNil from 'lodash/fp/isNil'
import map from 'lodash/fp/map'
import Card from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import Creature from './Creature'
import Fight from './Fight'
import GenerateSuitors from './GenerateSuitors'
import Log from './Log'
import { creatureToFighter } from './helpers/fighter'

const mapWithIndex = map.convert({ cap: false })

const styles = theme => ({
  root: {
    flexGrow: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    overflowY: 'scroll',
  },
  octogon: {
    flexGrow: 1,
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  Card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${4 * theme.spacing.unit}px)`,
    margin: 2 * theme.spacing.unit,
    padding: 4 * theme.spacing.unit,
  },
  Creature: {
    width: 'calc(50% - 20px)',
  },
})

class Arena extends Component {
  constructor() {
    super()
    this.state = {
      leftCreature: null,
      rightCreature: null,
      log: null,
    }
    this.initialize()
  }

  async initialize() {
    const creatures = await GenerateSuitors(2)
    const fighters = mapWithIndex(creatureToFighter, creatures)

    this.setState({
      leftCreature: creatures[0],
      rightCreature: creatures[1],
      log: Fight(fighters[0], fighters[1]),
    })
  }

  render() {
    const { classes } = this.props

    if (isNil(this.state.log)) {
      return (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Card className={classes.Card}>
          <div className={classes.octogon}>
            <Creature
              className={classes.Creature}
              genome={this.state.leftCreature.genome}
            />
            <Creature
              className={classes.Creature}
              genome={this.state.rightCreature.genome}
            />
          </div>
          <Log log={this.state.log} />
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Arena)
