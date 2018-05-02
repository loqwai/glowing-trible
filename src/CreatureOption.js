import compact from 'lodash/fp/compact'
import join from 'lodash/fp/join'
import { withStyles } from 'material-ui/styles'
import React from 'react'

import Creature3D from './Creature3D'

const styles = {
  root: {
    filter: 'grayscale(80)',
    transition: 'filter 300ms',
  },
  selected: {
    filter: 'grayscale(0)',
  },
}

const CreatureOption = ({ classes, className, genome, onSelect, selected }) => {
  const creatureClasses = [className, classes.root]
  if (selected) creatureClasses.push(classes.selected)

  return <Creature3D className={join(' ', compact(creatureClasses))} genome={genome} onClick={onSelect} />
}

CreatureOption.propTypes = {}

export default withStyles(styles)(CreatureOption)
