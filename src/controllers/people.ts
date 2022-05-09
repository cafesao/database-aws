import { APIGatewayProxyEvent } from "aws-lambda"

import Messages from "../helpers/messages"
import DB from "../db/DB"

const controllerCompany = {
  get: async (event: APIGatewayProxyEvent) => {
    try {
      console.log("[Lambda] People Get")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  },
  create: async (event: APIGatewayProxyEvent) => {
    try {
      console.log("[Lambda] People Create")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  },
  update: async (event: APIGatewayProxyEvent) => {
    try {
      console.log("[Lambda] People Update")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  },
  delete: async (event: APIGatewayProxyEvent) => {
    try {
      console.log("[Lambda] People Delete")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  }
}

export default controllerCompany
