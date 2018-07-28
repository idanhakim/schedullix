const REVIEW_URL = '/reviews';
const reviewService = require('../services/reviewService')


module.exports = (app) => {

    app.get('/reviews', (req, res) => {
        reviewService.query()
            .then(reviews => res.json(reviews))
    })
    
    app.post('/reviews', (req, res) => {
        let review = {
            userId: req.session.loggedinUser._id,
            toyId: req.body.toyId,
            txt: req.body.content
        }
        console.log('this is the review info',review)
        return reviewService.addReview(review)
            .then(review => {
                res.json(review)
            })
    })
    
    
}