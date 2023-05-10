const bcrypt = require('bcrypt');

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
async function hash(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

module.exports = hash;