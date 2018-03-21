import React from 'react'

const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(luminosity * 100, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const Head = ({ color }) => (
  <circle cx="50" cy="50" r="50" fill={formatHSL(color)} />
)

export default Head
