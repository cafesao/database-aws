import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import routes from "./routes"
// @ts-ignore
import logLambda from "/opt/nodejs/helpers/logLambda"

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  logLambda(context)
  const controller = routes(event.path)
  const response: APIGatewayProxyResult = await controller(event)
  callback(null, response)
}
