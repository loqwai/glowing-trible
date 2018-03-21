import React from 'react'
import map from 'lodash/fp/map'
import { withStyles } from 'material-ui/styles'

const mapWithIndex = map.convert({ cap: false })

const styles = {
  root: {
    cursor: 'pointer',
  },
}

const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(luminosity * 100, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const formatPercent = n => `${n}%`

const Square = ({ genome }) => {
  const { hue, saturation, luminosity } = genome

  const height = genome.height * 100
  const width = genome.width * 100
  const x = genome.x * (100 - width)
  const y = genome.y * (100 - height)

  return (
    <rect
      height={formatPercent(height)}
      width={formatPercent(width)}
      x={formatPercent(x)}
      y={formatPercent(y)}
      fill={formatHSL({ hue, saturation, luminosity })}
    />
  )
}

const renderSquares = mapWithIndex((part, i) => (
  <Square genome={part} key={i} />
))

const Creature = ({ className, classes, genome, onClick }) => (
  <svg onClick={onClick} className={[className, classes.root].join(' ')}>
    <title>{JSON.stringify(genome, null, 2)}</title>

    <Square genome={genome} />
    <g>{renderSquares(genome.parts)}</g>
  </svg>
)

export default withStyles(styles)(Creature)
