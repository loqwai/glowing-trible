import { withStyles } from 'material-ui/styles'
import noop from 'lodash/fp/noop'
import React from 'react'

import Arms from '../Creature/Arms'
import Body from '../Creature/Body'
import Legs from '../Creature/Legs'
import Head from './Head'

const styles = {
  root: {
    flex: 1,
    position: 'relative',
  },
  Head: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  svg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}

const Creature3D = ({ classes, className, genome, onClick = noop }) => {
  const legHeight = genome.legs.power * 100
  const creatureHeight = 150 + 40 + legHeight + 15
  const vOffset = 300 - creatureHeight

  return (
    <div className={classes.root}>
      <svg className={classes.svg} onClick={onClick} viewBox="0 0 100 350">
        <Legs power={genome.legs.power} color={genome.legs.color} vOffset={vOffset} />
        <Arms power={genome.arms.power} color={genome.arms.color} vOffset={vOffset} />
        <Body power={genome.body.power} color={genome.body.color} vOffset={vOffset} />
      </svg>
      <Head className={classes.Head} genome={genome.head} vOffset={vOffset} />
    </div>
  )
}

export default withStyles(styles)(Creature3D)
