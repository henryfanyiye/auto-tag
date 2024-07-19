export class RuleEngine {
    constructor(rule) {
        this.rule = rule;
    }

    run(context) {
        return this.rule.apply(context);
    }
}