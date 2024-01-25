"use strict";

// Existing resources
const vpc = require('./resources/vpc');
const internetGateway = require('./resources/internetGateway');
const routeTable = require('./resources/routeTable');
const subnet = require('./resources/subnet');
const securityGroup = require('./resources/securityGroup');
const apiGateway = require('./resources/apiGateway');
const networkInterface = require('./resources/networkInterface');
const elasticIP = require('./resources/elasticIP');

// New resources
const s3Bucket = require('./resources/s3Bucket');
const lambdaFunctions = require('./resources/lambdaFunctions');
const rdsPostgres = require('./resources/rdsPostgres');
const dbSubnetGroup = require('./resources/dbSubnetGroup');
// const redisCache = require('./resources/redisCache');

const {
    rdsIngressRules,
    rdsEgressRules,
    lambdaIngressRules,
    lambdaEgressRules
} = require('./resources/config/subnetRules');

const az = ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d', 'us-east-1e', 'us-east-1f'];
const subnetAmount = 2; // max: az.length

async function createInfrastructure() {

    const myVpc = vpc.createVpc();
    const myIgw = internetGateway.createInternetGateway(myVpc);
    const myRouteTable = routeTable.createRouteTable(myVpc, myIgw);

    const mySubnets = [];
    for (let i = 0; i < subnetAmount; i++) {
        mySubnets.push(subnet.createSubnet(myVpc, myRouteTable, az[i], `10.0.${i}.0/24`));
    }

    const myLambdaSecurityGroup = securityGroup.createSecurityGroup(myVpc, "lambda-security-group", lambdaIngressRules, lambdaEgressRules);

    // Construct a vpcConfig object
    const vpcConfig = {
        securityGroupIds: [myLambdaSecurityGroup.id],
        subnetIds: mySubnets.map(sn => sn.id),
    };

    const myDbSubnetGroup = dbSubnetGroup.createDbSubnetGroup(myVpc, mySubnets);

    const rdsSecurityGroup = securityGroup.createSecurityGroup(myVpc, "rds-security-group", rdsIngressRules, rdsEgressRules);
    const myRdsPostgres = rdsPostgres.createRdsPostgresInstance(myDbSubnetGroup, rdsSecurityGroup);
    rdsPostgres.initRdsDb(myRdsPostgres, lambdaFunctions.lambdaExecutionRole);

    const myS3BucketFrontend = s3Bucket.createFrontendBucket();
    const myS3BucketImageUpload = s3Bucket.createImageUploadBucket();

    const myLambdaFunctions = lambdaFunctions.createLambdaFunctions(vpcConfig, myRdsPostgres, myS3BucketImageUpload);

    // Create API Gateway and connect with Lambda functions
    const myApiGateway = apiGateway.createApiGateway(myLambdaFunctions);
    // const myRedisCache = redisCache.createRedisCacheInstance();
}

createInfrastructure();

