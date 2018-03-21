import React from 'react'
import { formatHSL } from '../helpers/color'

const formatPercent = n => `${n}%`

const eyeOffset = distance => distance * 30 + 20
const formatCY = position => formatPercent(position * 50)
const formatLeftOffset = distance => formatPercent(50 - eyeOffset(distance))
const formatRightOffset = distance => formatPercent(50 + eyeOffset(distance))
const formatR = size => formatPercent(size * 15 + 5)

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
