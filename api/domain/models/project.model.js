const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        team: { type: String, require: true},
        _teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            require: true,
        }
    }
);

module.exports = mongoose.model("Project", projectSchema);