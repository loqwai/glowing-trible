import bindAll from 'lodash/fp/bindAll'
import isEmpty from 'lodash/fp/isEmpty'
import Card from 'material-ui/Card'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { mutationRate } from './logic/Configuration.json'
import Creature from './Creature'
import Breed from './logic/Breed'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Button: {
    flexGrow: 0,
  },
  ChildCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: `calc(100% - ${4 * theme.spacing.unit}px)`,
    maxWidth: '480px',
    margin: 2 * theme.spacing.unit,
    padding: 0,
  },
  ContinueButton: {
    flexShrink: 0,
    fontSize: 32,
  },
  Creature: {
    flex: 1,
  },
  Icon: {
    fontSize: 64,
  },
  SuitorCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: `calc(100% - ${4 * theme.spacing.unit}px)`,
    maxWidth: '480px',
    margin: 2 * theme.spacing.unit,
    padding: 0,
  },
})

class BreedComponent extends Component {
  state = {}

  constructor({ history }) {
    super()
    bindAll(Object.getOwnPropertyNames(BreedComponent.prototype), this)

    const data = JSON.parse(localStorage.getItem('breed'))
    if (isEmpty(data)) {
      return history.push('/creature-selection')
    }

    const { champion } = data
    const [suitor, ...pendingSuitors] = data.suitors
    this.state = { champion, suitor, pendingSuitors }
  }

  breed() {
    const { champion, suitor } = this.state
    const child = Breed([champion, suitor], mutationRate)

    this.setState({ child, suitor })
  }

  continue() {
    const { champion, child } = this.state
    const creatures = JSON.parse(localStorage.getItem('creatures')) || {}
    delete creatures[champion.id]
    creatures[child.id] = child
    localStorage.setItem('creatures', JSON.stringify(creatures))
    this.props.history.push('/creature-selection')
  }

  reject() {
    const [suitor, ...pendingSuitors] = this.state.pendingSuitors
    pendingSuitors.push(this.state.suitor)
    this.setState({ suitor, pendingSuitors })
  }

  render() {
    if (isEmpty(this.state)) return null
    const { child } = this.state

    if (isEmpty(child)) return this.renderSuitor()
    return this.renderChild()
  }

  renderChild() {
    const { classes } = this.props
    const { child } = this.state

    return (
      <div className={classes.root}>
        <Card className={classes.ChildCard}>
          <Creature className={classes.Creature} genome={child.genome} />
          <Button
            className={classes.ContinueButton}
            color="primary"
            fullWidth={true}
            onClick={this.continue}
            variant="raised">
            Continue
          </Button>
        </Card>
      </div>
    )
  }

  renderSuitor() {
    const { classes } = this.props
    const { suitor } = this.state

    return (
      <div className={classes.root}>
        <Card className={classes.SuitorCard}>
          <Button
            className={classes.Button}
            onClick={this.reject}
            color="secondary"
            variant="raised">
            <Icon className={classes.Icon}>delete</Icon>
          </Button>
          <Creature className={classes.Creature} genome={suitor.genome} />
          <Button
            className={classes.Button}
            onClick={this.breed}
            color="primary"
            variant="raised">
            <Icon className={classes.Icon}>local_drink</Icon>
          </Button>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(BreedComponent))
