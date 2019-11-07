import redis from 'redis';
import getEnv from "./getEnv"
import { promisify } from "util";

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
        console.log(`error with redis set promise: ${e}`);
    }
}

export async function setex(key: string, duration: number, value: string) {
    try {
        const promise_setex = promisify(client.setex).bind(client);
        return promise_setex(key, duration, value)
    } catch (e) {
        console.log(`error with redis SETEX promise: ${e}`);
    }
}

export async function get(key: string) {
    try {
        const promise_get = promisify(client.get).bind(client);
        return promise_get(key);
    } catch (e) {
        console.log(`error with redis get promise: ${e}`);
    }
}