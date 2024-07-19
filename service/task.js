import {mysqlClient} from '../libs/mysqlClient.js';
import * as cacheKey from '../constant/cacheEnum.js';
import {getCache, setCache} from '../libs/cache.js';

/**
 * 查询任务
 * @param filter
 * @returns {Promise<[QueryResult, FieldPacket[]]>}
 */
export const queryTask = (filter) => {
    let sql = 'SELECT id, name, start_time as startTime, end_time as endTime, status FROM demo.Tasks WHERE id_delete=0 ';
    for (let i in filter) {
        sql += `AND ${i}="${filter[i]}" `;
    }
    return mysqlClient.query(sql);
};

/**
 * 新建任务
 * @param name
 * @param start_time
 * @param end_time
 * @returns {Promise<[QueryResult, FieldPacket[]]>}
 */
export const createTask = ({name, start_time, end_time}) => {
    const sql = 'INSERT INTO demo.Tasks (name, start_time, end_time, status, is_delete) VALUES(?, ?, ?, 0, 0);';
    return mysqlClient.query(sql, [name, start_time, end_time]);
};

/**
 * 更新任务
 * @param data
 * @returns {Promise<[QueryResult, FieldPacket[]]>}
 */
export const updateTask = (data) => {
    let sql = 'UPDATE demo.Tasks SET ';
    for (let i in data) {
        if (i != 'id') {
            sql += `${i}="${data[i]}" `;
        }
    }
    sql += 'WHERE id=?;';
    return mysqlClient.query(sql);
};

/**
 * 删除任务
 * @param id
 * @returns {Promise<[QueryResult, FieldPacket[]]>}
 */
export const deleteTask = (id) => {
    const sql = 'UPDATE demo.Tasks SET isDelete=1 WHERE id=?;';
    return mysqlClient.query(sql, [id]);
};