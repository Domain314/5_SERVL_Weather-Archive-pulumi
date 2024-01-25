// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import { SYNCER_CONFIG } from "../configs/syncer";

import * as db from "./dbController";
import { getAllDocs } from "./docs";
import { getLocalVersions, setLocalVersions, getSyncerVersion, createSyncerVersion } from "./localStorage";

/**
 * Function to create syncer based on versions.
 * ONLY RUN FROM BACKEND AND ONLY FOR SETTING UP SYNCER, AFTER A BACKEND-CONFIG WAS ADDED.
 * @async
 * @param {Object} versions - Version information.
 */
export const createSyncer = async (versions) => {
    try {
        for (const col in SYNCER_CONFIG) {
            if (versions?.[col] === undefined && col !== 'syncer') {
                // not needed
            }
        }
    } catch (error) {
        console.error("Error in createSyncer:", error);
    }
}

/**
 * Checks the version of the data in local storage against the version in Firebase,
 * and updates the local data if necessary.
 * @async
 * @param {Object} versions - An object where the keys are collection names and the values are version numbers.
 * @param {Object} localVersions - An object where the keys are collection names and the values are version numbers from local storage.
 */
export const checkVersions = async (versions, localVersions) => {
    const newLocalVersions = {};

    const promises = Object.keys(SYNCER_CONFIG).map(async (key) => {
        if (key === 'syncer') return;

        if (versions[key] !== localVersions[key]) {
            await db.deleteAllEntries(key);
            const dataFromDB = await getAllDocs(key);

            if (dataFromDB.length > 0) {
                await db.addEntries(key, dataFromDB);
            }
        }
        newLocalVersions[key] = versions[key];
    });

    await Promise.all(promises);

    setLocalVersions(newLocalVersions);
};


/**
 * Function to create local versions based on firebase versions.
 * @param {Object} firebaseVersions - Version information from Firebase.
 * @returns {Object} New local versions.
 */
export const createLocalVersions = (firebaseVersions) => {
    const newLocalVersions = { ...firebaseVersions };
    Object.keys(newLocalVersions).forEach(key => {
        newLocalVersions[key] = -1;
    });
    setLocalVersions(newLocalVersions);
    return newLocalVersions;
}

/**
 * Function to check IndexedDB status and update context.
 * @async
 * @param {Function} setSyncerVersions - State setter function.
 * @param {Function} setupBackendContext - Context setup function.
 */
export const checkIndexedDB = async (setSyncerVersions, setupBackendContext) => {
    try {
        const syncerData = await getSyncerVersion();

        // CREATING NEW SYNCER. ONLY ONCE PER DB INIT.
        // createSyncer(syncerData);
        setSyncerVersions(syncerData.version);

        let local = getLocalVersions();

        if (!local) {
            local = createLocalVersions(syncerData.version);
        }
        await checkVersions(syncerData.version, local);

        const indexedDBData = { ...(await db.getDB()), syncer: syncerData };

        setupBackendContext(indexedDBData);
    } catch (error) {
        console.error("Error in checkIndexedDB:", error);
    }
}