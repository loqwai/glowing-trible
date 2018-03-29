import sample from 'lodash/fp/sample'
import map from 'lodash/fp/map'
import times from 'lodash/fp/times'
import last from 'lodash/fp/last'
import groupBy from 'lodash/fp/groupBy'
import orderBy from 'lodash/fp/orderBy'
import identity from 'lodash/fp/identity'
import flatten from 'lodash/fp/flatten'
import uniq from 'lodash/fp/uniq'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'
import concat from 'lodash/fp/concat'

import {creatureToFighter, genomeToCreature} from '../helpers/fighter'
import Fight from '../logic/Fight'
import Breed from '../logic/Breed'
import GenerateSuitors from '../logic/GenerateSuitors'

const orderByLength = orderBy('length', 'desc')
const groupByIdentity = groupBy(identity)


const generationsToRun = 100
const generationSize = 100
const fightCount = 1000
const suitorsToGenerate = 10
const winnersToKeep = 10

const run = async (previousGeneration=[], generationCount=0) => {
    if(generationCount === generationsToRun) return previousGeneration

    const suitors = await GenerateSuitors(suitorsToGenerate)
    const generation = breedPopulation(concat(suitors, previousGeneration))
    const fighters = map(creatureToFighter, generation)
    const logs = times(() => fightAndBreed(fighters), fightCount)
    const winnerIds = logsToWinners(logs)
    const winners = filter((creature) => includes(creature.id, winnerIds), generation)
    return run(winners, generationCount+1)
}

const  breedPopulation = (population) => {
  const childGenomes = times(()=> Breed([sample(population).genome, sample(population).genome]), generationSize)
  return map(genomeToCreature, childGenomes)  
}

const logsToWinners = (logs) => {
  const winners = map((log) => last(log).attacker.id, logs)
  const scores =  orderByLength(groupByIdentity(winners))
  scores.length = winnersToKeep
  return uniq(flatten(scores))
}

const fightAndBreed  = (generation) => {
  const creature1 = sample(generation)
  const creature2 = sample(generation)
  return Fight(creature1, creature2)
}

run().then(winners => {
    console.log(JSON.stringify(map(creatureToFighter, winners), null, 2))
})
