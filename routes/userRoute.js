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

    app.post(`${USER_URL}/customers`, (req, res) => {
        var userId = req.body.userId;

        return userService.getUserCustomers(userId)
            .then(customers => {
                return res.json(customers)
            })
            .catch(err => {
                return console.log('some problem')
            })
    })

    app.delete(`${USER_URL}/removeCustomer`, (req, res) => {
        return userService.removeCustomer()
            .then(() => {
                console.log('deleted')
            })
    })

    app.get(`${USER_URL}/:userId`, (req, res) => {
        const userId = req.params.userId
        return userService.getUserById(userId)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                console.log('some problem')
            })
    })

    app.get(`${USER_URL}/business/:businessName`, (req, res) => {
        const businessName = req.params.businessName
        return userService.getUserByBusinessName(businessName)
            .then(user => {
                res.json(user)
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

    app.post(`${USER_URL}/removeCustomer`, (req, res) => {
        userService.removeCustomer(req.body)
            .then(res => console.log('User Update!'))
            .catch(err => console.log('User no Update!'))
    })
}