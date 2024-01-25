const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const { Client } = require('pg');

const RESPONSE_SENDING = {
    error: "Sending error. Possibly wrong format.",
    success: "Sending Success.",
    queryError: "Error executing query",
    querySuccess: "Data inserted successfully",
    allGood: 'Photo and metadata validated successfully',
};

// Configure database connection
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
};

async function insertWeatherData(metadata) {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const query = {
            text: 'INSERT INTO weather_data (photoname, city, temperature, humidity, air_pressure, datetime) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [metadata.photoName, metadata.city, metadata.temperature, metadata.humidity, metadata.air_pressure, metadata.datetime],
        };

        await client.query(query);
        console.log(RESPONSE_SENDING.querySuccess);
    } catch (err) {
        console.error(RESPONSE_SENDING.queryError, err.stack);
    } finally {
        client.end();
    }
};

async function sendToPictureService(image, metadata) {

    // Define the payload to send to the second Lambda
    const payload = {
        photoBuffer: image,
        metadata: metadata
    };

    // Set the parameters for invoking the second Lambda
    const params = {
        FunctionName: 'pictureServiceLambda',
        InvocationType: 'Event',
        Payload: JSON.stringify(payload)
    };

    // Invoke the pictureServiceLambda
    lambda.invoke(params, function (err, data) {
        if (err) {
            console.error(err);
            return { statusCode: 400, error: RESPONSE_SENDING.error };
        } else {
            console.log('Second Lambda invoked successfully', data);
            return { statusCode: 200, message: RESPONSE_SENDING.success }
        }
    });
}

module.exports = {
    insertWeatherData,
    sendToPictureService
};
