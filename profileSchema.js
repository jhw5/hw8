/**
 * Created by Jeffrey on 11/23/2016.
 */
var mongoose = require('mongoose');


var profileSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ String ],
    email: String,
    zipcode: String,
    picture: String
})



// exports.Profile = mongoose.model('profile', profileSchema)


var prof = module.exports = mongoose.model("profile", profileSchema)
module.exports.getHeadlines = function(item, limit) {
    prof.find(item).limit(limit)
}
