// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var postSchema = new mongoose.Schema({
	id: Number,
	author: String,
	text: String,
	date: Date,
	img: String,
	comments: [{
		commentId: String,
		author: String,
		body: String,
		date: Date,
		text: String
	}]
})

var profileSchema = new mongoose.Schema({
	username: String,
	status: Number,
	following: [ String ],
	email: String,
	zipcode: String,
	picture: String
})

var userSchema = new mongoose.Schema({
	username: String,
	salt: String,
	hash: String
})

//var User = module.exports = mongoose.model('users', userSchema)

// module.exports.getUser = function(args, limit) {
// 	User.find(args).limit(limit)
// }

exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Post = mongoose.model('articles', postSchema)


//following
//articles
//profile
//authentication