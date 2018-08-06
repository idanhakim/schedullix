const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const DB_NAME = 'user';

module.exports = {
    query,
    checkForUser,
    addUser,
    addCustomer,
    updateUser,
    getUserCustomers,
    getUserById,
    getUserByBusinessName,
    removeCustomer
}

function updateUser(user) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            collection.update({
                    "_id": new ObjectId(user._id)
                }, {
                    $set: {
                        "password": user.password,
                        "email": user.email,
                        "phone": user.phone,
                        "businessName": user.businessName,
                        "location": user.location,
                        "timePerCustomer": user.timePerCustomer,
                        "workingHours": user.workingHours,
                        "configElements": user.configElements
                    }
                })
                .then(_ => console.log('user update!'))
                .catch(_ => console.log('customer not update!'))
        })
}

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            let users = collection.find({}).toArray()
            return Promise.resolve(users)
        })
}

function addCustomer(userId, customerToAdd) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            collection.update({
                    "_id": new ObjectId(userId)
                }, {
                    $push: {
                        "customers": customerToAdd
                    }
                })
                .then(_ => console.log('customer ADD!'))
                .catch(_ => console.log('customer not ADD!'))
        })
}

function checkForUser(loginInfo) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            return collection.findOne({
                    email: loginInfo.email,
                    password: loginInfo.password
                })
                .then(user => {
                    if (!user) return Promise.reject('wrong username!')
                    return user
                })
        })
}

function getUserCustomers(userId) {
    var id = ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            return collection.findOne({
                    _id: id,
                })
                .then(user => {
                    if (!user) return Promise.reject('wrong username!')
                    return Promise.resolve(user.customers)
                })
        })
}

function removeCustomer(removeInfo) {
    var id = ObjectId(removeInfo.userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            return collection.update({
                    _id: id,
                }, {
                    $pull: {
                        customers: {
                            time: removeInfo.customerTime
                        }
                    }
                }, {
                    multi: true
                })
                .then(() => {
                    return console.log('deleted customer');
                })
                .catch(() => {
                    return console.log('deleted no customer');
                })
        })
}

function addUser(signUpInfo) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            return collection.insert(signUpInfo)
                .then(user => {
                    if (!user) return Promise.reject('user wasnt added!')
                    return user
                })
        })
}

function getUserById(userId) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            let user = collection.findOne({
                "_id": new ObjectId(userId)
            })
            return Promise.resolve(user)
        })
}

function getUserByBusinessName(businessName) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(DB_NAME);
            return collection.findOne({
                    "businessName": businessName
                })
                .then(res => {
                    return Promise.resolve(res)
                })
                .catch(err => {
                    console.log('not good', err)
                })
        })
}

// function connectToMongo() {
//     const MongoClient = require('mongodb').MongoClient;
//     const url = 'mongodb://sprint4:sprint123@ds163730.mlab.com:63730/user_db';
//     return MongoClient.connect(url)
//         .then(client => client.db())
// }