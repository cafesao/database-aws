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
  update: async function (body: any) {
    try {
      logParams("DB.update", body)
      if (body.hasOwnProperty("name")) {
        const params = paramsDB.putItem(tableName, body)
        const data = await dynamoDB.putItem(params).promise()
        return data
      } else {
        const dataCpf: any = await this.get("cpf", body.cpf)
        if (dataCpf) {
          body["name"] = dataCpf.name
          const params = paramsDB.putItem(tableName, body)
          const data = await dynamoDB.putItem(params).promise()
          return data
        } else {
          throw new Error("CPF not found")
        }
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
