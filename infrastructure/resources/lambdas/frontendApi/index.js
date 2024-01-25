const { fetchCities, fetchDataImages } = require('./res/query');

const RESPONSE_MESSAGES = {
    fetchError: 'Error while fetching data.',
    allGood: 'Data successfully retrieved',
};

exports.handler = async (event) => {
    let response;

    try {
        const query = event.queryStringParameters.query;

        switch (query) {
            case 'cities': response = await fetchCities(); break;
            case 'dataImages': response = await fetchDataImages(event.queryStringParameters.city); break;
            default: break;
        }

        return setResponse(200, response, RESPONSE_MESSAGES.allGood, error = [])

    } catch (error) {
        console.error('Error:', error);
        return setResponse(500, response, RESPONSE_MESSAGES.fetchError, [{ stack: error }]);
    }
};

function setResponse(code, data, message, error = [], warnings = []) {
    return {
        statusCode: code,
        body: JSON.stringify({ data: data, message: message, error: error, warnings: warnings }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    }
}