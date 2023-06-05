'use strict'

module.exports.insertUser = async (mongo, doc) => {
    const result = await mongo.db.collection('users').insertOne(doc)

    return result.insertedId
}

module.exports.findUserByEmail = async (mongo, email) => {
    return mongo.db.collection('users').findOne({ email })
}

module.exports.createIndexes = async (mongo) => {
    await mongo.db.collection('users').createIndex(
        {
            email: 1
        },
        {
            unique: true
        }
    )

    await mongo.db.collection('users').createIndex(
        {
            uuid: 1
        },
        {
            unique: true
        }
    )
}
