import React from 'react'

const Mouth = ({ expression, position }) => {
  const y = parseInt(50 + position * 25)
  const curve = parseInt(50 + expression * 25)

  return (
    <path
      d={`M 25 ${y} C 30 ${curve} 70 ${curve} 75 ${y}`}
      fill="transparent"
      stroke="#000"
      strokeWidth="5"
      strokeLinecap="round"
    />
  )
}

export default Mouth
