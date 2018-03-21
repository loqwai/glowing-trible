import React from 'react'
import size from 'lodash/fp/size'
import Eyes from './Eyes'
import Mouth from './Mouth'
import { formatHSL } from '../helpers/color'

const CircleFace = ({ color, vOffset }) => (
  <ellipse cx="50" cy={vOffset + 50} rx="40" ry="40" fill={formatHSL(color)} />
)

const FatFace = ({ color, vOffset }) => (
  <ellipse cx="50" cy={vOffset + 50} rx="50" ry="40" fill={formatHSL(color)} />
)

const NarrowFace = ({ color, vOffset }) => (
  <ellipse cx="50" cy={vOffset + 50} rx="30" ry="40" fill={formatHSL(color)} />
)

const faces = [CircleFace, FatFace, NarrowFace]

const Head = ({ color, eyes, mouth, shape, vOffset }) => {
  const Face = faces[parseInt(shape * size(faces), 10) % size(faces)]

  return (
    <g>
      <Face color={color} vOffset={vOffset} />
      <Eyes
        position={eyes.position}
        size={eyes.size}
        distanceBetweenEyes={eyes.distanceBetweenEyes}
        count={eyes.count}
        color={eyes.color}
        vOffset={vOffset}
      />
      <Mouth
        position={mouth.position}
        expression={mouth.expression}
        lips={mouth.lips}
        width={mouth.width}
        vOffset={vOffset}
      />
    </g>
  )
}

export default Head
