import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackPage = ({ data }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [cities, setCities] = useState([]);

    const apiUrl = 'https://zg92u37uvc.execute-api.us-east-1.amazonaws.com/v1/frontendApiLambda';

    const fetchData = async (queryParams = {}) => {
        try {
            const response = await axios.get(apiUrl, { params: queryParams });
            console.log('RESPONSE:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch cities
        fetchData({ query: 'cities' }).then(data => {
            if (data && data.cities) {
                setCities(data.cities);
            }
        });

        // Fetch image URL
        fetchData({ query: 'dataImages', city: 'Stadt' }).then(data => {
            if (data && data.imageUrl) {
                setImageUrl(data.imageUrl);
            }
        });
    }, []);

    return (
        <>
            <h1>Test</h1>
            {imageUrl && <img src={imageUrl} alt="Fetched from AWS" />}
            {cities.length > 0 && (
                <ul>
                    {cities.map((city, index) => (
                        <li key={index}>{city}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default BackPage;
