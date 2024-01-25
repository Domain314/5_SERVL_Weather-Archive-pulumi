"use strict";
const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");

// General function to create an S3 bucket
function createS3Bucket(bucketName, websiteConfig = null) {
    const bucketConfig = {
        bucket: bucketName,
    };

    if (websiteConfig) {
        bucketConfig.website = websiteConfig;
    }

    return new aws.s3.BucketV2(bucketName, bucketConfig);
}

// Function for setting ownership controls
function setBucketOwnershipControls(bucketId, name) {
    return new aws.s3.BucketOwnershipControls(`${name}-ownershipControls`, {
        bucket: bucketId,
        rule: {
            objectOwnership: "BucketOwnerPreferred",
        },
    });
}

// Function for setting public access block
function setBucketPublicAccessBlock(bucketId, blockSettings, name) {
    return new aws.s3.BucketPublicAccessBlock(`${name}-publicAccessBlock`, {
        bucket: bucketId,
        ...blockSettings,
    });
}

// Function for setting bucket ACL
function setBucketAcl(bucketId, acl, name) {
    return new aws.s3.BucketAclV2(`${name}-acl`, {
        bucket: bucketId,
        acl: acl,
    });
}

// Function for setting the public access policy 
function applyPublicReadPolicy(bucket, name) {
    const publicReadPolicyDocument = aws.iam.getPolicyDocumentOutput({
        statements: [{
            effect: "Allow",
            principals: [{
                type: "AWS",
                identifiers: ["*"],
            }],
            actions: ["s3:GetObject"],
            resources: [pulumi.interpolate`${bucket.arn}/*`],
        }],
        version: "2012-10-17",
    });

    const bucketPolicy = new aws.s3.BucketPolicy(`${name}-policy`, {
        bucket: bucket.id,
        policy: publicReadPolicyDocument.apply(policyDocument => policyDocument.json),
    });
}

// Function for setting CORS configuration
function setBucketCorsConfiguration(bucketId, corsRules) {
    return new aws.s3.BucketCorsConfigurationV2(`${bucketId}-corsConfiguration`, {
        bucket: bucketId,
        corsRules: corsRules,
    });
}

// Create the frontend bucket
function createFrontendBucket() {
    const bucket = createS3Bucket("weather-archive-frontend", {
        indexDocument: "index.html",
        errorDocument: "error.html"
    });

    // Apply additional configurations as needed
    setBucketOwnershipControls(bucket.id, "frontend");
    setBucketPublicAccessBlock(bucket.id, {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
    }, "frontend");
    setBucketAcl(bucket.id, "public-read", "frontend");
    setBucketCorsConfiguration(bucket.id, [
        {
            allowedHeaders: ["*"],
            allowedMethods: ["GET", "PUT", "POST"],
            allowedOrigins: ["*"],
            exposeHeaders: ["ETag"],
            maxAgeSeconds: 3000,
        }
    ]);
    applyPublicReadPolicy(bucket, "frontend");

    return bucket;
}

// Create the image upload bucket
function createImageUploadBucket() {
    const bucket = createS3Bucket("weather-archive-image-upload");
    // Apply additional configurations as needed
    // Customize these settings according to your requirements
    setBucketOwnershipControls(bucket.id, "imageUpload");
    setBucketPublicAccessBlock(bucket.id, {
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
    }, "imageUpload");
    // Assuming private access for image upload bucket
    setBucketAcl(bucket.id, "private", "imageUpload");

    // Optionally add CORS configuration if needed
    // setBucketCorsConfiguration(bucket.id, [...]);

    return bucket;
}

module.exports = {
    createFrontendBucket,
    createImageUploadBucket,
};

function randomNum() {
    return Math.floor(1000 + Math.random() * 9000);
}




/* Policy Backup

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*" <-- Change Bucket ARN
            ]
        }
    ]
}

*/