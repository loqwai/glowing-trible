import jsf    from "json-schema-faker"
import CreatureSchema from './CreatureSchema'

const GenerateCreature = async () => {  
  return jsf.resolve(CreatureSchema)
}

export default GenerateCreature
