const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let teamSchema = new Schema(
    {
        name: { type: String, require: true, max: 255 },
        description: { type: String },

        owner: { type: String, require: true },
        _ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
    }
);

teamSchema.statics.isNameTaken = async function (name, excludeTeamId) {
    const team = await this.findOne({ name, _id: { $ne: excludeTeamId } });
    return !!team;
};

module.exports = mongoose.model("Team", teamSchema);