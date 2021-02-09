const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;
exports.getAllItems = async (event) => {
    console.log("received:", JSON.stringify(event));
    const params = { TableName: tableName };
    const { Items } = await docClient.scan(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(Items),
    };
    return response;
};
