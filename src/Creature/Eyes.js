import React from 'react'
import { formatHSL } from '../helpers/color'

const eyeOffset = distance => distance * 30 + 10
const formatCY = position => position * 50
const formatLeftOffset = distance => 50 - eyeOffset(distance)
const formatRightOffset = distance => 50 + eyeOffset(distance)
const formatR = size => size * 15 + 5

const Eyes = ({ distanceBetweenEyes, position, size, color }) => {
  return (
    <g>
      <circle
        cx={formatLeftOffset(distanceBetweenEyes)}
        cy={formatCY(position)}
        r={formatR(size)}
        fill={formatHSL(color)}
      />
      <circle
        cx={formatRightOffset(distanceBetweenEyes)}
        cy={formatCY(position)}
        r={formatR(size)}
        fill={formatHSL(color)}
      />
    </g>
  )
}

export default Eyes
