import React, { Component } from 'react'
import bindAll from 'lodash/fp/bindAll'
import isEmpty from 'lodash/fp/isEmpty'
import isNil from 'lodash/fp/isNil'
import map from 'lodash/fp/map'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import FightAnimation from './FightAnimation'
import Fight from './logic/Fight'
import GenerateSuitors from './logic/GenerateSuitors'
import Log from './Log'
import { creatureToFighter } from './helpers/fighter'

const mapWithIndex = map.convert({ cap: false })

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflowY: 'scroll',
  },
  octogon: {
    flexGrow: 1,
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  Button: {
    width: '100%',
    marginBottom: 2 * theme.spacing.unit,
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
    bindAll(Object.getOwnPropertyNames(Arena.prototype), this)
    this.initialize()
  }

  async initialize() {
    this.state = {
      leftCreature: null,
      rightCreature: null,
      log: null,
      pendingLog: null,
    }

    const creatures = await GenerateSuitors(2)
    const fighters = mapWithIndex(creatureToFighter, creatures)
    const pendingLog = Fight(fighters[0], fighters[1])
    pendingLog.pop()

    this.setState({
      leftCreature: creatures[0],
      rightCreature: creatures[1],
      log: [],
      pendingLog: pendingLog,
    })

    this.nextAction()
  }

  nextAction() {
    const { log, pendingLog } = this.state
    if (isEmpty(pendingLog)) {
      return
    }

    const currentLogEntry = pendingLog.shift()
    log.push(currentLogEntry)
    this.setState({ currentLogEntry, log, pendingLog })
    setTimeout(this.nextAction, 1000)
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
          <FightAnimation
            className={classes.octogon}
            logEntry={this.state.currentLogEntry}
            leftCreature={this.state.leftCreature}
            rightCreature={this.state.rightCreature}
          />
          <Log
            log={this.state.log}
            rightId={this.state.rightCreature.id}
            leftId={this.state.leftCreature.id}
          />
        </Card>

        <Button className={classes.Button} onClick={this.initialize}>
          Reset
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Arena)
