import {Rule} from '../ruleEngine/rule.js';
import {RuleEngine} from '../ruleEngine/ruleEngine.js';
import {mysqlClient} from '../libs/mysqlClient.js';
import {postClient} from '../libs/request.js';

export const attributesVerify = (rule, data) => {
    return new Promise((resolve) => {
        const r = new Rule(
            (rule) => eval(rule.condition),
            (rule) => rule.action
        );

        const ruleEngine = new RuleEngine(r);

        if (ruleEngine.run(data)) {
            return resolve(true);
        } else {
            return resolve(false);
        }
    });
};

export const sqlVerify = (rule, data) => {
    return mysqlClient.query(rule.condition, []).then(res => {
        if (res[0].length > 0) {
            return true;
        } else {
            return false;
        }
    });
};

export const functionVerify = (rule, data) => {
    return postClient(rule.condition, data).then(res => {
        if (res) {
            return true;
        } else {
            return false;
        }
    });
};