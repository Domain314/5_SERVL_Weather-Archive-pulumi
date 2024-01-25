const { validateRequest } = require('./res/validation');
const { insertWeatherData, sendToPictureService } = require('./res/send');
const { randomName } = require('./utils/random');

const AUTH_API_KEY = process.env.AUTH_API_KEY;

const RESPONSE_MESSAGES = {
    photoBase64: 'Photo must be base64.',
    validation: "Validation gone wrong. Check Warnings",
    validationTerrible: "Validation gone terribly wrong. Possibly not stringified JSON body.",
    unauthorized: 'Unauthorized: Invalid API Key',
    allGood: 'Photo and metadata sent successfully',
};

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    if (!event.headers || event.headers['x-api-key'] !== AUTH_API_KEY) {
        return setResponse(401, RESPONSE_MESSAGES.unauthorized);
    }

    let body, validationResult = { message: "" };
    try {
        body = JSON.parse(event.body);
        validationResult = validateRequest(body);

        if (!validationResult.valid) {
            // Handle validation errors
            return setResponse(400, RESPONSE_MESSAGES.validation, [], validationResult.message)
        }
    } catch (e) {
        return setResponse(400, RESPONSE_MESSAGES.validationTerrible, validationResult.message);
    }


    try {
        const { image, metadata } = JSON.parse(event.body);
        metadata.photoName = randomName();
        sendToPictureService(image, metadata, lambda)
        insertWeatherData(metadata);

    } catch (e) {
        return setResponse(400, RESPONSE_MESSAGES.photoBase64);
    }
    return setResponse(200, RESPONSE_MESSAGES.allGood, [], validationResult.message);
};

function setResponse(code, message, error = [], warnings = []) {
    return {
        statusCode: code,
        body: JSON.stringify({ message: message, error: error, warnings: warnings }),
    }
}

