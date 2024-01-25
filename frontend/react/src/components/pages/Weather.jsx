import React, { useState, useContext, useEffect, useMemo } from 'react';
import BackendDataContext from '../../settings/BackendDataContext';

import Chart from '../parts/Chart';
import { sortByDate } from '../../utility/sort';
import TimeSlider from '../parts/TimeSlider';

import { FAKE_DATA } from '../../api/fake';
import { getAllDocs } from '../../utility/docs';
import { toastError } from '../../utility/toaster';
import { formatDate } from '../../utility/date';

const Weather = () => {

    const { getFieldEntry } = useContext(BackendDataContext);
    const [chosenCity, setChosenCity] = useState(null);
    const [chosenDate, setChosenDate] = useState(null);
    const [allDays, setAllDays] = useState(null);
    const [uniqueDates, setUniqueDates] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const id = window.location.href.split('?topic=')[1]
        if (id) {
            (async () => {
                await fetchTopicInfos(id);
            })()
        } else {
            console.log('No ID found in the URL.');
            toastError('No ID found. Please restart from the start page.')
        }
    }, [])

    const fetchTopicInfos = async (id) => {

        // With fancy caching in localStorage + Dexie (indexedDB)
        const getCityFromContext = await getFieldEntry('dataImages', id);

        // For development
        // const getCityFromContext = FAKE_DATA;

        // In case of indexedDB Errors: without caching in localStorage + dexie (indexedDB)
        // const getCityFromContext = await getAllDocs(id);

        if (!getCityFromContext) {
            toastError('Not valid City or Data. Please retry again from the main page.')
        }

        setChosenCity(getCityFromContext.filter(c => c.city == id));
        const unique = sortByDate(Array.from(new Set(chosen.map(item => item.datetime.split('T')[0]))));
        setUniqueDates(unique);

        const all = chosen.reduce((acc, city) => {
            const dateKey = city.datetime.split('T')[0];
            if (!acc[dateKey]) {
                acc[dateKey] = []; // Initialize the array if it doesn't exist
            }
            acc[dateKey].push(city);
            return acc;
        }, {});

        setAllDays(all);
        setChosenDate(unique[0])
    };

    const handleChoseDate = (date) => {
        setSliderValue(0);
        setChosenDate(date);
    }

    // Function to render date buttons
    const renderDateButtons = () => {
        if (!chosenCity) return <div></div>

        return uniqueDates.map((date, index) => (
            <button
                key={index}
                className="bg-sky-500 text-sky-200 font-bold uppercase tracking-wide text-xl p-4 mr-2 mb-2 rounded hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-800 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-200 ease-in-out"
                onClick={() => handleChoseDate(date)}
            >
                {formatDate(uniqueDates[index])}
            </button>
        ));
    };

    const handleSliderChange = (e) => {
        setSliderValue(e);
    };

    return (
        <div className="container mx-auto w-full mt-8">
            {chosenCity && <div className='w-full'>
                <div className='flex flex-row'>
                    <p className='text-4xl font-bold mr-4'>&#8982;</p>
                    <h1 className="text-4xl font-bold first-letter:uppercase mb-4">{chosenCity[0].city} - {formatDate(chosenDate)}</h1>
                </div>
                <div className="flex flex-row items-center">
                    <div className="w-1/2 h-[400px]">
                        {allDays && chosenDate && <img src={allDays[chosenDate][sliderValue].thumbnailUrl} alt={`Thumbnail for ${chosenCity[sliderValue].city}`} className="w-full h-auto max-h-[400px] my-4 rounded" />}
                    </div>


                    <div className="w-1/2 h-[400px] pt-4">
                        <Chart data={chosenCity} />
                    </div>
                </div>
                <div className='flex flex-row mt-8'>
                    <div className="w-1/2">
                        {chosenDate && <div className="w-full">
                            <TimeSlider data={chosenCity} chosenDate={chosenDate} sliderChange={handleSliderChange} sliderValue={sliderValue} />
                        </div>}
                    </div>
                    <div className="w-1/3 ml-20">
                        {renderDateButtons()}
                    </div>
                </div>
            </div>}

        </div>
    );
};

export default Weather;

