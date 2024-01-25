export const SYNCER_CONFIG = {
    syncer: {
        dbName: "weather-archive-db",
        collection: "syncer",
        id: "syncer",
        version: {
            photos: 0
        },
        nextBackup: 0,
        dbVersion: 5
    },
    dataImages: {
        collection: "dataImages",
        version: 0,
        solo: false,
        inputs: [
            { name: "id" },
            { name: "photoname" },
            { name: "photoUrl" },
            { name: "city" },
            { name: "humidity" },
            { name: "temperature" },
            { name: "airPressure" },
            { name: "datetime" }
        ]
    },
    cities: {
        collection: "cities",
        version: 0,
        solo: false,
        inputs: [
            { name: "cities" }
        ]
    },
}