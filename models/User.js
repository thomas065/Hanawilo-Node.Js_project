const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxLength: [15, 'Username cannot be longer than 15 characters.'],
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: email => validator.isEmail(email),
        },
        password: {
            type: String,
            required: true,
            validate: password => validator.isStrongPassword(password),
        },
        admin: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        }
    },
    { timestamps: true }
);

UserSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});

UserSchema.pre('save', function (next) {
    this.firstName = this.firstName.toUpperCase();
    next();
});

UserSchema.pre('save', function (next) {
    this.lastName = this.lastName.toUpperCase();
    next();
});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.pre('save', async function (next) {
    // if the password is not modified, then the user is hitting the log in endpoint
    if (!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 3600000 // 1 hour in milliseconds = 3600000

    return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
