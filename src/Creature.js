import React from "react"

const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(luminosity * 100, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const Creature = ({ genome, onClick }) => {
  const { hue, saturation, luminosity } = genome

  return (
    <svg height="100" width="100" onClick={onClick}>
      <g height="100" width="100">
        <rect
          height="100"
          width="100"
          fill={formatHSL({ hue, saturation, luminosity })}
        />
      </g>
    </svg>
  )
}

export default Creature
