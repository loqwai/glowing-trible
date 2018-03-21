import React from 'react'
import { formatHSL } from '../helpers/color'

const Body = ({ color, power }) => {
  return (
    <rect
      x="20"
      y="40"
      width="60"
      height="150"
      rx="10"
      ry="10"
      fill={formatHSL(color)}
    />
  )
}
export default Body
