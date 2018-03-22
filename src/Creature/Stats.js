import React from 'react'

const format = n => parseInt(n * 10, 10)

const Stats = ({ arms, body, legs }) => (
  <p>{`${format(body)}/${format(arms)}/${format(legs)}`}</p>
)
export default Stats
