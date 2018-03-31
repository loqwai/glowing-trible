import React from 'react'
import { formatHSL } from '../helpers/color'

const Legs = ({ color, power, vOffset }) => {
  const y1 = vOffset + 170
  const y2 = vOffset + 200 + power * 100
  return (
    <svg>
      <line
        x1="40"
        y1={y1}
        x2="40"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1={y1}
        x2="60"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
    </svg>
  )
}
export default Legs
