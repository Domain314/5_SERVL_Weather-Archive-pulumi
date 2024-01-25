const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");

function createRdsPostgresInstance(subnetGroup, securityGroup) {
    // Define the RDS Postgres instance
    const dbInstance = new aws.rds.Instance("my-db-instance", {
        allocatedStorage: 20, // Size in GB
        engine: "postgres",
        engineVersion: "16.1",
        instanceClass: "db.t3.micro", // Instance type
        dbName: "weatherarchivedb", // Database name
        username: "dom314", // Admin username
        password: "12345678", // Admin password
        parameterGroupName: "default.postgres16",
        skipFinalSnapshot: true,
        vpcSecurityGroupIds: [securityGroup.id],
        dbSubnetGroupName: subnetGroup.name,
        publiclyAccessible: true
    });

    return dbInstance;
}

function initRdsDb(rdsPostgres, lambdaRole) {
    const dbInitScript = new pulumi.asset.FileAsset("init-db.sql");

    // const dbInitLambda = new aws.lambda.Function("dbInitLambda", {
    //     runtime: aws.lambda.NodeJS12dXRuntime,
    //     role: lambdaRole.arn,
    //     handler: "index.handler",
    //     code: new pulumi.asset.AssetArchive({
    //         ".": new pulumi.asset.FileArchive("./path_to_your_lambda_code"),
    //     }),
    //     environment: {
    //         variables: {
    //             DATABASE_HOST: rdsPostgres.address,
    //             DATABASE_USER: "dom314",
    //             DATABASE_PASSWORD: "12345678",
    //             DATABASE_NAME: "weatherarchivedb",
    //         },
    //     },
    // });

    // // Lambda to execute on RDS instance creation
    // new aws.cloudwatch.EventRule("onRdsEvent", {
    //     eventPattern: JSON.stringify({
    //         source: ["aws.rds"],
    //         detailType: ["RDS DB Instance Event"],
    //         detail: {
    //             eventName: ["CreateDBInstance"],
    //         },
    //     }),
    // });

    // new aws.cloudwatch.EventTarget("invokeLambda", {
    //     rule: "onRdsEvent",
    //     arn: dbInitLambda.arn,
    // });

    // // Grant Lambda permissions to invoke
    // new aws.lambda.Permission("lambdaInvokePermission", {
    //     action: "lambda:InvokeFunction",
    //     function: dbInitLambda.name,
    //     principal: "events.amazonaws.com",
    //     sourceArn: pulumi.interpolate`${onRdsEvent.arn}`,
    // });
}

module.exports = {
    createRdsPostgresInstance,
    initRdsDb
};
