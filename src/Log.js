import React from 'react'
import map from 'lodash/fp/map'
import round from 'lodash/fp/round'
import List, { ListItem, ListItemText } from 'material-ui/List'

const mapWithIndex = map.convert({ cap: false })

const formatDies = ({ leftCreature, rightCreature }) => {
  if (leftCreature.health < 0) return 'Left Creature dies'
  return 'Right Creature dies'
}

const formatEats = ({ leftCreature, rightCreature }) => {
  if (leftCreature.damageTaken > 0)
    return `Left Creature eats ${round(leftCreature.damageTaken)} HP (${round(leftCreature.health)})`
  return `Right Creature eats ${round(rightCreature.damageTaken)} HP (${round(rightCreature.health)})`
}

const formatHits = ({ leftCreature, rightCreature }) => {
  if (leftCreature.damageDone > 0)
    return `Left Creature hits for ${round(leftCreature.damageDone)} HP (${round(rightCreature.health)} HP remaining)`
  return `Right Creature hits for ${round(rightCreature.damageDone)} HP (${round(leftCreature.health)} HP remaining)`
}

const formatStarves = ({ leftCreature, rightCreature }) => {
  if (leftCreature.health < 0) return 'Left Creature starves'
  return 'Right Creature starves'
}

const formatWins = ({ leftCreature, rightCreature }) => {
  if (leftCreature.health > 0) return 'Left Creature wins'
  return 'Right Creature wins'
}

const formatEntry = ({ action, leftCreature, rightCreature }) => {
  switch (action) {
    case 'dies':
      return formatDies({ leftCreature, rightCreature })
    case 'eats':
      return formatEats({ leftCreature, rightCreature })
    case 'hits':
      return formatHits({ leftCreature, rightCreature })
    case 'start':
      return 'The battle begins'
    case 'starves':
      return formatStarves({ leftCreature, rightCreature })
    case 'wins':
      return formatWins({ leftCreature, rightCreature })
    default:
      return JSON.stringify({ action, leftCreature, rightCreature })
  }
}

const LogEntry = (logEntry, i) => (
  <ListItem key={i}>
    <ListItemText primary={formatEntry(logEntry)} />
  </ListItem>
)

const Log = ({ log, rightId, leftId }) => {
  return <List dense={true}>{mapWithIndex(LogEntry, log)}</List>
}

export default Log
