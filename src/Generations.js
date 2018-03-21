import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'
import Generation from './Generation'
import CreatureCards from './CreatureCards'

const mapWithIndex = map.convert({ cap: false })

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

const Generations = ({
  className,
  classes,
  generations,
  onSelectParent,
  onAddToInventory,
}) => {
  const renderGeneration = ({ children, suitors }, i) => (
    <Generation key={i}>
      <CreatureCards
        creatures={children}
        onAddToInventory={onAddToInventory}
        onSelectParent={onSelectParent}
        title="Children"
      />
      <CreatureCards
        creatures={suitors}
        onAddToInventory={onAddToInventory}
        onSelectParent={onSelectParent}
        title="Suitors"
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
