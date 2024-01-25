// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

/**
 * Retrieves the versions stored in local storage.
 * @returns {object|null} - An object containing the versions or null if not found.
 */
export const getLocalVersions = () => {
    return JSON.parse(localStorage.getItem('weatherarchivedb-syncer'));
}

/**
 * Sets the versions in local storage.
 * @param {object} versions - An object containing versions to be stored.
 */
export const setLocalVersions = (versions) => {
    localStorage.setItem('weatherarchivedb-syncer', JSON.stringify(versions));
}

/**
 * Updates a single version field in local storage.
 * @param {string} field - The name of the version field to be updated.
 * @param {any} version - The new version value to set.
 */
export const setLocalVersion = (field, version) => {
    const localData = JSON.parse(localStorage.getItem('weatherarchivedb-syncer'));
    localData[field] = version;
    localStorage.setItem('weatherarchivedb-syncer', JSON.stringify(localData));
}

/**
 * Retrieves the version of the syncer document.
 * @return {Object} syncer.data() - Data contained in the syncer document.
 */
export async function getSyncerVersion(db, key) {
    const syncer = db ? await db.createEntries(key) : null;
    const data = syncer ? syncer.data?.rows : 5;
    localStorage.setItem('weatherarchivedb-syncer', JSON.stringify(syncer));
    return { version: { photoImages: data, cities: data } };
}