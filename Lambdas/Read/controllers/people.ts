import { APIGatewayProxyEvent } from "aws-lambda"
// @ts-ignore
import Messages from "/opt/nodejs/helpers/messages"
// @ts-ignore
import DB from "/opt/nodejs/db/DB"

const controllerCompany = {
  get: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.queryStringParameters === null) {
        const result = await DB.getAll()
        console.log("[Lambda] People Get")
        return Messages.success(result)
      } else {
        const query = event.queryStringParameters
        const entries = Object.entries(query)[0]
        const key = entries[0]
        const value = entries[1]
        const result = await DB.get(key, value)
        console.log("[Lambda] People Get")
        return Messages.success(result)
      }
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  }
}

export default controllerCompany
