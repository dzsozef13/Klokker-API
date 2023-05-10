/**
 * Returns a new object with the specified fields removed from the original object.
 * @param {Object} obj - The original object.
 * @param {Array} fields - An array of strings specifying the field names to remove from the object.
 * @returns {Object} A new object with the specified fields removed.
 */
function chop(obj, fields) {
    var newObject = obj.toJSON({ 
        transform: (doc, ret) => {
            for (const field of fields) {
                delete ret[field];
            }
            return ret;
        }
    });
    return newObject;
}

module.exports = chop;