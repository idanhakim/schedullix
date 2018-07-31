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
    app.post(`${USER_URL}/customers`, (req, res) => {
        var userId = req.body.userId
        console.log('Route, user ID=', userId)
    
        return userService.getUserCustomers(userId)
            .then(customers => {
                console.log('resolve from db');
                console.log('res from db',customers );
                return res.json(customers)
            })
            .catch(err => {
                console.log('rege from db');
                return console.log('some problem')
            })
    })

    app.post(`${USER_URL}/login`, (req, res) => {
        userService.checkForUser(req.body)
        .then(user => {
            req.session.loggedinUser = user
            res.json(user)
        })
        .catch(err =>  {console.log('Wrong username or password')})
    })
    
    app.post('/users', (req, res) => {
        userService.addUser(req.body)
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

    app.put(`${USER_URL}/updateUser`, (req, res) => {
        console.log('backend uesr to update', req.body)        
        userService.updateUser(req.body)
            .then(res => console.log('User Update!'))
            .catch(err => console.log('User no Update!'))
    })
}