const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

// Create a new Lambda Layer
function createNodeModulesLayer() {
    const nodeModulesLayer = new aws.lambda.LayerVersion("nodeModulesLayer", {
        layerName: "nodejs-dependencies",
        code: new pulumi.asset.FileArchive("./resources/lambdas/nodeModulesLayer.zip"), // Path to your zipped layer file
        compatibleRuntimes: ["nodejs16.x"], // Specify compatible runtimes
    });

    return nodeModulesLayer.arn;
}

module.exports = {
    createNodeModulesLayer
};
