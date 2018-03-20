import sample from "lodash/fp/sample"
import mean from "lodash/fp/mean"
import map from "lodash/fp/map"
import each from "lodash/fp/each"
import random from "lodash/fp/random"
import clamp from "lodash/fp/clamp"
import isArray from "lodash/fp/isArray"
import compact from "lodash/fp/compact"
import zipAll from "lodash/fp/zipAll"
import difference from "lodash/fp/difference"
import cloneDeep from "lodash/fp/cloneDeep"

const randomWithFloat = random.convert({ fixed: false })
const eachWithKey = each.convert({ cap: false })

const plus = (a, b) => a + b
const minus = (a, b) => a + b

const mutateFloat = originalValue => {
  const mutationSelector = sample([plus, minus])
  const mutant = mutationSelector(originalValue, originalValue / 10 || 0.01)
  return clamp(0, 1, mutant)
}

const remove = originalArray =>
  difference(originalArray, [sample(originalArray)])
const add = originalArray =>
  cloneDeep(originalArray).push(sample(originalArray))

const mutateArray = originalArray => {
  const mutationSelector = sample([remove, add])
  return mutationSelector(originalArray)
}

const crossAndMutateFloat = ({ genomes, key, mutationRate }) => {
  const geneSelector = sample([sample, mean])
  const props = map(key, genomes)
  const childValue = geneSelector(props)
  if (randomWithFloat(0, 1, true) < mutationRate) {
    return mutateFloat(childValue)
  }
  return childValue
}

const crossAndMutateArray = ({ genomes, key, mutationRate }) => {
  const genomeParts = map(key, genomes)
  const zippedParts = zipAll(genomeParts)
  const newParts = map(Breed, zippedParts)
  if (randomWithFloat(0, 1, true) < mutationRate) {
    return mutateArray(newParts)
  }
  return newParts
}

const Breed = genomes => {
  genomes = compact(genomes)
  const child = {}
  const favoriteParent = sample(genomes)
  const mutationRate = favoriteParent.mutationRate || 0

  eachWithKey((value, key) => {
    if (isArray(value)) {
      child[key] = crossAndMutateArray({ genomes, key, mutationRate })
      return
    }
    child[key] = crossAndMutateFloat({ genomes, key, mutationRate })
  }, favoriteParent)
  return child
}

export default Breed
