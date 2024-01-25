const AWS = require('aws-sdk');
const sharp = require('sharp');

// Initialize S3 client
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const { image, metadata } = JSON.parse(event.body);
    const photoBuffer = Buffer.from(image, 'base64');
    const photoName = metadata.photoName;

    try {
        // Resize and convert the image to WebP format
        const resizedImage = await sharp(photoBuffer)
            .resize({ width: 700 })
            .toFormat('webp', { quality: 80 })
            .toBuffer();

        // Define the S3 upload parameters
        const uploadParams = {
            Bucket: process.env.IMAGE_UPLOAD_BUCKET,
            Key: `upload/${photoName}_700x300.webp`,
            Body: resizedImage,
            ContentType: 'image/webp',
            ACL: 'public-read'
        };

        // Upload the image to S3
        await s3.putObject(uploadParams).promise();

        return { statusCode: 200, body: 'Image processed and uploaded successfully' };
    } catch (error) {
        console.error('Error processing and uploading image:', error);
        return { statusCode: 500, body: 'Error processing and uploading image' };
    }
};