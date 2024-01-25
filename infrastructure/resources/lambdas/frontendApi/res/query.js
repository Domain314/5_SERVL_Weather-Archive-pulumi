const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const { Client } = require('pg');
const { checkRedis, cacheToRedis } = require('./red');

const { FAKE_DATA, FAKE_CITIES } = require('../test/test');

// Configure your database connection here
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
};

const s3 = new AWS.S3();
const s3BucketName = process.env.IMAGE_UPLOAD_BUCKET;

async function fetchCities() {

    const redisResult = await checkRedis();

    if (redisResult.length > 0) {
        return redisResult;
    }

    // If not cached, connect to db
    const client = new Client(dbConfig);

    try {
        await client.connect();

        // for production
        const res = await client.query('SELECT city FROM weather_data');

        // for development
        // const res = { rows: FAKE_CITIES };

        const cities = Array.from(new Set(res.rows.map(c => c.city)));
        await cacheToRedis(cities);

        return cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    } finally {
        await client.end();
    }

}

async function fetchDataImages(cityName) {
    if (typeof cityName !== 'string' && cityName.length > 20) {
        console.error('Invalid City Name: ', cityName);
        throw error;
    }

    const client = new Client(dbConfig);
    await client.connect();

    try {
        // Use parameterized queries to prevent SQL injection
        const res = await client.query('SELECT * FROM weather_data WHERE city = $1;', [cityName]);

        // for development
        // const res = FAKE_DATA;

        // Create new Array of Promises to get Image-URLs
        const rowsWithUrls = await Promise.all(res.rows.map(async (row) => {
            const url = row.photoName ? await fetchImageUrl(row.photoName) : '';
            return { ...row, photoUrl: url };
        }));

        // Return the modified rows
        return rowsWithUrls;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } finally {
        await client.end();
    }
}

async function fetchImageUrl(imageKey) {
    if (!imageKey) {
        return "";
    }
    const url = s3.getSignedUrl('getObject', {
        Bucket: s3BucketName,
        Key: `upload/${imageKey}_700x300.webp`,
        Expires: 1200 // URL expires in 20 min
    });
    return url;
}

module.exports = {
    fetchCities,
    fetchDataImages
};
