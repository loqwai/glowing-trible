import React from 'react'

const Legs = ({ power }) => (
  <g>
    <line
      x1="40"
      y1="170"
      x2="40"
      y2="300"
      stroke="#000"
      strokeWidth={1 + power * 10}
      strokeLinecap="round"
    />
    <line
      x1="60"
      y1="170"
      x2="60"
      y2="300"
      stroke="#000"
      strokeWidth={1 + power * 10}
      strokeLinecap="round"
    />
  </g>
)
export default Legs
