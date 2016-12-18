/**
 * Created by Jeffrey on 11/10/2016.
 */

const getHeadlines = (req, res) => {
     res.send({ headlines: [{
          username: req.params.user || 'sep1',
          headline: 'my headline'
     }]})
}

const putHeadline = (req, res) => {
     res.send({
          username: 'sep1',
          headline: req.body.headline || 'you did not supply it'
     })
}

const hello = (req, res) => res.send({ hello: 'world' })


module.exports = app => {
     app.put('/headline', putHeadline)
     app.get('/', hello)
     app.get('/headlines/:user?', getHeadlines)
}