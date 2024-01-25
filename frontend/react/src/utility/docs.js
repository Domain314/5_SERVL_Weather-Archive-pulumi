// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import axios from 'axios';
import { sortEntries } from './sort';
import { FAKE_CITIES, FAKE_DATA } from '../api/fake';

const apiUrl = 'https://zg92u37uvc.execute-api.us-east-1.amazonaws.com/v1/frontendApiLambda';

// Get all data for a city
export async function getAllDocs(city) {
    // for development
    // return FAKE_DATA;

    // Fetch data + images
    const data = await fetchData({ query: 'dataImages', city: city })

    if (data) {
        return sortEntries(data.data);
    } else {
        return [];
    }
}

export async function getOneDoc() {
    // for development
    // return FAKE_CITIES;

    // Fetch cities
    const data = await fetchData({ query: 'cities' });

    if (data.data) {
        return data.data;
    } else {
        return [];
    }
}

const fetchData = async (queryParams = {}) => {
    try {
        const response = await axios.get(apiUrl, { params: queryParams });
        console.log('RESPONSE:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
