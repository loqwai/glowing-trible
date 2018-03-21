import React from 'react'
import Card from 'material-ui/Card'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'

import Creature from './Creature'
import Stats from './Stats'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '132px',
    padding: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    marginRight: 2 * theme.spacing.unit,
    '&:last-child': {
      marginRight: 0,
    },
  },
  Creature: {
    cursor: 'pointer',
  },
  IconButton: {
    flexGrow: 0,
    alignSelf: 'flex-end',
  },
})

const AddIcon = ({ added }) => {
  if (added) return null

  return <Icon>add_circle_outline</Icon>
}

const CreatureCard = props => {
  const { onAddToInventory, onClick } = props
  const { added, classes, genome } = props

  const onClickAdd = event => {
    event.preventDefault()
    onAddToInventory()
  }

  return (
    <Card className={classes.root}>
      <IconButton className={classes.IconButton} onClick={onClickAdd}>
        <AddIcon added={added} />
      </IconButton>

      <Creature
        className={classes.Creature}
        genome={genome}
        onClick={onClick}
      />

      <Stats
        arms={genome.arms.power}
        body={genome.body.power}
        legs={genome.legs.power}
      />
    </Card>
  )
}

export default withStyles(styles)(CreatureCard)
