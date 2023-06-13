'use strict'

const {
    retrieveProductCategoriesSchema,
    retrieveProductsSchema,
    retrieveProductSchema,
    createProductSchema,
    searchProductsSchema
} = require('./schema')

const {
    retrieveProductCategories,
    retrieveProductsInCategory,
    retrieveProducts,
    retrieveProductById,
    searchProducts,
    insertProduct
} = require('./../../utils/product')

async function checkIfAdmin(request, reply) {
    request.verifyJwt()
    const { roles } = request.decodeJwt()

    if (!Array.isArray(roles) || roles.indexOf('admin') === -1) {
        throw new this.httpErrors.forbidden()
    }
}

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
module.exports = async function(fastify, options) {
    fastify.get('/categories', { schema: retrieveProductCategoriesSchema }, async function(request, reply) {
        return retrieveProductCategories(this.mongo)
    })

    fastify.get('/category/:category', { schema: retrieveProductsSchema }, async function(request, reply) {
        const { category } = request.params
        const { perPage = 20, page = 1 } = request.query

        const result = await retrieveProductsInCategory(this.mongo, {
            category,
            perPage,
            page
        })

        if (!result) {
            return {
                products: [],
                total: 0
            }
        }

        return result
    })

    fastify.get('/', { schema: retrieveProductsSchema }, async function(request, reply) {
        const { perPage = 20, page = 1 } = request.query

        const result = await retrieveProducts(this.mongo, { perPage, page })

        if (!result) {
            return {
                products: [],
                total: 0
            }
        }

        return result
    })

    fastify.get('/:productId', { schema: retrieveProductSchema }, async function(request, reply) {
        const product = await retrieveProductById(this.mongo, this.stringToObjectId(request.params.productId))

        if (!product) {
            throw new this.httpErrors.notFound()
        }

        return product
    })

    fastify.get('/search', { schema: searchProductsSchema }, async function(request, reply) {
        const {
            text,
            perPage = 20,
            page = 1,
            category,
            brand,
            minPrice,
            maxPrice,
            ...specs
        } = request.query

        const result = await searchProducts(this.mongo, {
            text,
            perPage,
            page,
            category,
            brand,
            minPrice,
            maxPrice,
            ...specs
        })

        if (!result) {
            return {
                products: [],
                total: 0,
                // minPrice: null,
                // maxPrice: null,
                categories: [],
                brands: [],
                prices: [],
                specs: []
            }
        }

        return result
    })

    // protected routes
    fastify.register(async (fastify) => {
        fastify.addHook('preValidation', checkIfAdmin)

        fastify.post('/', { schema: createProductSchema }, async function(request, reply) {
            const doc = {
                ...request.body
            }

            const _id = await insertProduct(this.mongo, doc)

            // notify other services when products are created
            await this.sendCreatedEvent(doc)

            reply.status(201)

            return { _id }
        })
    })
}
