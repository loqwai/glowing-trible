import React from 'react'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'

import Arms from './Arms'
import Body from './Body'
import Head from './Head'
import Legs from './Legs'
import Stats from './Stats'

const styles = {
  svg: {
    cursor: 'pointer',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  IconButton: {
    flexGrow: 0,
    alignSelf: 'flex-end',
  },
}

const AddIcon = ({ added }) => {
  if (added) return <Icon>remove_circle</Icon>

  return <Icon>add_circle_outline</Icon>
}

const Creature = props => {
  const { added, genome } = props
  const { classes, onClick, onToggleAdd } = props
  const legHeight = genome.legs.power * 100
  const creatureHeight = 150 + 40 + legHeight + 15
  const vOffset = 300 - creatureHeight

  const toggleAdd = event => {
    event.preventDefault()
    onToggleAdd()
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.IconButton} onClick={toggleAdd}>
        <AddIcon added={added} />
      </IconButton>

      <svg onClick={onClick} className={classes.svg} width="100" height="350">
        <title>{JSON.stringify(genome, null, 2)}</title>

        <Legs
          power={genome.legs.power}
          color={genome.legs.color}
          vOffset={vOffset}
        />
        <Arms
          power={genome.arms.power}
          color={genome.arms.color}
          vOffset={vOffset}
        />
        <Body
          power={genome.body.power}
          color={genome.body.color}
          vOffset={vOffset}
        />
        <Head
          color={genome.head.color}
          eyes={genome.head.eyes}
          shape={genome.head.shape}
          mouth={genome.head.mouth}
          vOffset={vOffset}
        />
        <svg y="300" height="50">
          <Stats
            arms={genome.arms.power}
            body={genome.body.power}
            legs={genome.legs.power}
          />
        </svg>
      </svg>
    </div>
  )
}

export default withStyles(styles)(Creature)
