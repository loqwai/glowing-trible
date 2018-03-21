import React from 'react'

const Mouth = ({ expression, position }) => {
  const xOffset = position * 25
  const x = parseInt(20 + xOffset)
  const dx = parseInt(80 - xOffset)
  const y = parseInt(50 + position * 25)
  const curve = parseInt(50 + expression * 25)

  return (
    <path
      d={`M ${x} ${y} C 30 ${curve} 70 ${curve} ${dx} ${y}`}
      fill="transparent"
      stroke="#000"
      strokeWidth="5"
      strokeLinecap="round"
    />
  )
}

export default Mouth
