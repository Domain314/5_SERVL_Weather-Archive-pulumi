const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const nodeModulesLayer = require('./lambdas/nodeModulesLayer');

const lambdaExecutionRole = { arn: "arn:aws:iam::698592782776:role/LabRole" } // lambda execution role LabRole: https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/details/LabRole?section=permissions
// Utility function to create a lambda function
function createLambdaFunction(name, handlerFilePath, environmentVariables = {}, vpcConfig, layer) {

    const lambdaFunction = new aws.lambda.Function(name, {
        runtime: aws.lambda.Runtime.NodeJS16dX,
        code: new pulumi.asset.FileArchive(handlerFilePath),
        handler: "index.handler",
        role: lambdaExecutionRole.arn,
        environment: {
            variables: environmentVariables
        },
        vpcConfig: vpcConfig,
        layers: [layer],
        timeout: 5
    });

    return lambdaFunction;
}

// Function to set up all the required lambda functions for the Weather Archive
function createLambdaFunctions(vpcConfig, rds) {

    const layer = nodeModulesLayer.createNodeModulesLayer();

    // Data Handler Lambda
    const dataHandlerLambda = createLambdaFunction(
        "dataHandlerLambda",
        "./resources/lambdas/dataHandler/",
        {
            AUTH_API_KEY: "my-super-secret-api-key-which-should-be-stored-als-env-variable",
            DB_USER: 'dom314',
            DB_HOST: rds.endpoint,
            DB_DATABASE: 'weatherarchivedb',
            DB_PASSWORD: '12345678'
        },
        vpcConfig,
        layer
    );

    // Picture Service Lambda
    const pictureServiceLambda = createLambdaFunction(
        "pictureServiceLambda",
        "./resources/lambdas/pictureService/",
        {
            IMAGE_UPLOAD_BUCKET: "weather-archive-image-upload",
        },
        vpcConfig,
        layer
    );

    // Video Service Lambda
    const frontendApiLambda = createLambdaFunction(
        "frontendApiLambda",
        "./resources/lambdas/frontendApi/",
        {
            DB_USER: 'dom314',
            DB_HOST: rds.endpoint,
            DB_DATABASE: 'weatherarchivedb',
            DB_PASSWORD: '12345678',
            IMAGE_UPLOAD_BUCKET: "weather-archive-image-upload",
            REDIS_USER: 'aws-user',
            REDIS_PASSWORD: 'FHTechnikumWien-1',
            REDIS_ENDPOINT: 'redis-19730.c322.us-east-1-2.ec2.cloud.redislabs.com'
        },
        vpcConfig,
        layer
    );

    return {
        dataHandlerLambda,
        pictureServiceLambda,
        frontendApiLambda
    };
}

module.exports = {
    createLambdaFunctions,
    createLambdaFunction,
    lambdaExecutionRole
};
