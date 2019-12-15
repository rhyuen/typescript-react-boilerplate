import * as Sentry from "@sentry/node";


export async function startSentry() {
    try {
        const { sentrydsn } = process.env;
        Sentry.init({ dsn: sentrydsn });
        return;
    } catch (e) {
        console.error(`[SENTRY ERROR]: ${e}`);
        return;
    }
}
