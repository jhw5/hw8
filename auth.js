/**
 * Created by Jeffrey on 11/18/2016.
 */
const express = require('express');
const md5 = require('md5')
const app = express();
// var models = require('./model.js')
var redis = require('redis').createClient('redis://h:p90rtsojkpfo4rf8phsgkg2e61g@ec2-54-221-221-220.compute-1.amazonaws.com:11619')
const User = require('./model.js').User;
const Profile = require('./model.js').Profile;


// User.find({ username: "sep1" }).exec(function(err, users) {
//
// })

const cookieKey = 'string';

const generateCode = function() {
    return Math.random().toString(20).substring(5, 9) + new Date();
}



const isLoggedIn = function(req, res, next) {
    
    var foo = req.cookies[cookieKey];
    if (foo) {
        redis.get(foo, function(err, item) {
            if (!item) {
                res.sendStatus(401)
            } else {
                req.username = item
                next()
            }
        })
    } else {
        return res.sendStatus(401);
    }
}



module.exports = app => {
    app.post('/login', function(req, res){
        User.find({username: req.body.username}).exec(function(err, item) {
            
            if(item[0].hash == md5(req.body.password + item[0].salt)) {
                const cookieValue = generateCode();
                redis.set(cookieValue, req.body.username)
                res.cookie(cookieKey, cookieValue,
                    {maxAge: 4000*10000, httpOnly: true})
                res.send({username:req.body.username, result:"success"})
            } else {
                res.send("authentication not successful")
            }
        })
    });
    app.post('/register', function(req, res){
        const salt = generateCode();

        new Profile({username: req.body.username, status: "my first status",email: req.body.email, dob: req.body.dob || new Date(),
            zipcode: req.body.zipcode, password: req.body.password, picture: "NA"}).save()
        new User({username: req.body.username, salt:salt, hash:md5(req.body.password + salt)}).save()
        res.send({something:"registration works"})


    });

    app.use(isLoggedIn);

    app.put('/logout', function(req, res){
        redis.del(req.cookies[cookieKey])
        res.send("LOGOUT successful")
    });

    app.put('/password', function(req, res) {
        const rand = generateCode()
        User.update({username: req.username}, {$set: {salt : rand, hash:md5(req.body.password + rand)}}).exec(function(err, item){
            User.find({username: req.username}).exec(function(err, item) {
                res.send({"username":req.username, "status":"successful"})
            })

        })
    })
    


}




