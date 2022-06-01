import { Schema, model } from "dynamoose"

const TABLE_NAME = process.env.TABLE_NAME

const peopleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  }
})

const People = model(TABLE_NAME, peopleSchema)

export { People }
