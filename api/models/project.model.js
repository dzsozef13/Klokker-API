const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        organization: { type: String, require: true},
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            require: true,
        }
    }
);

module.exports = mongoose.model("Project", projectSchema);