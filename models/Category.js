const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	categoryName: {
		type: String,
		required: true,
		unique: true,
		maxLength: [25, 'Category name cannot be longer than 25 characters.'] // This is a custom error message
	},
	gender: {
		type: String,
		required: true,
		enum: [
			'Male',
			'Female',
			'male',
			'female'
		]
	}
}, { timestamps: true });

CategorySchema.pre('save', function(next) {
	this.gender = this.gender.toUpperCase();
	next();
});

CategorySchema.post('save', function(next) {
	this.gender = this.gender.toLowerCase();
});

module.exports = mongoose.model('Category', CategorySchema);
