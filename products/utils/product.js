'use strict'

/**
 * @param {import('@fastify/mongodb').FastifyMongoObject}mongo
 * @returns {Promise<*>}
 */
module.exports.retrieveProductCategories = async (mongo) => {
    return mongo.db.collection('products').distinct('category')
}

const aggregate = async (mongo, { match = {}, page, perPage }) => {
    return mongo.db.collection('products').aggregate([
        {
            $match: match
        },
        {
            $sort: { _id: 1 }
        },
        {
            $facet: {
                products: [
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

module.exports.retrieveProductsInCategory = async (mongo, opts) => {
    const {
        category,
        page,
        perPage
    } = opts

    return aggregate(mongo, {
        match: {
            category
        },
        page,
        perPage
    })
}

module.exports.retrieveProducts = async (mongo, opts) => {
    const {
        page,
        perPage
    } = opts

    return aggregate(mongo, { page, perPage })
}

module.exports.retrieveProductById = async (mongo, _id) => {
    return mongo.db.collection('products').findOne({ _id })
}

module.exports.searchProducts = async (mongo, opts) => {
    const {
        text,
        category,
        brand,
        minPrice,
        maxPrice,
        page,
        perPage
    } = opts

    const otherFilters = {}

    if (category) {
        otherFilters.category = category
    }

    if (brand) {
        otherFilters.brand = { name: brand }
    }

    if (minPrice && maxPrice) {
        otherFilters.price = { $gt: minPrice, $lt: maxPrice }
    } else if (minPrice) {
        otherFilters.price = { $gt: minPrice}
    } else if (maxPrice) {
        otherFilters.price = { $lt: maxPrice }
    }

    return mongo.db.collection('products').aggregate([
        {
            $match: {
                $text: {
                    $search: text
                },
                ...otherFilters
            },
        },
        {
            $sort: {
                score: { $meta: "textScore" }
            }
        },
        {
            $facet: {
                products: [
                    { $limit: page * perPage },
                    { $skip: (page - 1) * perPage }
                ],
                total: [
                    { $count: 'count' }
                ],
                minPrice: [
                    {
                        $sort: { price: 1 }
                    },
                    {
                        $limit: 1
                    },
                    {
                        $project: { price: 1 }
                    }
                ],
                maxPrice: [
                    {
                        $sort: { price: -1 }
                    },
                    {
                        $limit: 1
                    },
                    {
                        $project: { price: 1 }
                    }
                ],
                brands: [
                    { $sortByCount: "$brand.name" }
                ],
                categories: [
                    { $sortByCount: "$category" }
                ],
                prices: [
                    {
                        $bucket: {
                            groupBy: '$price',
                            boundaries: [
                                0,
                                50,
                                100,
                                200,
                                300,
                                400,
                                500,
                                1000,
                                2000
                            ],
                            default: 'More than 2000'
                        }
                    },
                    {
                        $addFields: {
                            maxPrice: {
                                '$arrayElemAt': [
                                    [
                                        0,
                                        50,
                                        100,
                                        200,
                                        300,
                                        400,
                                        500,
                                        1000,
                                        2000
                                    ],
                                    {
                                        $sum: [
                                            {
                                                '$indexOfArray': [
                                                    [
                                                        0,
                                                        50,
                                                        100,
                                                        200,
                                                        300,
                                                        400,
                                                        500,
                                                        1000,
                                                        2000
                                                    ],
                                                    '$_id'
                                                ]
                                            },
                                            1
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        },
        {
            $unwind: '$total'
        },
        {
            $unwind: '$minPrice'
        },
        {
            $unwind: '$maxPrice'
        },
        {
            $addFields: {
                total: '$total.count',
                minPrice: '$minPrice.price',
                maxPrice: '$maxPrice.price'
            }
        }
    ]).next()
}

module.exports.createIndexes = async (mongo) => {
    const collection = mongo.db.collection('products')

    await collection.createIndex(
        {
            title: "text",
            description: "text"
        },
        {
            weights: {
                title: 10,
                category: 5,
                description: 5
            },
            default_language: 'romanian'
        }
    )

    await collection.createIndex({
        category: 1
    })

    await collection.createIndex({
        price: 1
    })
}

module.exports.insertProduct = async (mongo, doc) => {
    const result = await mongo.db.collection('products').insertOne(doc)

    return result.insertedId
}
