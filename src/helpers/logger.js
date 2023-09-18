import winston from 'winston';
let logger = null;
class Logger {

    initiateLogger() {

        if (!logger) {

            // Create a logger instance with desired transports (e.g., console, file, or cloud-based services).
            logger = winston.createLogger({
                level: 'info', // Set the log level (info, warn, error, etc.).
                format: winston.format.json(), // Use JSON format for logs.
                transports: [
                    new winston.transports.Console(), // Log to the console.
                    // Add other transports as needed, e.g., for cloud-based services.
                ],
            });
        }
        return logger
    }
    logRequest(name, event) {

        logger.info(`${name} Execution started`,
            {
                requestId: event.requestContext.requestId, requestTime: event.requestContext.requestTime, body: event.body ? JSON.parse(event.body) : {}, QueryString: event.queryStringParameters, requestParams: event.pathParameters,
                ip: event.requestContext.identity.sourceIp, host: event.headers.Host,

            });
    }
    logResponse(name, event) {
        logger.info(`${name} Execution Finished`, {
            status: 200, data: 'success', QueryString: event.queryStringParameters,
            ip: event.requestContext.identity.sourceIp, host: event.headers.Host
        });
    }
    logFailure(name, event, error) {
        logger.info(`${name} Execution Failed`, {
            status: 500, message: error.message, QueryString: event.queryStringParameters,
            ip: event.requestContext.identity.sourceIp, host: event.headers.Host
        });
    }
    logNotFound(name, event) {
        logger.info(`${name} Execution Failed`, {
            status: 404, data: null, QueryString: event.queryStringParameters,
            ip: event.requestContext.identity.sourceIp, host: event.headers.Host
        });
    }

}


export default Logger;
