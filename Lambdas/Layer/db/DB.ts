import logParams from "../helpers/logParams"
import { People } from "./schema"

const DB = {
  get: async function (name: string) {
    try {
      logParams("db.get")
      const result = await People.get({ name })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  },
  getAll: async function () {
    try {
      logParams("db.getAll")
      const result = await People.scan().exec()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  },
  create: async function (body: any) {
    try {
      logParams("db.create")
      const result = await People.create(body)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  },
  update: async function (name: string, body: any) {
    try {
      logParams("db.update")
      const result = await People.update({ name }, body)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  },
  delete: async function (name: string) {
    try {
      logParams("db.delete")
      const result = await People.delete({ name })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default DB
