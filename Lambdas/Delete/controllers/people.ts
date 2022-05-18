import { APIGatewayProxyEvent } from "aws-lambda"
//@ts-ignore
import Messages from "/opt/nodejs/helpers/messages"
//@ts-ignore
import DB from "/opt/nodejs/db/DB"

const controller = {
  delete: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.queryStringParameters === null)
        return Messages.error("Query String Empty")
      const query = event.queryStringParameters
      const key = Object.keys(query)[0]
      const value = query[key]
      await DB.delete(key, value)
      console.log("[Lambda] People Delete")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  }
}

export default controller
