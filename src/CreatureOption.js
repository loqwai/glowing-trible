import compact from 'lodash/fp/compact'
import join from 'lodash/fp/join'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'

import Creature from './Creature'

const styles = {
  selected: {
    border: '1px solid red',
  },
}

const CreatureOption = ({ classes, className, genome, onSelect, selected }) => {
  const creatureClasses = [className]
  if (selected) creatureClasses.push(classes.selected)

  return (
    <Creature
      className={join(' ', compact(creatureClasses))}
      genome={genome}
      onClick={onSelect}
    />
  )
}

CreatureOption.propTypes = {}

export default withStyles(styles)(CreatureOption)
