/**
 * Wraps an asynchronous route handler function with error handling middleware.
 * @param {Function} fn - An asynchronous route handler function.
 * @returns {Function} A new route handler function with error handling middleware.
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;