"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const dynamodb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const core_1 = require("@aws-cdk/core");
class CdkStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const table = new dynamodb.Table(this, "SampleTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            readCapacity: 2,
            writeCapacity: 2,
        });
        const environment = { SAMPLE_TABLE: table.tableName };
        const getAllItemsFunction = new lambda.Function(this, "getAllItems", {
            description: "A simple example to get all items from a DynamoDB table.",
            handler: "index.getAllItems",
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset("./lib/getItems/getItems.zip"),
            environment,
            timeout: core_1.Duration.seconds(60),
        });
        const putItemFunction = new lambda.Function(this, "putItem", {
            description: "Adds an item to the dynamo table",
            handler: "index.putItem",
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset("./lib/putItem/putItem.zip"),
            environment,
            timeout: core_1.Duration.seconds(60),
        });
        // Give Read/Write permissions to the SampleTable
        table.grantReadWriteData(getAllItemsFunction);
        table.grantReadWriteData(putItemFunction);
    }
}
exports.CdkStack = CdkStack;
