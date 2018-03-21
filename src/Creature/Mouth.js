import React from 'react'

const Mouth = ({ expression, position, width, lips }) => {
  const xOffset = width * 25
  const x = parseInt(20 + xOffset, 10)
  const dx = parseInt(80 - xOffset, 10)
  const y = parseInt(50 + position * 25, 10)
  const curve = parseInt(50 + expression * 25, 10)
  const stroke = parseInt(5 + lips * 10, 10)

  return (
    <path
      d={`M ${x} ${y} C 30 ${curve} 70 ${curve} ${dx} ${y}`}
      fill="transparent"
      stroke="#000"
      strokeWidth={stroke}
      strokeLinecap="round"
    />
  )
}

export default Mouth
