const aws = require("@pulumi/aws");

function createSecurityGroup(vpc, name, ingressRules, egressRules) {
    const securityGroup = new aws.ec2.SecurityGroup(name, {
        vpcId: vpc.id,
        description: `Security group for ${name}`,
        ingress: ingressRules,
        egress: egressRules
    });
    return securityGroup;
}

module.exports = {
    createSecurityGroup,
};
