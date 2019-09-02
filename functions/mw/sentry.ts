import * as Sentry from "@sentry/node";

export async function logger() {
    try {
        console.log("sentry");
        const { sentrydsn } = process.env;
        console.log(`LOADING SENTRY: ${sentrydsn}`);
        Sentry.init({ dsn: sentrydsn });
        return;
    } catch (e) {
        console.log(e);
        return;
    }
}
