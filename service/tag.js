import {mysqlClient} from '../libs/mysqlClient.js'

/**
 * 新建标签
 * @param name
 * @param bitPosition
 */
export const createTag = async (name, bitPosition) => {
    const sql = 'INSERT INTO Tags (name, bit_position) VALUES (?, ?)'
    return await mysqlClient.query(sql, [name, bitPosition])
}

/**
 * 删除标签
 * @param id
 */
export const deleteTag = async (id) => {
    const sql = 'DELETE FROM Tags WHERE id = ?;'
    return await mysqlClient.query(sql, [id])
}