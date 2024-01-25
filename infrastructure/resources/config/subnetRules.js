const rdsIngressRules = [
    {
        protocol: "tcp",
        fromPort: 5432,  // PostgreSQL
        toPort: 5432,
        cidrBlocks: ["0.0.0.0/0"]
        // cidrBlocks: ["your-lambda-functions-cidr-or-sg-id"]
    }
];

const rdsEgressRules = [
    {
        protocol: "-1",  // Allow all outbound traffic
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"]
    }
];

const lambdaIngressRules = [
    {
        fromPort: 0,
        toPort: 0,
        protocol: "-1", // Allow all protocols
        cidrBlocks: ["0.0.0.0/0"]

    }
];

const lambdaEgressRules = [
    {
        fromPort: 0,
        toPort: 0,
        protocol: "-1", // Allow all protocols
        cidrBlocks: ["0.0.0.0/0"]
    },
    {
        fromPort: 0,
        toPort: 0,
        protocol: "-1", // Allow all protocols
        self: true, // Allow communication within the same security group (Lambda to Lambda)
    },
];

module.exports = {
    rdsIngressRules,
    rdsEgressRules,
    lambdaIngressRules,
    lambdaEgressRules
}