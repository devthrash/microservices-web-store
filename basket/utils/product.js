'use strict'

const getKey = (id) => {
    return `products:${id}`
}

module.exports.insertProduct = async (redis, opts) => {
    const {
        _id,
        title,
        price
    } = opts

    await redis.hset(getKey(_id), 'title', title, 'unitPrice', price)
}

module.exports.getProduct = async (redis, id) => {
    return redis.hgetall(getKey(id))
}

module.exports.productExists = async (redis, id) => {
    return redis.exists(getKey(id))
}
