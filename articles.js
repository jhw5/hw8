/**
 * Created by Jeffrey on 11/10/2016.
 */

const Posts = require('./model.js').Posts;
const Auth = require('./auth.js');

const getArticle = (req, res) => {
    console.log('Payload received', req.body)

    Posts.find({}, function (err, items) {
        res.send(items)
    })
}




const addArticle = (req, res) => {
    console.log('Payload received', req.body)
    new Posts({ author: req.body.author, img: null, date: new Date().getTime(), text: req.body.text}).save()
    res.send("Post successful")
}

const putArticle = (req, res) => {
    console.log('Payload received', req.body)
    const id = req.params._id
    Posts.find({_id: id}, function(err, items) {

        res.send(items)
    })
}




module.exports = app => {
    app.post('/article', addArticle)
    app.get('/articles', getArticle)
    app.put('/article/:_id', putArticle)
}
