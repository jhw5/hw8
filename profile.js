/**
 * Created by Jeffrey on 11/17/2016.
 */

const express = require('express');
// const app = express();
const Profile = require('./model.js').Profile;

const getDOB = (req, res) => {
    Profile.find({username: req.username}).exec(function(err, items) {
        res.send({"username": items[0].useranem, "dob": items[0].dob})
    })
}

const getAvatar = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]

    Profile.find({username : {$in:users}}).exec( function(err, items) {
        res.send({"avatars": items.map(x => ({"username": x.username, "avatar": x.picture}))})
    })
}

const putAvatar = (req, res) => {
    const users = req.username
    Profile.update({username:users}, {$set: {picture: req.body.avatar}}).exec(function(err, items) {
        Profile.find({username: users}).exec( function(err, items) {
            res.send({"username": items[0].username, "avatar": items[0].picture})
        })
    })
}


const getEmail = (req, res) => {
    const users = req.params.user ? req.params.user : req.username
    Profile.find({username: users}).exec( function(err, items) {
        res.send({"username": req.username, "email": items[0].email})
    })
}

const putEmail = (req, res) => {
    const users = req.username
    Profile.update({username:users}, {$set: {email: req.body.email}}).exec(function(err, items) {
        Profile.find({username: users}).exec( function(err, items) {
            res.send({"username": items[0].username, "email": items[0].email})
        })
    })
}

const getZip = (req, res) => {
    const users = req.params.user ? req.params.user : req.username

    Profile.find({username: users}).exec( function(err, items) {
        res.send({"username": req.username, "zipcode": items[0].zipcode})
    })
}

const putZip = (req, res) => {
    const users = req.username
    Profile.update({username:users}, {$set: {zipcode: req.body.zipcode}}).exec(function(err, items) {
        Profile.find({username: users}).exec( function(err, items) {
            res.send({"username": items[0].username, "zipcode": items[0].zipcode})
        })
    })
}

const getHeadlines = (req, res) => {

    const users = req.params.users ? req.params.users.split(',') : [req.username]
    // console.log("INPUT URL: "+ req.params.users)

    // res.send({"headlines": users.map(x => {
    //     Profile.find({username : x}).exec(function(err, items) {
    //         console.log("Current user: " + x)
    //         console.log("User status: " + items)
    //         console.log(items)
    //         res.send({"username": items[0].username, "headline": items[0].status})
    //     })
    // })
    // })


    // users.map(x => {
    //     Profile.find({username : x}).exec(function(err, items) {
    //         console.log("Current user: " + x)
    //         console.log("User status: " + items)
    //         console.log(items)
    //         res.send({"username": y.username, "headline": y.status})
    //     })
    // })


    Profile.find({username : {$in:users}}).exec(function(err, items) {
        // console.log("INPUT URL: "+ req.params.users)
        // console.log("length of items: "+ items.length)
        // console.log(items)
        res.send({"headlines": items.map(x => ({"username": x.username, "headline": x.status}))})
    })
    console.log("finished")
}

const putHeadline = (req, res) => {

    Profile.update({username:req.username}, {$set: {status: req.body.headline}}).exec(function(err, items) {
        Profile.find({username: req.username}).exec(function(err, item) {
            res.send({"username": item[0].username, "headline": item[0].status})
        })
    })
}

const putFollowing = (req, res) => {
    
    Profile.find({username: req.username}).exec(function(err, items) {
        const followerList = items[0].following
        followerList.push(req.params.user)
        Profile.update({username:req.username}, {$set: {following: followerList}}).exec(function(err, item) {
            res.send({"username": req.username, "following": items[0].following})
        })
    })

}

const getFollowing = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]
    // const users = req.params.user
    Profile.find({username : {$in:users}}).exec(function(err, items) {
        console.log(items[0].following)
        res.send({"username": users[0], "following": items[0].following})
        // res.send({"following": items.map(x => ({"username":users, "following": items[0].following}))})
    })

}

const deleteFollowing = (req, res) => {
    const user = req.params.user

    Profile.find({username: req.username}).exec(function(err, items) {
        const followerList = items[0].following
        const newList = followerList.filter(x => x !== user)

        Profile.update({username:req.username}, {$set: {following: newList}}).exec(function(err, item) {
            res.send({"username": req.username, "following": items[0].following})
        })


    })
}

module.exports = app => {
    app.put('/headline', putHeadline)
    app.get('/headlines/:users?', getHeadlines)

    app.get('/zipcode/:user?', getZip)
    app.put('/zipcode', putZip)

    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)

    app.get('/dob', getDOB)

    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', putAvatar)

    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
    
}


// $ heroku redis:cli --app glambition --confirm glambition
// keys *
// flushall
// reset