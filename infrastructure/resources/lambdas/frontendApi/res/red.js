const redis = require('redis');
const { promisify } = require('util');

const redisConfig = {
    userName: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    redisEndpoint: process.env.REDIS_ENDPOINT,
    redisPort: 19730
}

async function checkRedis() {

    const redisClient = redis.createClient({
        url: `redis://${redisConfig.userName}:${redisConfig.password}@${redisConfig.redisEndpoint}:${redisConfig.redisPort}`,
        legacyMode: true
    });

    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const getAsync = promisify(redisClient.get).bind(redisClient);

    // Try to fetch from Redis first
    try {
        const cachedCities = await getAsync('cities');
        if (cachedCities) {
            return JSON.parse(cachedCities);
        }
    } catch (error) {
        console.error('Redis error:', error);
    }

    return [];
}

async function cacheToRedis(cities) {
    const setAsync = promisify(redisClient.set).bind(redisClient);

    try {
        // Save to Redis cache
        await setAsync('cities', JSON.stringify(cities), 'EX', 3600); // Expires in 1 hour

        return cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    } finally {
        await redisClient.quit();
    }
}



module.exports = {
    checkRedis,
    cacheToRedis
}

