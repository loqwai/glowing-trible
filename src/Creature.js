import React from "react"

const formatHSL = ({ red, green, blue }) => {
  const [hue, saturation, luminosity] = [red, green, blue]

  const h = parseInt(hue * 360)
  const s = parseInt(saturation * 100)
  const l = parseInt(luminosity * 100)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const formatRGB = ({ red, green, blue }) => {
  const r = parseInt(red * 255)
  const g = parseInt(green * 255)
  const b = parseInt(blue * 255)

  return `rgb(${r}, ${g}, ${b})`
}

const Creature = ({ genome }) => {
  const { red, green, blue } = genome

  return (
    <svg height="100" width="100">
      <g height="100" width="100">
        <rect height="100" width="100" fill={formatHSL({ red, green, blue })} />
      </g>
    </svg>
  )
}

export default Creature
