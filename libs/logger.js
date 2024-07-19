export class Logger {
    static logFormat(msg) {
        const log = {
            time: new Date()
        }
        if (typeof msg == 'object') {
            Object.assign(log, msg)
        } else {
            Object.assign(log, {msg})
        }
        return JSON.stringify(log)
    }

    static debug(msg) {
        console.debug(this.logFormat(msg))
    }

    static info(msg) {
        console.info(this.logFormat(msg))
    }

    static warn(msg) {
        console.warn(this.logFormat(msg))
    }

    static error(msg) {
        console.error(this.logFormat(msg))
    }
}