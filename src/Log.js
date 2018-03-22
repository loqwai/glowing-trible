import React from 'react'
import map from 'lodash/fp/map'
import round from 'lodash/fp/round'
import List, { ListItem, ListItemText } from 'material-ui/List'

const mapWithIndex = map.convert({ cap: false })

const formatPlayerById = id => {
  if (id === 0) return 'Left'
  if (id === 1) return 'Right'

  return 'unkown'
}

const formatEntry = entry => {
  const { attacker, defender, outcome } = entry
  const { action, attackerDamage, defenderDamage } = outcome

  const formattedAttacker = formatPlayerById(attacker.id)
  const formattedDefender = formatPlayerById(defender.id)

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

const LogEntry = (entry, i) => (
  <ListItem key={i}>
    <ListItemText primary={formatEntry(entry)} />
  </ListItem>
)

const Log = ({ log }) => {
  return <List dense={true}>{mapWithIndex(LogEntry, log)}</List>
}

export default Log
