// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import React, { useContext, useEffect, useState } from 'react';
import BackendDataContext from '../settings/BackendDataContext'//'../settings/BackendConfigContext';

import { getAllDocs } from './docs';

import { checkIndexedDB } from "../utility/dbUtils" //"./db/dbUtils";

const Syncer = () => {

    const { createBackend, setContextField } = useContext(BackendDataContext);
    const [syncerVersions, setSyncerVersions] = useState(null);

    const setupBackendContext = (backendData) => {
        createBackend(backendData);
    }

    useEffect(() => {
        const runCheckIndexedDB = async () => {
            await checkIndexedDB(setSyncerVersions, setupBackendContext);
        };
        runCheckIndexedDB();
    }, [])

    return (<div className=''></div>);
}

export default Syncer;
