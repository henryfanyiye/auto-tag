import {mysqlClient} from '../libs/mysqlClient.js'

/**
 * 设置用户标签
 * @param userId
 * @param tagId
 */
export const addUserTag = async (userId, tagId) => {
    const sql = 'UPDATE Users SET tag_bitmap = tag_bitmap | (1 << (SELECT bit_position FROM Tags WHERE id =?)) WHERE id = ?;'
    return await mysqlClient.query(sql, [tagId, userId])
}

/**
 * 清除用户标签
 * @param userId
 * @param tagId
 */
export const removeUserTag = async (userId, tagId) => {
    const sql = 'UPDATE Users SET tag_bitmap = tag_bitmap & ~(1 << (SELECT bit_position FROM Tags WHERE id = ?)) WHERE id =?;'
    return await mysqlClient.query(sql, [tagId, userId])
}

/**
 * 查询指定标签用户
 * @param tagId
 */
export const queryUserByTag = async (tagId) => {
    const sql = 'SELECT id, name, email FROM Users WHERE (tag_bitmap & (1 << (SELECT bit_position FROM Tags WHERE id =?))) != 0;'
    return await mysqlClient.query(sql, [tagId])
}

/**
 * 查询用户所有标签
 * @param userId
 */
export const queryUserTag = async (userId) => {
    const sql = 'SELECT t.name FROM Tags t JOIN Users u ON (u.tag_bitmap & (1 << t.bit_position)) != 0 WHERE u.id = ？;'
    return await mysqlClient.query(sql, [userId])
}