import React from 'react'
import { formatHSL } from '../helpers/color'

const Arms = ({ color, power, vOffset }) => {
  const y1 = vOffset + 100
  const y2 = vOffset + 100 + power * 100

  return (
    <svg>
      <line
        x1="40"
        y1={y1}
        x2="5"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1={y1}
        x2="95"
        y2={y2}
        stroke={formatHSL(color)}
        strokeWidth={1 + power * 10}
        strokeLinecap="round"
      />
    </svg>
  )
}
export default Arms
