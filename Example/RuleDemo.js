import {Rule} from '../ruleEngine/rule.js';
import {RuleEngine} from '../ruleEngine/ruleEngine.js';

const condition = 'context.age >= 0 && context.age < 20';

const r = new Rule(
    (context) => eval(condition),
    (context) => true
);

const ruleEngine = new RuleEngine(r);

console.log(ruleEngine.run({age: 21}));