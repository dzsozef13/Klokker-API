/**
 * Creates a new object composed of the specified keys from an existing object.
 * @param {Object} object - The source object.
 * @param {Array} keys - An array of strings specifying the keys to pick from the object.
 * @returns {Object} A new object with the specified keys.
 */
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = pick;