import { generateVanities, isGoodVanity } from "./vanity-generator";

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;

exports.putItem = async (event: any) => {
  console.log("received:", JSON.stringify(event));

  const id = event["Details"]["Parameters"]["id"];
  const number = event["Details"]["Parameters"]["number"];

  const vanities = generateVanities(number, 15);
  const topFiveVanities = vanities.filter((v) => isGoodVanity(v)).slice(0, 5);

  const params = {
    TableName: tableName,
    Item: {
      id,
      number,
      vanities: topFiveVanities,
      callInitiatedAt: new Date(),
    },
  };

  await docClient.put(params).promise();

  return {
    vanity1: topFiveVanities[0],
    vanity2: topFiveVanities[1],
    vanity3: topFiveVanities[2],
  };
};
