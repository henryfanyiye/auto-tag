export class Rule {
    constructor(condition, action) {
        this.condition = condition;
        this.action = action;
    }

    apply(fact) {
        if (this.condition(fact)) {
            return this.action();
        }
    }
}