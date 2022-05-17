import { APIGatewayProxyEvent } from "aws-lambda"
//@ts-ignore
import Messages from "/opt/nodejs/helpers/messages"
//@ts-ignore
import DB from "/opt/nodejs/db/DB"

const controllerCompany = {
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
