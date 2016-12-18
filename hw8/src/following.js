/**
 * Created by Jeffrey on 11/18/2016.
 */
const following = [
    {"username":"Jeffrey Wang@google","following":["sep1"]}
]

const getFollower = (req, res) => {
    console.log('Payload received', req.body)
    res.send(JSON.stringify({
        "following": following
    }))
}