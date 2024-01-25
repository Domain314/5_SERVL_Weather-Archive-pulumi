const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");
const fs = require("fs");
const path = require("path");

function getContentType(fileName) {
    const extension = path.extname(fileName).toLowerCase();

    switch (extension) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.js': return 'application/javascript';
        case '.json': return 'application/json';
        case '.png': return 'image/png';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        case '.svg': return 'image/svg+xml';
        default: return 'application/octet-stream';
    }
}

function uploadDirectoryToS3(bucketName, dirPath, basePath = "") {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            uploadDirectoryToS3(bucketName, filePath, path.join(basePath, file));
        } else {
            // Constructing the key with the base path
            const key = path.join(basePath, file);

            const object = new aws.s3.BucketObject(key, {
                bucket: bucketName,
                source: new pulumi.asset.FileAsset(filePath),
                contentType: getContentType(file)
            });
        }
    });
}

const bucketName = "weather-archive-frontend";
const publicDirectory = "./public";

// Ensure the S3 bucket exists
const bucket = new aws.s3.Bucket(bucketName);

uploadDirectoryToS3(bucketName, publicDirectory);
