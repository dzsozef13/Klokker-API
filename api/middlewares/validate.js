const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('./pick');
const ApiError = require('../domain/errors/ApiError');

/**
 * Validates the request parameters, query, and body against a given Joi schema.
 *
 * @param {Object} schema - The Joi schema object defining the validation rules.
 * @returns {function} A middleware function that validates the request.
 */
const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;