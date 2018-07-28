const ObjectId = require('mongodb').ObjectId;

function query(name='', minPrice=0) {
    var criteria = {
        price : {
            $gt : minPrice
        }
    };
    if (name) criteria.name = {$regex : `.*${name}.*`}

    console.log('Criteria', criteria);

    return connectToMongo()
        .then(db => {
            const collection = db.collection('toys');
            return collection.find(criteria).toArray()
        })
}

function remove(toyId) {
    toyId = new ObjectId(toyId)    
    return connectToMongo()
        .then(db => {
            const collection = db.collection('toys');
            return collection.remove({ _id: toyId })
        })
}
function getById(toyId) {
    toyId = new ObjectId(toyId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('toys');
            return collection.findOne({ _id: toyId })
        })
}

function add(toy) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('toys');
            return collection.insertOne(toy)
                .then(result => {
                    toy._id = result.insertedId;
                    return toy;
                })
        })
}

function update(toy) {
    toy._id = new ObjectId(toy._id)
    console.log('new toy', toy)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('toys');
            return collection.updateOne({ _id: toy._id }, { $set: toy })
                .then(res => {
                    console.log('toy!!')
                    return toy;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://galyo:momo123@ds237445.mlab.com:37445/toys_db';
    const dbName = 'toys';
    return MongoClient.connect(url)
        .then(client => client.db())
}
