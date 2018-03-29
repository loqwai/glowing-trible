import jsf from 'json-schema-faker'
import CreatureSchema from './CreatureSchema'

const GenerateCreature = async () => {
  return {
    genome: await jsf.resolve(CreatureSchema),
    health: 100,
  }
}

export default GenerateCreature
