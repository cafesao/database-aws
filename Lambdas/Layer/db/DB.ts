import logParams from "../helpers/logParams"
import { People } from "./schema"

const DB = {
  get: async function (name: string) {
    try {
      logParams("db.get", name)
      const result = await People.get({ name })
      return result
    } catch (error) {
      console.log(error)
    }
  },
  getAll: async function () {
    try {
      logParams("db.getAll")
      const result = await People.scan().exec()
      return result
    } catch (error) {
      console.log(error)
    }
  },
  create: async function (body: any) {
    try {
      logParams("db.create", body)
      const result = await People.create(body)
      return result
    } catch (error) {
      console.log(error)
    }
  },
  update: async function (name: string, body: any) {
    try {
      logParams("db.update", name, body)
      const result = await People.update({ name }, body)
      return result
    } catch (error) {
      console.log(error)
    }
  },
  delete: async function (name: string) {
    try {
      logParams("db.delete", name)
      const result = await People.delete({ name })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

export default DB
