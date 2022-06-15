import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import routes from "./routes"

import logLambda from "/opt/nodejs/helpers/logLambda"
import verifyKey from "/opt/nodejs/helpers/verifyKey"

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  logLambda(context)
  const { key } = event.headers
  if (!verifyKey(key)) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Unauthorized"
      })
    }
  }
  const controller = routes(event.path)
  const response: APIGatewayProxyResult = await controller(event)
  callback(null, response)
}
