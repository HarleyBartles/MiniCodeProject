const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'react-app' },
    transports: [
        // windows update KB5003637 causes issues with SSL in chunked files
        // if you're getting a net:ERR message, disable SSL in the project (and here) or uninstall the dodgy update pack
        // see https://stackoverflow.com/questions/67747270/reactjs-neterr-http2-protocol-error-200-with-netcore-in-https/67767129#67767129

        // send all ui logs to the server to log to file system
        new winston.transports.Http({
            ssl: true,
            host: 'localhost',
            port: 44335,
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