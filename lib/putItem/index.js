"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vanity_generator_1 = require("./vanity-generator");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;
exports.putItem = async (event, context, callback) => {
    console.log("received:", JSON.stringify(event));
    console.log("received:", JSON.stringify(context));
    console.log("received:", JSON.stringify(callback));
    const incomingParams = event["Details"]["Parameters"];
    const id = incomingParams["id"];
    const number = incomingParams["number"];
    const vanities = vanity_generator_1.generateVanities(number, 5);
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
