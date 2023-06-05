'use strict'

const { basketTTL } = require('./../config')
const {
    getProduct
} = require('./product')

const getKey = (id) => {
    return `basket:${id}`
}

module.exports.incrementItemQuantity = async (redis, userId, productId, add = 1) => {
    const key = getKey(userId)

    await redis
        .multi()
        .hincrby(key, productId, add)
        .expire(key, basketTTL, 'NX') // if added for first time
        .exec()
}

module.exports.removeItem = async (redis, userId, productId) => {
    await redis.hdel(getKey(userId), productId)
}

module.exports.hasProduct = async (redis, userId, productId) => {
    return redis.hexists(getKey(userId), productId)
}

module.exports.getBasket = async (redis, userId) => {
    const redisBasket = await redis.hgetall(getKey(userId))
    const basket = []

    for (const entry of Object.entries(redisBasket)) {
        const product = await getProduct(redis, entry[0])

        product.productId = entry[0]
        product.quantity = entry[1]

        basket.push(product)
    }

    return basket
}

module.exports.mergeBaskets = async (redis, firstBasketId, secondBasketId) => {
    const basket = await redis.hgetall(getKey(secondBasketId))
    const multi = redis.multi()

    for (const entry of Object.entries(basket)) {
        multi.hincrby(getKey(firstBasketId), entry[0], entry[1])
    }

    await multi.exec()
}

module.exports.deleteBasket = async (redis, userId) => {
    await redis.del(getKey(userId))
}
