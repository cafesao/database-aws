import { DynamoDB } from "aws-sdk"

const tableName = process.env.TABLE_NAME
const dynamoDB = new DynamoDB()

const DB = {
  get: async (key: any) => {},
  create: async (body: any, key: any) => {},
  update: async (body: any, key: any) => {},
  delete: async (key: any) => {}
}

export default DB
