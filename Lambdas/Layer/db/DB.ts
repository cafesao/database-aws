import { DynamoDB } from "aws-sdk"
import prepareObj from "../helpers/prepareObj"

const tableName = process.env.TABLE_NAME
const dynamoDB = new DynamoDB()

const DB = {
  get: async (key: string, value: string) => {
    try {
      const data = await dynamoDB
        .getItem({
          TableName: tableName,
          Key: {
            [key]: {
              S: value
            }
          }
        })
        .promise()
      return data.Item
    } catch (error) {
      console.error(error)
      return error
    }
  },
  create: async (body: any) => {
    try {
      const data = await dynamoDB
        .putItem({
          TableName: tableName,
          Item: prepareObj(body)
        })
        .promise()
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  },
  update: async (body: any) => {
    try {
      const params = {
        TableName: tableName,
        Item: prepareObj(body)
      }
      const data = await dynamoDB.putItem(params).promise()
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  },
  delete: async (key: string, value: string) => {
    try {
      const data = await dynamoDB
        .deleteItem({
          TableName: tableName,
          Key: {
            [key]: {
              S: value
            }
          }
        })
        .promise()
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default DB
