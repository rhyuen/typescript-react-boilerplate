import getEnv from './getEnv'
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
require('winston-papertrail').Papertrail;


const winstonPapertrail = new transports.Papertrail({
    host: getEnv("ts_papertrail_host"),
    port: getEnv("ts_papertrail_port")
});

const myFormat = printf(({ level, message, label, timestamp }: any) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: `[${getEnv("NODE_ENV")}] - LACIOS` }),
        timestamp(),
        myFormat
    ),
    transports: [winstonPapertrail]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

export default logger;