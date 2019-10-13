

export default function getEnv(key: string): string {
    if (process.env[key] === undefined) {
        console.error(`One of your Environment Variables is empty: '${key}'`);
        throw new Error(`Your env var is empty for ${key}`);
    }

    const envVar: string = process.env[key] !== undefined ?
        process.env[key]! :
        "empty string";


    return envVar;
}

