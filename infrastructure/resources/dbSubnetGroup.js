const aws = require("@pulumi/aws");

function createDbSubnetGroup(vpc, subnets) {
    const dbSubnetGroup = new aws.rds.SubnetGroup("my-db-subnet-group", {
        subnetIds: subnets.map(subnet => subnet.id),
        vpcId: vpc.id,
    });

    return dbSubnetGroup;
}

module.exports = {
    createDbSubnetGroup
};