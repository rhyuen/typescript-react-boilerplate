

export default function getEnv(key: string): string {

    const envVar: string = process.env[key] !== undefined ?
        process.env[key]! :
        "empty string";

    if (envVar === undefined) {
        console.error(`One of your Environment Variables is empty: '${key}'`);
    }
    return envVar;
}

