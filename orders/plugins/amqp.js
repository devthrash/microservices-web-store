'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fp = require('fastify-plugin')
const amqp = require('amqplib')
const uuid = require('uuid')
const config = require('./../config')

const {
    insertOrder
} = require('./../utils/order')

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
    const ch = await connection.createChannel()

    await ch.assertExchange('basket', 'direct')
    await ch.assertQueue('create_order', {
        durable: true
    })
    await ch.bindQueue('create_order', 'basket', 'basket.checkout')
    await ch.prefetch(5)


    fastify.addHook('onReady', async function () {
        await ch.consume('create_order', async function (message) {
            const content = decodeJson(message.content)

            if (!content) {
                return ch.ack(message)
            }

            try {
                await insertOrder(fastify.mongo, content)
                ch.ack(message)
            } catch (err) {
                fastify.log.error(err)

                ch.reject(message, true)
            }

        }, { noAck: false, consumerTag })

        fastify.log.info('Consumer started')
    })

    fastify.addHook('onClose', async () => {
        // stop receiving messages
        await ch.cancel(consumerTag)
        // wait for messages to be processed
        await wait(1000)

        await connection.close();
    })
});
