import bindAll from 'lodash/fp/bindAll'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import set from 'lodash/fp/set'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreatureOption from './CreatureOption'
import SelectedCreature from './SelectedCreature'
import GenerateSuitors from './logic/GenerateSuitors'

const deselectAll = map(set('selected', false))
const mapWithIndex = map.convert({ cap: false })

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflowY: 'scroll',
  },
  FightButton: {
    width: '100%',
    marginTop: 2 * theme.spacing.unit,
  },
  FightCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: `calc(100% - ${4 * theme.spacing.unit}px)`,
    margin: 2 * theme.spacing.unit,
    padding: 4 * theme.spacing.unit,
  },
  FightRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  SelectedCreature: {
    width: 'calc(50% - 20px)',
  },
  SelectionCard: {
    width: `calc(100% - ${4 * theme.spacing.unit}px)`,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 2 * theme.spacing.unit,
    padding: 4 * theme.spacing.unit,
  },
  SelectionCardCreature: {
    width: '100px',

    '&.selected': {
      border: '1px red solid',
    },
  },
  VS: {
    flexGrow: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class CreatureSelection extends Component {
  state = {
    champion: null,
    enemy: null,
    loading: true,
    options: [],
  }

  constructor() {
    super()
    bindAll(Object.getOwnPropertyNames(CreatureSelection.prototype), this)
    this.initialize()
  }

  async initialize() {
    const [enemy, ...creatures] = await GenerateSuitors(6)
    const options = map(creature => ({ creature, selected: false }), creatures)
    this.setState({ options, enemy, loading: false })
    this.selectChampion(0)
  }

  selectChampion(index) {
    const options = deselectAll(this.state.options)
    const option = get(index, options)

    const champion = option.creature
    if (!champion) {
      debugger
    }
    option.selected = true

    this.setState({
      champion,
      options: set(index, option, options),
    })
  }

  creatureOption({ creature, selected }, i) {
    const { classes } = this.props

    return (
      <CreatureOption
        className={classes.SelectionCardCreature}
        genome={creature.genome}
        key={creature.id}
        onSelect={() => this.selectChampion(i)}
        selected={selected}
      />
    )
  }

  fight() {
    const { history } = this.props
    const { champion, enemy } = this.state
    localStorage.setItem('fight', JSON.stringify({ champion, enemy }))
    history.push('/arena')
  }

  render() {
    const { classes } = this.props
    const { champion, enemy, loading, options } = this.state

    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Card className={classes.FightCard}>
          <div className={classes.FightRow}>
            <SelectedCreature
              className={classes.SelectedCreature}
              creature={champion}
            />
            <div className={classes.VS}>
              <p>VS</p>
            </div>
            <SelectedCreature
              className={classes.SelectedCreature}
              creature={enemy}
            />
          </div>
          <Button
            classes={{ root: classes.FightButton }}
            color="primary"
            fullWidth={true}
            onClick={this.fight}
            variant="raised">
            Fight
          </Button>
        </Card>
        <Card className={classes.SelectionCard}>
          {mapWithIndex(this.creatureOption, options)}
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(CreatureSelection))
