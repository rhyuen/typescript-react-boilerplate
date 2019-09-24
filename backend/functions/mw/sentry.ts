import * as Sentry from "@sentry/node";

export async function logger() {
    try {
        const { sentrydsn } = process.env;
        console.log(`LOADING SENTRY: ${sentrydsn}`);
        Sentry.init({ dsn: sentrydsn });
        return;
    } catch (e) {
        console.log(`ISSUE WITH LOADING SENTRY DETAILS: ${e}`)
        return;
    }
}
