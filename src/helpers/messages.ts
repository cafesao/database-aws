import { APIGatewayProxyResult } from "aws-lambda"

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*"
}

export default {
  success(payload: string | object): APIGatewayProxyResult {
    console.log("[Lambda] Return Message")
    return {
      statusCode: 200,
      body: JSON.stringify(payload),
      headers
    }
  },

  error(payload: string | object): APIGatewayProxyResult {
    console.log("[Lambda] Return Message")
    return {
      statusCode: 500,
      body: JSON.stringify(payload),
      headers
    }
  }
}
