import PropTypes from 'prop-types'
import React from 'react'

import Creature from './Creature'

const SelectedCreature = ({ className, creature }) => {
  if (!creature) return <div className={className} />
  return <Creature className={className} genome={creature.genome} />
}

SelectedCreature.propTypes = {
  creature: PropTypes.shape({
    genome: PropTypes.object.isRequired,
  }),
}

export default SelectedCreature
