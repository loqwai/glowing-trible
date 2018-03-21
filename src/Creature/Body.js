import React from 'react'
import { formatHSL } from '../helpers/color'

const Body = ({ color, power, vOffset }) => {
  const y = vOffset + 40
  const width = power * 50
  const xOffset = width / 2

  return (
    <rect
      x={50 - xOffset}
      y={y}
      width={width}
      height="150"
      rx="10"
      ry="10"
      fill={formatHSL(color)}
    />
  )
}
export default Body
