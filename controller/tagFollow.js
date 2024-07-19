import {queryRule} from '../service/rule.js';
import {postClient} from '../libs/request.js';
import {getCache} from '../libs/cache.js';
import {taskCacheKey} from '../constant/cacheEnum.js';
import {mysqlClient} from '../libs/mysqlClient.js';
import {Rule} from '../ruleEngine/rule.js';
import {RuleEngine} from '../ruleEngine/ruleEngine.js';

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
    queryRule(taskId).then(rule => {
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

const attributesVerify = (rule, data) => {
    const r = new Rule(
        (rule) => rule.content,
        (rule) => rule.action
    );

    const ruleEngine = new RuleEngine(r);

    return ruleEngine.run(data);
};

const sqlVerify = (rule, data) => {
    return mysqlClient.query(rule.content, []).then(res => {
        if (res.length > 0) {
            return true;
        }
        return false;
    });
};

const functionVerify = (rule, data) => {
    return postClient(rule.action, data).then(res => {
        if (res) {
            return rule.action;
        }
        return false;
    });
};