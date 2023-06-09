const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: { type: String, 
            require: true, 
            trim: true,
            max: 255 },
        email: { 
            type: String, 
            require: true, 
            unique: true,
            trim: true,
            lowercase: true,
            max: 255 },
        password: { 
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            }
        },

        role: { type: String, require: true },

        _teamId: {
            type: String,
        },

        invite: { type: String }
    }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.statics.isMember = async function (userId, teamId) {
    const user = await this.findOne({ _id: userId, _teamId: teamId });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", userSchema);