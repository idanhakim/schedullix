const USER_URL = '/users';
const userService = require('../services/userService')
// const reviewService = require('../services/reviewService')



module.exports = (app) => {

    app.get('/users/', (req, res) => {
        // const userId = req.params.userId
        // console.log('userRoute', userId)
        return userService.query()
            .then(users => {
                res.json(users)
            })
            .catch(err => {console.log('some problem')})
    })
        
    app.post('/users/login', (req, res) => {
        userService.checkForUser(req.body)
            .then(user => {
                req.session.loggedinUser = user
                res.json(user)
            })
            .catch(err =>  {console.log('wrong username!!')})
    })
}