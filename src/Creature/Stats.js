import React from 'react'

const format = n => parseInt(n * 10, 10)

const Stats = ({ arms, body, legs }) => (
  <text y="50" fontFamily="Roboto" fontSize="20">
    {`${format(body)}/${format(arms)}/${format(legs)}`}
  </text>
)
export default Stats
