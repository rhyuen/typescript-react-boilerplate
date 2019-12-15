import redis from 'redis';
import getEnv from "./getEnv"
import logger from "./logger"
import { promisify } from "util";


//TODO: NO24-19 KILL REDIS CONNECTION redis.quit() when done with operation.
const client = redis.createClient({
    port: parseInt(getEnv("ts_redis_port")),
    host: getEnv("ts_redis_host"),
    password: getEnv("ts_redis_password")
});

export async function set(key: string, value: string) {
    try {
        const promise_set = promisify(client.set).bind(client);
        return promise_set(key, value);
    } catch (e) {
        logger.error(`[REDIS_SET]: Error with redis set promise: ${e}`);
    }
}

export async function setex(key: string, duration: number, value: string) {
    try {
        const promise_setex = promisify(client.setex).bind(client);
        return promise_setex(key, duration, value)
    } catch (e) {
        logger.error(`[REDIS_SETEX]: Error with redis SETEX promise: ${e}`);
    }
}

export async function get(key: string) {
    try {
        const promise_get = promisify(client.get).bind(client);
        return promise_get(key);
    } catch (e) {
        logger.error(`[REDIS_GET]: error with redis get promise: ${e}`);
    }
}