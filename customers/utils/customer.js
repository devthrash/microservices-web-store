'use strict'

module.exports.findCustomerByUserId = async (mongo, userId) => {
    return mongo.db.collection('customers').findOne({ userId })
}

module.exports.updateCustomer = async (mongo, userId, opts) => {
    const query = { userId }
    const doc = {
        $set: opts
    }
    const options = { returnDocument: 'after' }

    const result = await mongo.db.collection('customers').findOneAndUpdate(query, doc, options)
    return result.value
}

module.exports.insertCustomer = async (mongo, userId, opts) => {
    const query = { userId }
    const doc = {
        $set: {
            phone: null,
            addresses: [],
            ...opts
        }
    }
    const options = { upsert: true }

    await mongo.db.collection('customers').updateOne(query, doc, options)
}

module.exports.createIndexes = async (mongo) => {
    await mongo.db.collection('customers').createIndex(
        {
            userId: 1
        },
        {
            unique: 1
        }
    )
}
