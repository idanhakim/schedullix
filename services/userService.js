const ObjectId = require('mongodb').ObjectId;
const DB_NAME = 'user';

module.exports = {
    query,
    checkForUser
}

function query() {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_NAME);
            let users = collection.find({}).toArray()
            return Promise.resolve(users)
        })
}

function checkForUser(loginInfo) {
    return connectToMongo()
    .then(db => {
        const collection = db.collection(DB_NAME);
        return collection.findOne({ email: loginInfo.email, password: loginInfo.password})
            .then(user => {
                console.log('user in service backend', user)
                if (!user) return Promise.reject('wrong username!')
                return user
            })
    })
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://sprint4:sprint123@ds163730.mlab.com:63730/user_db';
    return MongoClient.connect(url)
        .then(client => client.db())
}