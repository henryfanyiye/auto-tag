import {LRUCache} from 'lru-cache'
import {redisClient, redis_set} from "./redisClient.js";


export const cache = new LRUCache({
    ttl: process.env.CACHE_TTL,
})

/**
 * 获取缓存
 * @param key
 * @returns {Promise<{}>}
 */
export const getCache = (key) => {
    let cacheFlag = false;
    return new Promise().then(() => {
        return cache.get(key)
    }).then(res => {
        if (!res) {
            cacheFlag = true
            return redisClient.get(cache)
        }
        return res
    }).then(res => {
        if (!res & cacheFlag) {
            cache.set(key, res)
        }
        return res
    })
}

/**
 * 设置缓存
 * @param key
 * @param value
 */
export const setCache = (key, value) => {
    if (typeof value != 'string') {
        value = JSON.stringify(value)
    }
    redis_set(key, value).then(() => {
        cache.set(key, value)
    })
}