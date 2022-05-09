import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import routes from "./routes"
import logLambda from "./helpers/logLambda"

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  logLambda(context)
  const controller = routes(event.path, event.httpMethod)
  const response: APIGatewayProxyResult = await controller(event)
  callback(null, response)
}
