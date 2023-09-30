/**
 * The errorHandler function is a middleware that handles errors and sends a JSON response with the
 * error message and stack trace.
 * @param err - The `err` parameter is the error object that was thrown or passed to the `next`
 * function in the previous middleware or route handler.
 * @param req - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as the request headers, request method, request URL, request body,
 * etc.
 * @param res - The `res` parameter is the response object in Express.js. It represents the HTTP
 * response that will be sent back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when there is an error and you want to
 * pass the error to the next error-handling middleware function.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

module.exports = {
    errorHandler,
}
