// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var postsSchema = new mongoose.Schema({
	id: Number,
	author: String,
	body: String,
	date: Date,
	img: String,
	comments: [{
		commentId: Number,
		author: String,
		body: String,
		date: Date
	}]
})

var profileSchema = new mongoose.Schema({
	username: String,
	status: String,
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
exports.Posts = mongoose.model('articles', postsSchema)


//following
//articles
//profile
//authentication