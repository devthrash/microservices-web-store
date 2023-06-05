'use strict'

const brand = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
    },
    required: ['name'],
    additionalProperties: false
}

const category = {
    type: 'string',
    minLength: 1
}

const specsItem = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
        value: {}
    },
    required: ['name', 'value'],
    additionalProperties: false,
}

const specsArray = {
    type: 'array',
    items: specsItem,
    minItems: 1
}

const image = {
    type: 'object',
    properties: {
        url: { type: 'string' }
    },
    required: ['url'],
    additionalProperties: false,
}

const imageArray = {
    type: 'array',
    items: image,
    minItems: 1
}

const productInput = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 3 },
        description: { type: 'string', minLength: 10 },
        brand: brand,
        category: category,
        images: imageArray,
        specs: specsArray,
        price: { type: 'number', minimum: 0 }
    },
    required: ['title', 'description', 'brand', 'category', 'images', 'specs', 'price'],
    additionalProperties: false
}

const productOutput = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        brand: brand,
        category: category,
        images: imageArray,
        specs: specsArray,
        price: { type: 'number' }
    },
}

const retrieveProductCategoriesSchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
}

const retrieveProductsSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                products: {
                    type: 'array',
                    items: productOutput
                },
                total: { type: 'integer' }
            }
        }
    },
    query: {
        type: 'object',
        properties: {
            perPage: {
                type: 'integer',
                minimum: 10,
                maximum: 100
            },
            page: {
                type: 'integer',
                minimum: 1
            }
        }
    }
}

const retrieveProductSchema = {
    response: {
        200: productOutput
    }
}

const searchProductsSchema = {
    query: {
        type: 'object',
        properties: {
            text: {
                type: 'string',
                minLength: 1
            },
            perPage: {
                type: 'integer',
                minimum: 10,
                maximum: 100
            },
            page: {
                type: 'integer',
                minimum: 1
            },
            category: {
                type: 'string'
            },
            brand: {
                type: 'string'
            },
            minPrice: {
                type: 'number',
                minimum: 0
            },
            maxPrice: {
                type: 'number',
                minimum: 0
            }
        },
        required: ['text']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                products: {
                    type: 'array',
                    items: productOutput
                },
                total: { type: 'integer' },
                minPrice: {
                    oneOf: [
                        { type: 'number' },
                        { type: 'null' }
                    ]
                },
                maxPrice: {
                    oneOf: [
                        { type: 'number' },
                        { type: 'null' }
                    ]
                },
                categories: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            count: { type: 'integer' }
                        }
                    }
                },
                brands: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            count: { type: 'integer' }
                        }
                    }
                },
                prices: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                            maxPrice: { type: 'number' },
                            count: { type: 'integer' }
                        }
                    }
                }
            }
        }
    }
}

const createProductSchema = {
    body: productInput,
    response: {
        201: {
            type: 'object',
            properties: {
                _id: { type: 'string' }
            }
        }
    }
}

module.exports = {
    retrieveProductCategoriesSchema,
    retrieveProductsSchema,
    retrieveProductSchema,
    searchProductsSchema,
    createProductSchema
}
