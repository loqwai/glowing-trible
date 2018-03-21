import React from 'react'
import { formatHSL } from '../helpers/color'

const eyeOffset = distance => distance * 30 + 10
const formatCY = (position, vOffset) => vOffset + 10 + position * 40
const formatLeftOffset = (distance, r) => 50 + r - eyeOffset(distance)
const formatRightOffset = (distance, r) => 50 - r + eyeOffset(distance)
const formatR = size => size * 15 + 5

const Eyes = ({ color, distanceBetweenEyes, position, size, vOffset }) => {
  const r = formatR(size)
  const cy = formatCY(position, vOffset)
  const fill = formatHSL(color)

  return (
    <g>
      <circle
        cx={formatLeftOffset(distanceBetweenEyes, r)}
        cy={cy}
        r={r}
        fill={fill}
      />
      <circle
        cx={formatRightOffset(distanceBetweenEyes, r)}
        cy={cy}
        r={r}
        fill={fill}
      />
    </g>
  )
}

export default Eyes
