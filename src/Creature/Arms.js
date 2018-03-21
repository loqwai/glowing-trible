import React from 'react'
import { formatHSL } from '../helpers/color'

const Arms = ({ color, power }) => {
  const y2 = 100 + power * 100

  return (
    <g>
      <line
        x1="40"
        y1="100"
        x2="5"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="100"
        x2="95"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
    </g>
  )
}
export default Arms
