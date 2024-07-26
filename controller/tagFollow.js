import {queryRule} from '../service/rule.js';
import {getCache} from '../libs/cache.js';
import {taskCacheKey} from '../constant/cacheEnum.js';
import {attributesVerify, sqlVerify, functionVerify} from '../utils/condition.js';

export const tagFollow = (data) => {
    /**
     * 1. 查询是否有进行中的任务
     * 2. 查询任务规则
     * 3. 根据规则类型执行判断
     *    3.1 属性判断
     *    3.2 SQL判断
     *    3.3 Function判断
     * 4. 根据判断结果执行动作
     */
    getCache(taskCacheKey).then(list => {
        list.forEach(id => {
            return ruleVerify(id, data);
        });
    });
};

const ruleVerify = async (taskId, data) => {
    let _rule;
    queryRule(taskId).then(rule => {
        _rule = rule;
        switch (rule.type){
            case 'attributes':
                return attributesVerify(rule, data);
            case 'sql':
                return sqlVerify(rule, data);
            case 'function':
                return functionVerify(rule, data);
        }
    }).then(res => {
    });
};