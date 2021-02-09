import { generateVanities } from "./vanity-generator";

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;

exports.putItem = async (event: any, context: any, callback: any) => {
  console.log("received:", JSON.stringify(event));
  console.log("received:", JSON.stringify(context));
  console.log("received:", JSON.stringify(callback));
  const incomingParams = event["Details"]["Parameters"];
  const id = incomingParams["id"];
  const number = incomingParams["number"];
  const vanities = generateVanities(number, 5);
  const params = {
    TableName: tableName,
    Item: { id, number, vanities },
  };
  await docClient.put(params).promise();
  const response = {
    vanity1: vanities[0],
    vanity2: vanities[1],
    vanity3: vanities[2],
  };
  return response;
};
