import React from 'react'
import size from 'lodash/fp/size'
import Eyes from './Eyes'
import Mouth from './Mouth'
import { formatHSL } from '../helpers/color'

const CircleFace = ({ color }) => (
  <ellipse cx="50" cy="20" rx="20" ry="20" fill={formatHSL(color)} />
)

const FatFace = ({ color }) => (
  <ellipse cx="50" cy="20" rx="20" ry="16" fill={formatHSL(color)} />
)

const NarrowFace = ({ color }) => (
  <ellipse cx="50" cy="20" rx="16" ry="20" fill={formatHSL(color)} />
)

const faces = [CircleFace, FatFace, NarrowFace]

const Head = ({ color, eyes, mouth, shape }) => {
  const Face = faces[parseInt(shape * size(faces), 10) % size(faces)]

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
      <Mouth
        position={mouth.position}
        expression={mouth.expression}
        lips={mouth.lips}
        width={mouth.width}
      />
    </g>
  )
}

export default Head
