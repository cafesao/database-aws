import { APIGatewayProxyEvent } from "aws-lambda"
//@ts-ignore
import Messages from "/opt/nodejs/helpers/messages"
//@ts-ignore
import DB from "/opt/nodejs/db/DB"

const controller = {
  create: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.body === null) return Messages.error("Body Empty")
      const body = JSON.parse(event.body)
      await DB.create(body)
      console.log("[Lambda] People Create")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  }
}

export default controller
