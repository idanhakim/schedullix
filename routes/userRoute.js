const USER_URL = '/users';
const userService = require('../services/userService')
// const reviewService = require('../services/reviewService')



module.exports = (app) => {

    app.get(`${USER_URL}/`, (req, res) => {
        // const userId = req.params.userId
        // console.log('userRoute', userId)
        return userService.query()
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                console.log('some problem')
            })
    })

    app.post(`${USER_URL}/login`, (req, res) => {
        userService.checkForUser(req.body)
            .then(user => {
                req.session.loggedinUser = user
                res.json(user)
            })
            .catch(err => {
                console.log('Wrong username or password')
            })
    })

    app.put(`${USER_URL}/:userId/addCustomer`, (req, res) => {
        userService.addCustomer(req.params.userId, req.body)
            .then(res => console.log('Customer Add!'))
            .catch(err => console.log('Customer not Add!'))
    })
}