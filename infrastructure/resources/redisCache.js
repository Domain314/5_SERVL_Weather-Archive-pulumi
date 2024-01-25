// "use strict";
// const pulumi = require("@pulumi/pulumi");
// const aws = require("@pulumi/aws");

// function createRedisCacheInstance() {
//     const redisConfig = {

//     };

//     const redisInstance = new aws.elasticache.Cluster("weatherArchiveRedisCluster", {
//         engine: "redis",
//         nodeType: "cache.t2.micro",
//         numCacheNodes: 1,
//         parameterGroupName: "default.redis3.2",
//         engineVersion: "3.2.10",
//         port: 6379,
//     });

//     return redisInstance;
// }

// module.exports = {
//     createRedisCacheInstance
// };
