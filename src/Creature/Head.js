import React from 'react'

const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(luminosity * 100, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const CircleFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="50" ry="50" fill={formatHSL(color)} />
)

const FatFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="50" ry="40" fill={formatHSL(color)} />
)

const NarrowFace = ({ color }) => (
  <ellipse cx="50" cy="50" rx="40" ry="50" fill={formatHSL(color)} />
)

const Head = ({ color, shape }) => {
  const Face = [CircleFace, FatFace, NarrowFace][parseInt(shape * 3) % 3]

  return (
    <g>
      <Face color={color} />
    </g>
  )
}

export default Head
