/**
 * Created by Jeffrey on 11/10/2016.
 */

const Post = require('./model.js').Post;
const Profile = require('./model.js').Profile
// const Auth = require('./auth.js');


// const getHeadlines = (req, res) => {
//
//     const users = req.params.users ? req.params.users.split(',') : [req.username]
//     console.log(users)
//     Profile.find({username : users}).exec(function(err, items) {
//         res.send({"headlines": items.map(x => ({"username": x.username, "headline": x.status}))})
//     })
//     console.log("finished")
// }
//
//
//
// //addheadlines
// const putHeadline = (req, res) => {
//
//     Profile.update({username:req.username}, {$set: {status: req.body.headline}}).exec(function(err, items) {
//         Profile.find({username: req.username}).exec(function(err, item) {
//             res.send({"username": item[0].username, "headline": item[0].status})
//         })
//     })
// }



const getArticle = (req, res) => {

    Post.find({}, function (err, items) {

        Profile.find({username:req.username}).exec(function(err, item) {
            const followList = item[0].following
            console.log("item[0]: " + "\n" + + item[0])
            console.log("item[0].followers: " + "\n" + + item[0].following)

            const articleList = items.filter(x => followList.indexOf(x.author) >= 0 || x.author == req.username)
            console.log("articleList: " + "\n" + articleList )
            const orderedList = articleList.sort((x, y) => {
                return new Date(x.date) - new Date(y.date)
            })
            console.log("ordered List" + "\n" + orderedList)

            res.send({'articles':orderedList.reverse().splice(0, 10)})

        })
    })

}



const postArticle = (req, res) => {
    new Post({author:req.username, text: req.body.text, date: new Date(), img: "NA", comments:[]}).save()

    Post.find({}).exec(function(err, item) {
        res.send({'articles':
            item
        })
    })
}

const generateCode = function() {
    return Math.random().toString(20).substring(5, 9) + new Date();
}


const putArticle = (req, res) => {


    const id = req.params._id
    const commentId = req.body.commentId

    console.log("Article ID: " + id)
    console.log("commentId: " + commentId)
    // Profile.update({username:users}, {$set: {picture: req.body.avatar}}).exec(function(err, items) {
    //     Profile.find({username: users}).exec( function(err, items) {
    //         res.send({"username": items[0].username, "avatar": items[0].picture})
    //     })
    // })


    if (commentId == -1) {
        //add a comment
        Post.find({_id: id}, function(err, items) {
            console.log("find items: " +"\n"+ items)
            console.log("comments: " + "\n" + items[0].comments)
            const commentId = generateCode()
            const payload = {commentId: commentId, author: req.username, date: new Date(), text: req.body.text}

            const commentList = items[0].comments
            console.log(items[0].author)
            console.log(payload)
            console.log(commentList.push(payload))
            console.log("commentList:" +"\n"+ commentList)

            const newPost = new Post({author:req.username, text: items[0].text, date: new Date(), img:"NA", comments:payload})


            Post.update({_id: id}, {$set: {comments: commentList}}).exec(function(err, item) {
                console.log("Update items: " +"\n"+ item)
                res.send({"articles": items})
            })
        })

    } else if (commentId > 0) {
        //changing a comment
    } else {
        //changing a Post
        console.log("We are changing a Post")
        console.log("req.body.text: " + req.body.text)

        Post.find({_id: id}, function(err, item) {
            console.log("Req body: " + req.body.text)
            Post.update({_id: id}, {$set: {text: req.body.text}}).exec(function (err, items) {
                res.send({"articles": item[0]})
            })
        })
    }

    // Post.find({_id: id}, function(err, items) {
    //     console.log("Req body: "+ req.body.text)
    //     Post.update({_id: id}, {$set: {text: req.body.text}}).exec(function(err, items) {
    //         res.send({"articles": items})
    //     })

        // res.send({'articles':items})

}


//
// var postSchema = new mongoose.Schema({
//     id: Number,
//     author: String,
//     body: String,
//     date: Date,
//     img: String,
//     comments: [{
//         commentId: Number,
//         author: String,
//         body: String,
//         date: Date
//     }]
// })

module.exports = app => {
    app.post('/article', postArticle)
    app.get('/articles/:id*?', getArticle)
    app.put('/articles/:_id', putArticle)
}
