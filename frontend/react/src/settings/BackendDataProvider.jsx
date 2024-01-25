// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import React, { useState, useEffect, useRef } from 'react';
import BackendDataContext from './BackendDataContext.jsx';
import BackendData from './BackendData';

import { getAllDocs, getOneDoc } from '../utility/docs.js';

const BackendDataProvider = ({ children }) => {

    const [backendData, setBackendData] = useState(null);

    const backendDataRef = useRef(backendData);
    useEffect(() => {
        backendDataRef.current = backendData;
    }, [backendData]);

    const backendInstance = new BackendData();

    const createBackend = (data) => {

        backendInstance.createBackend(data);
        setBackendData(backendInstance.getAll());
    };

    const getAll = () => {
        return backendData;
    };

    const getAuth = () => {
        return backendData?.auth;
    }

    const getContextField = async (field) => {
        if (backendDataRef.current === null) {
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (backendDataRef.current !== null) {
                        clearInterval(intervalId);
                        resolve(getContextField(field));
                    }
                }, 100);
            });
        }

        if (!backendDataRef.current?.[field] || Object.keys(backendDataRef.current?.[field]).length === 0) {
            const dataArray = await getAllDocs(field);
            const dataObj = dataArray.reduce((acc, entry) => {
                acc[entry.id] = entry;
                return acc;
            }, {});
            setContextField(field, dataObj);
            return dataObj;
        }

        if (backendDataRef.current[field]?.tags !== undefined) {
            return backendDataRef.current[field]?.tags.tags
        }
        return Object.values(backendDataRef.current[field]);
    };


    const getFieldEntry = async (field, id) => {
        if (backendDataRef.current === null) {
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (backendDataRef.current !== null) {
                        clearInterval(intervalId);
                        resolve(getFieldEntry(field, id));
                    }
                }, 100);
            });
        }


        if (!backendDataRef.current?.[field] || Object.keys(backendDataRef.current?.[field]).length === 0) {

            const data = await getContextField(field);

            if (data[field] === undefined) {
                const entry = await getOneDoc(field, id);
                setFieldEntry(field, entry.id, entry);
                return entry;
            }
            return data[field][id];
        }
        return backendDataRef.current[field][id];
    };

    const getPhotoByName = (name) => {
        return backendDataRef.current['photos'][name];
    }

    const setContextField = (field, value) => {
        const valueObj = Array.isArray(value) ? convertArrayToBigObject(value) : value;
        setBackendData((prevData) => {
            return {
                ...prevData,
                [field]: valueObj
            };
        });
    };

    const setFieldEntry = (field, id, value) => {
        setBackendData((prevData) => {
            return {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    [id]: value
                }
            };
        });
    }

    const setAuth = (auth) => {
        setBackendData((prevData) => {
            return {
                ...prevData,
                auth: auth
            }
        })
    }


    return (
        <BackendDataContext.Provider
            value={{
                backendData,
                createBackend,
                getAll,
                getAuth,
                getPhotoByName,
                getContextField,
                getFieldEntry,
                setContextField,
                setFieldEntry,
                setAuth
            }}
        >
            {children}
        </BackendDataContext.Provider>
    );
}

export default BackendDataProvider;

function convertArrayToBigObject(smallObjects) {
    return smallObjects.reduce((bigObject, smallObject) => {
        const { name } = smallObject;
        return { ...bigObject, [name]: smallObject };
    }, {});
}