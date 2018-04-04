import bindAll from 'lodash/fp/bindAll'
import isEmpty from 'lodash/fp/isEmpty'
import map from 'lodash/fp/map'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import FightAnimation from './FightAnimation'
import Fight from './logic/Fight'
import Log from './Log'
import { creatureToFighter } from './helpers/fighter'

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
  state = {
    leftCreature: null,
    rightCreature: null,
    log: [],
    pendingLog: [],
  }

  constructor({ history }) {
    super()
    bindAll(Object.getOwnPropertyNames(Arena.prototype), this)

    const fightData = JSON.parse(localStorage.getItem('fight'))
    localStorage.removeItem('fight')
    if (isEmpty(fightData)) {
      return history.push('/creature-selection')
    }

    const { champion, enemy } = fightData

    const fighters = map(creatureToFighter, [champion, enemy])
    const pendingLog = Fight(fighters[0], fighters[1])

    this.state = {
      leftCreature: champion,
      rightCreature: enemy,
      log: [],
      pendingLog: pendingLog,
    }
    this.animationTimeout = setTimeout(this.nextAction, 0)
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout)
  }

  nextAction() {
    const { log, pendingLog } = this.state
    if (isEmpty(pendingLog)) {
      return
    }

    const currentLogEntry = pendingLog.shift()
    log.push(currentLogEntry)
    this.setState({ currentLogEntry, log, pendingLog })
    this.animationTimeout = setTimeout(this.nextAction, 1000)
  }

  render() {
    const { classes, history } = this.props

    if (isEmpty(this.state.log)) {
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

        <Button
          className={classes.Button}
          onClick={() => history.push('/creature-selection')}>
          Reset
        </Button>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Arena))
