'use strict'

module.exports.createIndexes = async (mongo) => {
    await mongo.db.collection('orders').createIndex(
        {
            userId: 1,
            orderNo: 1
        },
        {
            unique: true
        }
    )
}

module.exports.insertOrder = async (mongo, data) => {
    const { userId, orderNo } = data

    await mongo.db.collection('orders').updateOne(
        {
            userId,
            orderNo
        },
        {
            $set: data,
            $setOnInsert: {
                createdDate: new Date()
            }
        },
        {
            upsert: true
        }
    )
}

module.exports.retrieveOrders = async (mongo, userId, { page, perPage }) => {
    return mongo.db.collection('orders').aggregate([
        {
            $match: {
                userId
            }
        },
        {
            $sort: { _id: -1 }
        },
        {
            $facet: {
                orders: [
                    { $limit: page * perPage },
                    { $skip: (page - 1) * perPage }
                ],
                total: [
                    { $count: 'count' }
                ]
            }
        },
        {
            $unwind: '$total'
        },
        {
            $addFields: {
                total: '$total.count'
            }
        }
    ]).next()
}
