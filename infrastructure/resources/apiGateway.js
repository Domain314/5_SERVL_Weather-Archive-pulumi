const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");

const GET_FUNCTIONS = ['dataHandlerLambda', 'pictureServiceLambda', 'frontendApiLambda'];
const POST_FUNCTIONS = ['dataHandlerLambda', 'pictureServiceLambda', 'frontendApiLambda'];

function addLambdaPermission(lambdaFunction, api, functionName) {
    const permissionName = `${functionName}-permission`;

    new aws.lambda.Permission(permissionName, {
        action: "lambda:InvokeFunction",
        function: lambdaFunction.name,
        principal: "apigateway.amazonaws.com",
        // This sourceArn is important to restrict this permission to only our API Gateway
        sourceArn: pulumi.interpolate`${api.executionArn}/*/*`
    });
}

function createApiGateway(lambdaFunctions) {
    // Create a REST API
    const api = new aws.apigatewayv2.Api("myApi", {
        description: "API for Weather Archive Project",
        protocolType: "HTTP",
    });

    const routeResources = [];

    // Loop over lambdaFunctions to create integrations and routes
    for (const [functionName, lambdaFunction] of Object.entries(lambdaFunctions)) {
        const lambdaIntegration = new aws.apigatewayv2.Integration(`${functionName}Integration`, {
            apiId: api.id,
            integrationType: "AWS_PROXY",
            integrationUri: lambdaFunction.arn,
            payloadFormatVersion: "2.0",
        });

        if (GET_FUNCTIONS.includes(functionName)) {
            // Create GET Route
            const route = new aws.apigatewayv2.Route(`${functionName}Route-GET`, {
                apiId: api.id,
                routeKey: `GET /${functionName}`,
                target: pulumi.interpolate`integrations/${lambdaIntegration.id}`,
            });
            routeResources.push(route);
        }

        if (POST_FUNCTIONS.includes(functionName)) {
            // Create POST Route
            const route2 = new aws.apigatewayv2.Route(`${functionName}Route-POST`, {
                apiId: api.id,
                routeKey: `POST /${functionName}`,
                target: pulumi.interpolate`integrations/${lambdaIntegration.id}`,
            });
            routeResources.push(route2);
        }

        // Add Lambda Permission
        addLambdaPermission(lambdaFunction, api, functionName);
    }

    // Collect route IDs in an array
    const routeIds = Object.keys(lambdaFunctions).map(functionName => `${functionName}Route`);

    // Create a deployment
    const deployment = new aws.apigatewayv2.Deployment("apiDeployment", {
        apiId: api.id,
        triggers: {
            redeployment: pulumi.all(routeIds.map(routeId => pulumi.output(routeId).id)).apply(ids => JSON.stringify(ids)),
        },
    }, { dependsOn: routeResources });

    // Create a stage. This is required for the API to be live
    new aws.apigatewayv2.Stage("apiStage", {
        apiId: api.id,
        name: "v1",
        autoDeploy: true,
    });

    return {
        apiEndpoint: api.apiEndpoint,
    };
}

module.exports = {
    createApiGateway
};
