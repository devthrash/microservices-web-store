'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')
const amqp = require('amqplib')

const config = require('./../config')
const {
    verify,
    decode
} = require('./../utils/jwt')

function stringToObjectId(str) {
    if (this.mongo.ObjectId.isValid(str)) {
        return new this.mongo.ObjectId(str)
    } else {
        return null
    }
}

module.exports = fastifyPlugin(async function(fastify, options) {
    const connection = await amqp.connect(config.amqpUrl);
    const channel = await connection.createChannel()

    await channel.assertExchange('product', 'direct')

    fastify.addHook('onClose', async () => {
        console.log('Closing amqp connection...')

        await channel.close();
        await connection.close();
    })

    fastify.decorate('sendCreatedEvent', (product) => {
        channel.publish('product', 'product.created', Buffer.from(JSON.stringify(product)))
    })
    fastify.decorate('stringToObjectId', stringToObjectId)

    fastify.decorateRequest('verifyJwt', function() {
        const header = this.headers['authorization']

        if (!header) {
            throw new this.server.httpErrors.unauthorized('Token not provided')
        }

        if (!verify(header.split(' ')[1])) {
            throw new this.server.httpErrors.unauthorized()
        }
    })
    fastify.decorateRequest('decodeJwt', function() {
        return decode(this.headers['authorization'].split(' ')[1])
    })
})
