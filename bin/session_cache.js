const { createClient } = require("redis");
const { promisifyAll } = require('bluebird');
const redisClient = createClient(process.env.REDIS_CACHE_URL);

promisifyAll(redisClient);

module.exports = {
    get: async key => {
        return JSON.parse(await redisClient.getAsync(key));
    },
    set: async (key, value) => {
        const exp = parseInt(process.env.SESSION_EXP);
        await redisClient.setAsync(key, JSON.stringify(value));
        if (exp > 0) redisClient.expire(key, exp);
    },
    del: async(key) => {
        await redisClient.del(key);
    }
}