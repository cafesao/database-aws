import { DynamoDB } from "aws-sdk"
import paramsDB from "./params"
import logParams from "../helpers/logParams"

const tableName = process.env.TABLE_NAME
const dynamoDB = new DynamoDB()

const DB = {
  get: async function (key: string, value: string) {
    try {
      logParams("DB.get", key, value)
      if (key === "cpf") {
        const params = paramsDB.getCpf(tableName, value)
        const result: any = await dynamoDB.query(params).promise()
        return DynamoDB.Converter.unmarshall(result.Items[0])
      } else {
        const params = paramsDB.getName(tableName, value)
        const result: any = await dynamoDB.query(params).promise()
        return DynamoDB.Converter.unmarshall(result.Items[0])
      }
    } catch (error) {
      console.error(error)
      return error
    }
  },
  getAll: async function (key: string, value: string) {
    try {
      logParams("DB.getAll")
      const params = paramsDB.getAll(tableName)
      const result: any = await dynamoDB.scan(params).promise()
      return result.Items.map((item: any) =>
        DynamoDB.Converter.unmarshall(item)
      )
    } catch (error) {
      console.error(error)
      return error
    }
  },
  create: async function (body: any) {
    try {
      logParams("DB.create", body)
      const params = paramsDB.putItem(tableName, body)
      const data = await dynamoDB.putItem(params).promise()
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  },
  update: async function (body: any, key: string, value: string) {
    try {
      logParams("DB.update", body, key, value)
      if (key === "name") {
        body["name"] = value
        const params = paramsDB.putItem(tableName, body)
        const data = await dynamoDB.putItem(params).promise()
        return data
      } else if (key === "cpf") {
        const dataCpf: any = await this.get(key, value)
        if (dataCpf) {
          body["name"] = dataCpf.name
          body["cpf"] === undefined ? (body["cpf"] = value) : null
          const params = paramsDB.putItem(tableName, body)
          const data = await dynamoDB.putItem(params).promise()
          return data
        } else {
          throw new Error("CPF not found")
        }
      } else {
        throw new Error("Key not found")
      }
    } catch (error) {
      console.error(error)
      return error
    }
  },
  delete: async function (key: string, value: string) {
    try {
      logParams("DB.delete", key, value)
      if (key === "cpf") {
        const dataCpf: any = await this.get("cpf", value)
        if (dataCpf) {
          const params = paramsDB.deleteItem(tableName, dataCpf.name)
          const data = await dynamoDB.deleteItem(params).promise()
          return data
        } else {
          throw new Error("CPF not found")
        }
      } else {
        const params = paramsDB.deleteItem(tableName, value)
        const data = await dynamoDB.deleteItem(params).promise()
        return data
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default DB
