/**
 * Created by Jeffrey on 11/17/2016.
 */

const express = require('express');
const app = express();
const Profile = require('./model.js').Profile;


const getZip = (req, res) => {
    Posts.find({username: req.params.user}, function(err, items) {
        res.send(items)
    })
}
const getHeadlines = (req, res) => {
    if (!req.users) req.users = 'jhw5test'

    const users = req.params.users ? req.params.users.split(',') : [req.users]

    getHeadlinesByUser(users, function(items) {
        res.send({items})
    })
}

function getHeadlinesByUser(user, callback) {
    Profile.find({username : user}.exec(function(err, items) {
        callback(items)
    }))
}

//addheadlines
const putHeadline = (req, res) => {
    if (!req.users) req.users = 'Scott'
    console.log('Payload received', req.body)
    new Profile({status: req.body.status})
    res.send("change headline successful")
}
//getavatar
// const getAvatar
//addavatar
//getDOB


module.exports = app => {
    app.put('/headlines/:users*?', putHeadline)
    app.get('/headlines/:users*?', getHeadlines)
    app.get('/zipcode/:user', getZip)

}

new Profile({ username: 'jhw5test', status: 'headline', following: null, email: "jhw5@rice.edu", zipcode: 77005}).save()
