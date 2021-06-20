const winston = require('winston');

const logger = winston.createLogger({
    levels: {
        'trace': 0,
        'debug': 1,
        'info': 2,
        'warn': 3,
        'error': 4,
        'critical': 5,
        'none': 6
    },
    format: winston.format.json(),
    defaultMeta: { service: 'react-app' },
    transports: [
        // no directory structure in a browser, file transport won't work here
        // send all ui logs to an api endpoint if you need them logged to file system

        // windows update KB5003637 causes issues with SSL in chunked files as of early June 2021
        // if you're getting a net:ERR message, disable SSL in the project and here or uninstall the dodgy update pack
        // see https://docs.microsoft.com/en-us/answers/questions/440339/kb5003637-and-the-new-kb5004476-gives-error-34fail.html

        //new winston.transports.Http({
        //    level: 'critical',
        //    ssl: false,
        //    host: 'localhost',
        //    port: 62225,
        //    path: 'api/logging/log-to-file-system'
        //}),

        new winston.transports.Http({
            level: 'critical',
            ssl: true,
            host: process.env.PUBLIC_URL ,
            port: 44330,
            path: 'api/logging/log-to-file-system'
        })
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger