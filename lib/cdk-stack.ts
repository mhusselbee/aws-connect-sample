import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import { App, CfnParameter, Duration, Stack, StackProps } from "@aws-cdk/core";

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
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
      timeout: Duration.seconds(60),
    });

    const putItemFunction = new lambda.Function(this, "putItem", {
      description: "Adds an item to the dynamo table",
      handler: "index.putItem",
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("./lib/putItem/putItem.zip"),
      environment,
      timeout: Duration.seconds(60),
    });
    // Give Read/Write permissions to the SampleTable
    table.grantReadWriteData(getAllItemsFunction);
    table.grantReadWriteData(putItemFunction);
  }
}
