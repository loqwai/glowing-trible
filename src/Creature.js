import React from "react"

const Creature = ({ genome }) => {
  return (
    <svg height="100" width="100">
      <g height="100" width="100">
        <rect height="100" width="100" fill="black" />
        <rect
          height="100"
          width="100"
          fill="white"
          fillOpacity={genome.luminosity}
        />
      </g>
    </svg>
  )
}

export default Creature
