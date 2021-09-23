import { getTimeStamp } from '../helpers/time-helper';
import util from 'util';

export default class Logger {
    /**
     * @param namespace who is calling this method
     * @param message message to console.info
     * @param object optional object to log
     */
    static info(namespace: string, message: string, object?: any) {
        if (object) {
            console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
        }
    }

    /**
     * @param namespace who is calling this method
     * @param message message to console.warn
     * @param object optional object to log
     */
    static warn(namespace: string, message: string, object?: any) {
        if (object) {
            console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
        } else {
            console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
        }
    }

    /**
     * @param namespace who is calling this method
     * @param message message to console.error
     * @param object optional object to log
     */
    static error(namespace: string, message: string, object?: any) {
        if (object) {
            console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
        } else {
            console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
        }
    }

    /**
     * @param namespace who is calling this method
     * @param message message to console.debug
     * @param object optional object to log
     */
    static debug(namespace: string, message: string, object?: any) {
        if (object) {
            console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
        } else {
            console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
        }
    }

    /**
     * @param namespace who is calling this method
     * @param message message to console.debug
     * @param object object whose nested objects will be logged too
     */
    static debugNestedObject<T>(namespace: string, message: string, object: T): void {
        console.debug(`[${getTimeStamp()}] [DEEPLOG] [${namespace}] ${message} ${util.inspect(object, { showHidden: false, depth: null })}`);
    }
}
