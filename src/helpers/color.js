export const formatHSL = ({ hue, saturation, luminosity }) => {
  const h = parseInt(hue * 360, 10)
  const s = parseInt(saturation * 100, 10)
  const l = parseInt(20 + luminosity * 60, 10)

  return `hsl(${h}, ${s}%, ${l}%)`
}
