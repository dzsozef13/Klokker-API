/**
 * Organization Schema
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let organizationSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        owner: { type: String, require: true },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        users: [{ type: String }],
        userIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    }
);

module.exports = mongoose.model("Organization", organizationSchema);