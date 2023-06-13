'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fp = require('fastify-plugin')
const amqp = require('amqplib')
const uuid = require('uuid')
const config = require('./../config')

const {
    insertProduct
} = require('./../utils/product')

const consumerTag = uuid.v4()

async function wait(millis) {
    await new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}

function decodeJson(str) {
    try {
        return JSON.parse(str)
    } catch (err) {
        return null
    }
}

module.exports = fp(async function rabbitPlugin(fastify, opts) {
    const connection = await amqp.connect(config.amqpUrl);
    // publisher channel
    const ch1 = await connection.createChannel()

    await ch1.assertExchange('basket', 'direct')

    fastify.decorate('sendCheckoutEvent', (basket) => {
        ch1.publish('basket', 'basket.checkout', Buffer.from(JSON.stringify(basket)))
    })

    // consumer channel
    const ch2 = await connection.createChannel()

    await ch2.assertQueue('basket_create_product', {
        durable: true
    })
    await ch2.bindQueue('basket_create_product', 'product', 'product.created')

    fastify.addHook('onReady', async function () {
        await ch2.consume('basket_create_product', async function (message) {
            const content = decodeJson(message.content)

            if (!content) {
                return ch2.ack(message)
            }

            try {
                await insertProduct(fastify.redis, content)

                ch2.ack(message)
            } catch (err) {
                fastify.log.error(err)

                ch2.reject(message, true)
            }

        }, { noAck: false, consumerTag, prefetchCount: 5 })

        fastify.log.info('Consumer started')
    })

    fastify.addHook('onClose', async () => {
        // stop receiving messages
        await ch2.cancel(consumerTag)
        // wait for messages to be processed
        await wait(1000)

        await connection.close();
    })
});
