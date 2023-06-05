'use strict'

module.exports.createIndexes = async (mongo) => {
    await mongo.db.collection('favorites').createIndex(
        {
            userId: 1,
            productId: 1
        },
        {
            unique: true
        }
    )
}

module.exports.addFavorite = async (mongo, userId, productId) => {
    await mongo.db.collection('favorites').updateOne({ userId, productId }, { $set: {} }, { upsert: true })
}

module.exports.deleteFavorite = async (mongo, userId, productId) => {
    await mongo.db.collection('favorites').deleteOne({ userId, productId })
}

module.exports.retrieveFavorites = async (mongo, userId) => {
    return mongo.db.collection('favorites').aggregate([
        {
            $match: {
                userId
            }
        },
        {
            $sort: { _id: -1 }
        },
        {
            $lookup:
                {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
        },
        {
            $unwind: '$product'
        },
        {
            $project: {
                productId: '$product._id',
                title: '$product.title',
                price: '$product.price',
                image: { $first: '$product.images.url' }
            }
        }
    ]).toArray()
}
