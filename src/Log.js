import React from 'react'
import map from 'lodash/fp/map'
import round from 'lodash/fp/round'
import List, { ListItem, ListItemText } from 'material-ui/List'

const mapWithIndex = map.convert({ cap: false })

const formatPlayerById = (leftId, id) => {
  if (id === leftId) return 'Left'
  return 'Right'
}

const formatEntry = ({leftId, rightId, entry}) => {
  const { attacker, defender, outcome } = entry
  const { action, attackerDamage, defenderDamage } = outcome

  const formattedAttacker = formatPlayerById(leftId, attacker.id)
  const formattedDefender = formatPlayerById(leftId, defender.id)

  if (action === 'dies') return `${formattedDefender} Creature dies`
  if (action === 'eats')
    return `${formattedAttacker} Eats ${round(attackerDamage)} HP (${round(
      attacker.health,
    )} HP remaining)`
  if (action === 'hits')
    return `${formattedAttacker} Creature hits for ${round(
      defenderDamage,
    )} HP (${round(defender.health)} HP remaining)`
  if (action === 'misses') return `${formattedAttacker} Creature misses`
  if (action === 'start') return 'The battle begins'
  if (action === 'starves') return `${formattedAttacker} Creature starves`

  return JSON.stringify(entry)
  // if (action === "hits")
}

const LogEntry = ({leftId, rightId, entry}, i) => (
  <ListItem key={i}>
    <ListItemText primary={formatEntry({leftId, rightId, entry})} />
  </ListItem>
)

const Log = ({ log, rightId, leftId }) => {
  const logWithIds = map(entry => {return {entry, rightId, leftId}}, log)
  return <List dense={true}>{mapWithIndex(LogEntry, logWithIds)}</List>
}

export default Log
