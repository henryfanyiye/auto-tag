import {mysqlClient} from '../libs/mysqlClient.js';
import {redisClient} from '../libs/redisClient.js';
import {cache, getCache, setCache} from '../libs/cache.js';
import * as cacheKey from '../constant/cacheEnum.js';

/**
 * 查询规则
 * @param id
 * @returns {Promise<{}>}
 */
export const queryRule = (id) => {
    const key = cacheKey.taskRuleCacheKey(id);
    let cache = false;
    return getCache(key).then(res => {
        if (!res) {
            cache = true;
            const sql = '';
            return mysqlClient.query(sql);
        }
        return res;
    }).then(res => {
        if (!res & cache) setCache(key, res);
        return res;
    });
};

export const createRule = () => {

};

export const updateRule = () => {

};

export const deleteRule = () => {

};