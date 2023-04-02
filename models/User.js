const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
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
		validate: (email) => validator.isEmail(email),
	},
	password: {
		type: String,
		required: true,
		validate: (password) => validator.isStrongPassword(password),
	},
},{timestamps: true});

UserSchema.pre('save', function(next) {
	this.email = this.email.toLowerCase();
	next();
});

UserSchema.pre('save', function(next) {
	this.firstName = this.firstName.toUpperCase();
	next();
});

UserSchema.pre('save', function(next) {
	this.lastName = this.lastName.toUpperCase();
	next();
});

UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

module.exports = mongoose.model('User', UserSchema);
