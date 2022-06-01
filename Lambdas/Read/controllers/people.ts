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
        const { name } = event.queryStringParameters
        const result = await DB.get(name)
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
