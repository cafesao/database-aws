import { Context } from "aws-lambda"

export default function logLambda(context: Context) {
  console.log("[Lambda - Layers] Log Lambda")
  console.log("\n")
  console.log("remaining time =", context.getRemainingTimeInMillis())
  console.log("functionName =", context.functionName)
  console.log("functionVersion =", context.functionVersion)
  console.log("memoryLimitInMB =", context.memoryLimitInMB)
  console.log("AWSrequestID =", context.awsRequestId)
  console.log("logGroupName =", context.logGroupName)
  console.log("logStreamName =", context.logStreamName)
  console.log("\n")
}
