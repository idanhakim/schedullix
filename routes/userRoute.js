const USER_URL = '/users';
const userService = require('../services/userService')

module.exports = (app) => {

    app.get(`${USER_URL}/`, (req, res) => {
        return userService.query()
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                console.log('some problem')
            })
    })

    // Route for Login User
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

    // Route for add Customer
    app.put(`${USER_URL}/:userId/addCustomer`, (req, res) => {
        userService.addCustomer(req.params.userId, req.body)
            .then(res => console.log('Customer Add!'))
            .catch(err => console.log('Customer not Add!'))
    })

    app.put(`${USER_URL}/updateUser`, (req, res) => {      
        userService.updateUser(req.body)
            .then(res => console.log('User Update!'))
            .catch(err => console.log('User no Update!'))
    })
}