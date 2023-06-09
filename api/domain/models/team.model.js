const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let teamSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        _ownerId: {
            type: String,
        }
    }
);

teamSchema.statics.isNameTaken = async function (name, excludeTeamId) {
    const team = await this.findOne({ name, _id: { $ne: excludeTeamId } });
    return !!team;
};

module.exports = mongoose.model("Team", teamSchema);