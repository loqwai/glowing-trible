import map from "lodash/fp/map"
import set from "lodash/fp/set"
import times from "lodash/fp/times"
import GenerateCreature from "./GenerateCreature"

const GenerateSuitors = (properties, number) => {
  const creatures = times(() => GenerateCreature(properties), number)

  return map(set("mutationRate", 0.005), creatures)
}

export default GenerateSuitors
