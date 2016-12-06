/**
 * Created by Jeffrey on 11/18/2016.
 */
const express = require('express');
const md5 = require('md5')
const app = express();
// var models = require('./model.js')

const User = require('./model.js').User;
const Profile = require('./model.js').Profile;


// User.find({ username: "sep1" }).exec(function(err, users) {
//
// })

const cookieKey = 'string';
var sessionUser = {};

const generateCode = function(username) {
    sessionUser[username] = username;
    return Math.random();
}



const isLoggedIn = function(req, res, next) {
    var foo = req.cookies[cookieKey];

    if (!foo) {
        return res.sendStatus(401);
    }
    var username = sessionUser[foo];
    if (username) {
        req.username = username
        next()
    } else {
        res.sendStatus(401)
    }
}




module.exports = app => {
    app.post('/login', function(req, res){
        User.find({username: req.body.username}).exec(function(err, item) {
            if(item[0].hash == md5(req.body.password + item[0].salt)) {
                res.send({username:req.body.username, result:"success"})
            }
            res.cookie(cookieKey, generateCode(req.body.username),
                {maxAge: 4000*10000, httpOnly: true})

            if (!item.length) {
                res.send({username: item[0].username, result:"success"})
            } else {
                res.send("Can't find user")
            }

        })
    });
    app.post('/register', function(req, res){
        const salt = 'a;sldkfja;sdkfljas;dlfkjas;ldkfjtqghpiuwerfhn;asidfh';
        new Profile({username: req.body.username, email: req.body.email, dob: req.body.dob || new Date(), zipcode: req.body.zipcode, password: req.body.password}).save()
        new User({username: req.body.username, salt:salt, hash:md5(req.body.password + salt)}).save()

    });
    app.use(isLoggedIn);

    app.get('/logout', function(req, res){

        sessionUser = {}
    });
}




