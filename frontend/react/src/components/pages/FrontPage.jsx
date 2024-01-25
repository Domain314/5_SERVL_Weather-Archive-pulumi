import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import BackendDataContext from "../../settings/BackendDataContext";
import Logo from "../../assets/img/logo/logo-gradient.png"
import { toastError } from '../../utility/toaster';

import { FAKE_CITIES } from '../../api/fake';
import { getOneDoc } from '../../utility/docs';

const FrontPage = () => {
    const { getContextField, getPhotoByName } = useContext(BackendDataContext);
    const [allCities, setAllCities] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            await refreshCities();
        })()
    }, [])

    const navigate = useNavigate();

    const refreshCities = async () => {
        // With fancy caching in localStorage + Dexie (indexedDB)
        const getCitiesFromContext = (await getContextField('cities')).map(c => c.city);

        // For development
        // const getCitiesFromContext = FAKE_CITIES;

        // In case of indexedDB Errors: without caching with localStorage + Dexie (indexedDB)
        // const getCitiesFromContext = await getOneDoc();

        const ordered = Array.from(new Set(getCitiesFromContext));
        setAllCities(ordered);
    };

    const searchSuggestions = (query) => {
        return allCities.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    };

    const handleInputChange = (e) => {
        // Check for key events and if 1 or none suggestions are available
        if (suggestions.length <= 1 && e.type === 'keydown') {

            // if [Tab] pressed, use 'autocomplete' for the only suggestion
            if ((e.key === 'Tab' && suggestions.length == 1)) {
                e.preventDefault(); // Prevent default Tab behavior
                chooseSuggestion(suggestions[0], e.key);
                return;
            }

            // if [Enter] pressed, submit seach query. 
            if (e.key === 'Enter') {
                handleSubmit(suggestions[0]);
                return;
            }
        }

        // Process text input changes
        const newValue = e.target.value;
        setQuery(newValue);
        const suggestion = searchSuggestions(newValue);
        if (suggestion) {
            const uniqueSuggestions = Array.from(new Set(suggestion));
            setSuggestions(uniqueSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (sug) => {
        const lowerCaseQuery = sug ? sug : query.toLowerCase();
        if (allCities.includes(lowerCaseQuery)) {
            navigate(`/weather?topic=${lowerCaseQuery}`);
        } else {
            setError('Please select a valid topic from the autocomplete list.');
            toastError('Please select a valid topic from the autocomplete list.')
        }
    };

    const chooseSuggestion = (sug) => {
        setQuery(sug);
        handleInputChange({ target: { value: sug } });
        setSuggestions([]);
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className='text-4xl tracking-wider font-light mb-4'>The Weather Archive</h1>
            <img src={Logo} alt="The Weather Archive Logo" className="mb-8 w-[250px]" />
            <div className="flex flex-col items-start">
                {error && <p className="text-red-500 mb-2 mt-4">{error}</p>}

                <div className='flex flex-row items-center'>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleInputChange}
                        className="border p-4 rounded focus:rounded-t focus:rounded-b-none active:rounded-t active:rounded-b-none bg-sky-100 text-slate-950 font-bold w-96 text-lg border-none outline-none hover:shadow-md hover:shadow-sky-200/20 focus:shadow-lg focus:shadow-sky-200/50 transition-all duration-200 ease-in-out"
                        placeholder="Search for a city..."
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={!allCities}  // Disables the button when allCities is null
                        className={`bg-sky-500 text-sky-200 font-bold uppercase tracking-wide text-xl p-4 ml-4 rounded transition-all duration-200 ease-in-out ${!allCities ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-800 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50'}`}
                    >
                        Search
                    </button>

                </div>
                <ul className="list-none bg-sky-100 w-96 rounded-b divide-y divide-dashed divide-sky-900 shadow-lg shadow-sky-200/50">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="cursor-pointer first-letter:uppercase p-2 text-sky-950 text-lg" onClick={() => chooseSuggestion(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default FrontPage;
