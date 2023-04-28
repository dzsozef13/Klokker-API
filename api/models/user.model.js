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
            require: true, 
            trim: true,
            min: 8, 
            max: 255 
        },

        role: { type: String, require: true },

        organization: { type: String, require: true },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            require: true,
        }
    }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", userSchema);