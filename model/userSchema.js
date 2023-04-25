/**
 * User Schema
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: { type: String, require: true, min: 6, max: 255 },
        email: { type: String, require: true, min: 6, max: 255 },
        password: { type: String, require: true, min: 6, max: 255 },

        role: { type: String, require: true },

        organization: { type: String, require: true },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            require: true,
        }
    }
);

module.exports = mongoose.model("User", userSchema);