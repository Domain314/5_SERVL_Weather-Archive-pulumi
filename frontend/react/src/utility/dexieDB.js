// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import Dexie from "dexie";

import { SYNCER_CONFIG } from "../configs/syncer";

const stores = {};
Object.keys(SYNCER_CONFIG).map((key) => {
    if (key === 'syncer') return;

    const entry = SYNCER_CONFIG[key];

    const inputNames = entry.inputs.map(i => i.name).join(',');
    stores[key] = `id,${inputNames}`
});

/**
 * The SyncerDB class extends the Dexie class to manage sync data.
 */
class SyncerDB extends Dexie {
    /**
     * Initialize the database with the given version and stores.
     */
    constructor() {
        super(SYNCER_CONFIG.syncer.dbName);
        this.version(SYNCER_CONFIG.syncer.dbVersion).stores(stores);
    }

    /**
     * Delete an entire list with the given syncerListId.
     * 
     * @param {string} syncerListId - The ID of the list to delete.
     * @returns {Promise} - A promise resolving when the delete operation is completed.
     */
    async deleteList(syncerListId) {
        if (typeof syncerListId !== 'string') {
            throw new TypeError('syncerListId must be a string');
        }

        try {
            await this.transaction('rw', this[syncerListId], async () => {
                await this[syncerListId].where('id').equals(syncerListId).delete();
            });
        } catch (error) {
            console.error('Could not delete list:', error);
        }
    }
}

/**
 * Initialize a new SyncerDB instance.
 */
export const db = new SyncerDB();

/**
 * Reset the database by clearing all tables.
 *
 * @returns {Promise} - A promise resolving when the reset operation is completed.
 */
export async function resetDatabase() {
    try {
        await db.transaction('rw', ...Object.keys(SYNCER_CONFIG), async () => {
            const clearPromises = Object.keys(SYNCER_CONFIG).map(tableName => db[tableName].clear());
            await Promise.all(clearPromises);
        });
    } catch (error) {
        console.error('Could not reset database:', error);
    }
}

