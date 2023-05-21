const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        _teamId: {
            type: String,
        }
    }
);

projectSchema.statics.doesBelong = async function (projectId, teamId) {
    const project = await this.findOne({ _id: projectId, _teamId: teamId });
    return !!project;
}

module.exports = mongoose.model("Project", projectSchema);