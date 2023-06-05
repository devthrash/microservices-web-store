'use strict'

const {
    retrieveBasketItemsSchema,
    incrementBasketItemQuantity,
    checkoutSchema
} = require('./schema')

const {
    getBasket,
    incrementItemQuantity,
    removeItem,
    deleteBasket,
    hasProduct
} = require('./../../utils/basket')
const {
    productExists
} = require('./../../utils/product')
const { generateSessionId } = require("../../utils/session");


module.exports = async function (fastify)  {
    // fastify.decorateRequest('userId', null)

    // fastify.addHook('preValidation', async (request, reply) => {
    //     request.verifyJwt()
    //     request.userId = request.decodeJwt().sub
    // })

    fastify.decorateRequest('sessionId', null)
    fastify.addHook('preHandler', async (request, reply) => {
        request.sessionId = request.query.sessionId || generateSessionId()
        reply.header('basket-session-id', request.sessionId)
    })

    fastify.get('/', { schema: retrieveBasketItemsSchema }, async function(request, reply) {
        return getBasket(this.redis, request.sessionId)
    })

    fastify.post('/items', { schema: incrementBasketItemQuantity }, async function(request, reply) {
        const { sessionId } = request
        const {
            productId,
            increment
        } = request.body

        if (!(await productExists(this.redis, productId))) {
            throw this.httpErrors.badRequest('Invalid product ID')
        }

        await incrementItemQuantity(this.redis, sessionId, productId, increment)

        reply.status(204)
    })

    fastify.delete('/items/:productId', async function(request, reply) {
        const { sessionId } = request
        const { productId } = request.params

        if (!(await hasProduct(this.redis, sessionId, productId))) {
            throw this.httpErrors.notFound()
        }

        await removeItem(this.redis, sessionId, productId)

        reply.status(204)
    })

    fastify.post('/checkout', { schema: checkoutSchema }, async function(request, reply) {
        request.verifyJwt()

        const userId = request.decodeJwt().sub
        const { deliveryAddress } = request.body
        const basket = await getBasket(this.redis, request.sessionId)

        if (!basket.length) {
            throw this.httpErrors.badRequest('Empty basket')
        }

        await this.sendCheckoutEvent({
            userId,
            orderNo: request.sessionId,
            items: basket,
            deliveryAddress
        })
        await deleteBasket(this.redis, request.sessionId)

        reply.status(204)
    })
};
