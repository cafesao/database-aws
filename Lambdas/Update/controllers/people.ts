import { APIGatewayProxyEvent } from "aws-lambda"
// @ts-ignore
import Messages from "/opt/nodejs/helpers/messages"
// @ts-ignore
import DB from "/opt/nodejs/db/DB"

const controllerCompany = {
  update: async (event: APIGatewayProxyEvent) => {
    try {
      if (event.body === null || event.queryStringParameters === null)
        return Messages.error("Body Empty")

      const { name } = event.queryStringParameters
      const body = JSON.parse(event.body)
      await DB.update(name, body)
      console.log("[Lambda] People Update")
      return Messages.success("true")
    } catch (error: any) {
      console.log(error)
      return Messages.error(JSON.stringify(error))
    }
  }
}

export default controllerCompany
