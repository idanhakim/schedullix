const ObjectId = require('mongodb').ObjectId;

function query({ userId = null, toyId = null } = {}) {
    const criteria = {}
    if (userId) criteria.userId = new ObjectId(userId)
    if (toyId) criteria.toyId = new ObjectId(toyId)
    return connectToMongo()
        .then(db => {
            return db.collection('reviews')
                .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'toys',
                        localField: 'toyId',
                        foreignField: '_id',
                        as: 'toy'
                    }
                },
                {
                    $unwind: '$toy'
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
                ]).toArray()
        })
}


function getById(reviewId) {
    const _id = new ObjectId(reviewId)
    return connectToMongo()
        .then(db => {
            return db.collection('reviews').aggregate([
                {
                    $match: {_id : _id}
                },
                {
                    $lookup:
                    {
                        from: 'toys',
                        localField: 'toyId',
                        foreignField: '_id',
                        as: 'toy'
                    }
                },
                {
                    $unwind: '$toy'
                },
                {
                    $lookup: 
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ]).toArray()
                .then(reviews => reviews[0])
        })
}


function addReview({ userId, toyId, txt }) {
    var review = {
        userId: new ObjectId(userId),
        toyId: new ObjectId(toyId),
        txt
    }
    return connectToMongo()
        .then(db => db.collection('reviews').insertOne(review))
        .then(res => {
            review._id = res.insertedId
            return getById(res.insertedId)
        })
}


function getReviewsByUser(userId) {
    const currId =  new ObjectId(userId)
    console.log(currId)
    return connectToMongo()
        .then(db => {db.collection('reviews').find({userId: currId}).toArray()
    })
}


module.exports = {
    query,
    addReview,
    getReviewsByUser
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://galyo:momo123@ds237445.mlab.com:37445/toys_db';
    const dbName = 'reviews';
    return MongoClient.connect(url)
        .then(client => client.db())
}



















