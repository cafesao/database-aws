import { DynamoDB } from "aws-sdk"

const params = {
  getCpf: (tableName: string, value: string) => {
    return {
      TableName: tableName,
      IndexName: "GSI_CPF",
      ExpressionAttributeValues: {
        ":search": { S: value }
      },
      ExpressionAttributeNames: {
        "#cpf": "cpf"
      },
      KeyConditionExpression: "#cpf = :search",
      ScanIndexForward: false
    }
  },
  getName: (tableName: string, value: string) => {
    return {
      TableName: tableName,
      ExpressionAttributeValues: {
        ":search": { S: value }
      },
      ExpressionAttributeNames: {
        "#name": "name"
      },
      KeyConditionExpression: "#name = :search",
      ScanIndexForward: false
    }
  },
  getAll: (tableName: string) => {
    return {
      TableName: tableName
    }
  },
  putItem: (tableName: string, body: any) => {
    return {
      TableName: tableName,
      Item: DynamoDB.Converter.marshall(body)
    }
  },
  deleteItem: (tableName: string, value: string) => {
    return {
      TableName: tableName,
      Key: {
        name: {
          S: value
        }
      }
    }
  }
}

export default params
