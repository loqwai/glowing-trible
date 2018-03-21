import React from 'react'
import Eyes from './Eyes'
import { formatHSL } from '../helpers/color'

const CircleFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="50" ry="50" fill={formatHSL(color)} />
)

const FatFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="50" ry="40" fill={formatHSL(color)} />
)

const NarrowFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="40" ry="50" fill={formatHSL(color)} />
)

const Head = ({ color, eyes, shape }) => {
  const Face = [CircleFace, FatFace, NarrowFace][parseInt(shape * 3) % 3]

  return (
    <g>
      <Face color={color} />
      <Eyes
        position={eyes.position}
        size={eyes.size}
        distanceBetweenEyes={eyes.distanceBetweenEyes}
        count={eyes.count}
        color={eyes.color}
      />
    </g>
  )
}

export default Head
