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

const Face = ({ color, shape, vOffset }) => {
  const width = 25 + shape * 50
  const x = 50 - width / 2

  return (
    <rect
      x={x}
      y={vOffset}
      rx="20"
      ry="20"
      width={width}
      height={80}
      fill={formatHSL(color)}
    />
  )
}

const Head = ({ color, eyes, mouth, shape, vOffset }) => {
  return (
    <g>
      <Face color={color} shape={shape} vOffset={vOffset} />
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
