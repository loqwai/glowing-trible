import React from 'react'
import { formatHSL } from '../helpers/color'

const Legs = ({ color, power }) => {
  const y2 = 200 + power * 100
  return (
    <g>
      <line
        x1="40"
        y1="170"
        x2="40"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="170"
        x2="60"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
    </g>
  )
}
export default Legs
