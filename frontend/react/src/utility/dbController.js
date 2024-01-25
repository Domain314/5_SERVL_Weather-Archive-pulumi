// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

// import { useLiveQuery } from 'dexie-react-hooks';
import { db } from "./dexieDB";

/**
 * Gets the entire database as an object where each key is a table name.
 * @async
 * @returns {Promise<Object>} The database as an object.
 */
export const getDB = async () => {
    const dbAsObject = await db.tables.reduce(async (accPromise, table) => {
        const acc = await accPromise;
        acc[table.name] = await getAllEntriesAsObject(table.name);
        return acc;
    }, Promise.resolve({}));

    return dbAsObject;
}

/**
 * Fetches a single entry from a table by its ID.
 * @async
 * @param {string} tableName The name of the table.
 * @param {number|string} id The ID of the entry.
 * @returns {Promise<Object>} The entry.
 */
export const getEntry = async (tableName, id) => {
    return await db[tableName].get(id);
};

/**
 * Gets all entries in a table and formats them as an object.
 * @async
 * @param {string} tableName The name of the table.
 * @returns {Promise<Object>} All entries as an object.
 */
export const getAllEntriesAsObject = async (tableName) => {
    const arr = await db[tableName].toArray();
    const obj = {};

    arr.forEach((entry) => {
        obj[entry.id] = entry;
    });

    return obj;
};

/**
 * Fetches all entries from a table.
 * @async
 * @param {string} tableName The name of the table.
 * @returns {Promise<Array>} All entries as an array.
 */
export const getAllEntries = async (tableName) => {
    return await db[tableName].toArray();
};

/**
 * Adds a new entry to a table.
 * @async
 * @param {string} tableName The name of the table.
 * @param {Object} data The data for the new entry.
 * @returns {Promise<number|string>} The ID of the new entry.
 */
export const addEntry = async (tableName, data) => {
    return await db[tableName].add(data);
};

/**
 * Adds multiple new entries to a table.
 * @async
 * @param {string} tableName The name of the table.
 * @param {Array} data The data for the new entries.
 * @returns {Promise<void>}
 */
export const addEntries = async (tableName, data) => {
    return await db[tableName].bulkAdd(data);
}

/**
 * Updates an existing entry in a table.
 * @async
 * @param {string} tableName The name of the table.
 * @param {number|string} id The ID of the entry.
 * @param {Object} data The new data for the entry.
 * @returns {Promise<number>} The number of updated records.
 */
export const updateEntry = async (tableName, id, data) => {
    return await db[tableName].update(id, data);
};

/**
 * Deletes an entry from a table.
 * @async
 * @param {string} tableName The name of the table.
 * @param {number|string} id The ID of the entry.
 * @returns {Promise<void>}
 */
export const deleteEntry = async (tableName, id) => {
    return await db[tableName].delete(id);
};

/**
 * Deletes all entries from a table.
 * @async
 * @param {string} tableName The name of the table.
 * @returns {Promise<void>}
 */
export const deleteAllEntries = async (tableName) => {
    return await db[tableName].clear();
};
