import React from "react"
import map from "lodash/fp/map"

const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(luminosity * 100, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const Square = ({ genome }) => {
  const { hue, saturation, luminosity } = genome

  const height = genome.height * 100
  const width = genome.width * 100
  const x = genome.x * (100 - width)
  const y = genome.y * (100 - height)

  return (
    <rect
      height={height}
      width={width}
      x={x}
      y={y}
      fill={formatHSL({ hue, saturation, luminosity })}
    />
  )
}

const Creature = ({ genome, onClick }) => {
  const squares = map(part => <Square genome={part} />, genome.parts)

  return (
    <svg height="100" width="100" onClick={onClick}>
      <title>{JSON.stringify(genome, null, 2)}</title>
      <g height="100" width="100">
        {squares}
      </g>
    </svg>
  )
}

export default Creature
