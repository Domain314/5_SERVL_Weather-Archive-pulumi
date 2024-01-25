// Declaring response messages as constants
const RESPONSE_MESSAGES = {
    requestNotObject: 'Request is missing or must be an object.',
    imageNotString: "'image' is missing or must be a string.",
    metadataRequired: "'metadata' is required and must be an object. Minimum: {city: 'example', datetime: 'YYYY-MM-DDTHH:MM'}",
    cityRequired: "'city' is required and must be a non-empty string.",
    datetimeRequired: "'datetime' is required and must be a non-empty string in this format: 'YYYY-MM-DDTHH:MM'.",
    fieldMustBeNumber: (field) => `'${field}' is missing or must be a number.`
};

function validateRequest(request) {
    let errors = [];

    // Check if request is an object
    if (typeof request !== 'object' || request === null) {
        return { valid: false, message: [RESPONSE_MESSAGES.requestNotObject] };
    }

    // Check if 'metadata' is present and is an object
    if (!request.metadata || typeof request.metadata !== 'object') {
        return { valid: false, message: [RESPONSE_MESSAGES.metadataRequired] };
    }

    // Validate 'city' field in metadata (required field)
    if (typeof request.metadata.city !== 'string' || request.metadata.city.trim() === '') {
        return { valid: false, message: [RESPONSE_MESSAGES.cityRequired] };
    }

    try {
        // Validate 'datetime' field in metadata (required field)
        if (typeof request.metadata.datetime !== 'string' || request.metadata.datetime.trim() === '') {
            return { valid: false, message: [RESPONSE_MESSAGES.datetimeRequired] };
        }
        const date = new Date(request.metadata.datetime);

        if (!(date instanceof Date && !isNaN(date))) {
            return { valid: false, message: [RESPONSE_MESSAGES.datetimeRequired] };
        }
    } catch (e) {
        return {
            valid: false, message: [RESPONSE_MESSAGES.datetimeRequired]
        }
    }

    // Validate 'image' field (optional field)
    if (request.image !== undefined && typeof request.image !== 'string') {
        errors.push(RESPONSE_MESSAGES.imageNotString);
    }

    // Validate optional number fields in metadata
    const optionalNumberFields = ['humidity', 'airPressure', 'temperature'];
    for (const field of optionalNumberFields) {
        if (request.metadata[field] !== undefined && typeof request.metadata[field] !== 'number') {
            errors.push(RESPONSE_MESSAGES.fieldMustBeNumber(field));
        }
    }

    return { valid: true, message: errors.length > 0 ? errors : ['No Warnings. :)'] };
}

module.exports = {
    validateRequest
};



// Example for correct request
// {
//     image: "imageInBase64",
//     metadata: {
//         city: "Berlin",
//         humidity: 50,
//         airPressure: 1013,
//         temperature: 22,
//         datetime: "2024-01-21T10:00:00"
//     }
// };
