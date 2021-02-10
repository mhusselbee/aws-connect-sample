"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vanity_generator_1 = require("./vanity-generator");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;
exports.putItem = async (event) => {
    console.log("received:", JSON.stringify(event));
    const id = event["Details"]["Parameters"]["id"];
    const number = event["Details"]["Parameters"]["number"];
    const vanities = vanity_generator_1.generateVanities(number, 15);
    const topFiveVanities = vanities.filter((v) => vanity_generator_1.isGoodVanity(v)).slice(0, 5);
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
