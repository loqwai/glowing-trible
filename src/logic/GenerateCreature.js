import jsf from 'json-schema-faker'
import CreatureSchema from './CreatureSchema'
import  uuid  from 'uuid'
const GenerateCreature = async () => {
  return {
    genome: await jsf.resolve(CreatureSchema),
    health: 100,
    id: uuid.v4()
  }
}

export default GenerateCreature
