import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'
import Generation from './Generation'
import Creatures from './Creatures'

const mapWithIndex = map.convert({ cap: false })

const styles = {
  root: {},
}

const Generations = ({ className, classes, generations, onSelectParent }) => {
  const renderGeneration = ({ children, suitors }, i) => (
    <Generation key={i}>
      <Creatures
        title="Children"
        creatures={children}
        onSelectParent={onSelectParent}
      />
      <Creatures
        title="Suitors"
        creatures={suitors}
        onSelectParent={onSelectParent}
      />
    </Generation>
  )

  return (
    <div className={[className, classes.root].join(' ')}>
      {mapWithIndex(renderGeneration, generations)}
    </div>
  )
}

export default withStyles(styles)(Generations)
