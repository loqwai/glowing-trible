import React from 'react'
import { formatHSL } from '../helpers/color'

const Body = ({ color, power }) => {
  return (
    <rect
      x="20%"
      y="20%"
      width="50%"
      height="75%"
      rx="5"
      ry="5"
      fill={formatHSL(color)}
    />
  )
}
export default Body
