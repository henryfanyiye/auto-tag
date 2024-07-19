/**
 * 任务规则Redis缓存key
 */
export const taskCacheKey = 'TASK_LIST'

/**
 * 任务规则Redis缓存key
 * @param taskId
 * @returns {`TASK_RULE_${string}`}
 */
export const taskRuleCacheKey = (taskId) => {
    return `TASK_RULE_${taskId}`
}