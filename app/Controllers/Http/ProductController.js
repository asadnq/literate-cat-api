'use strict'

const Product = use('App/Models/Product')

class ProductController {

    async all({request, response}) {
        const products = await Product.all();
        response.send(products);
    }

    async details({params}) {
        const product = await Product.find(params.id);
        return product;
    }
}

module.exports = ProductController
