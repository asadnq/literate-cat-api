'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carts
 */
const Cart = use('App/Models/Cart');
const Database = use('Database');
const Product = use('App/Models/Product');

class CartController {
  /**
   * Show a list of all carts.
   * GET carts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const query = await Database.select('carts.id',
                  'carts.product_id', 'products.name', 'products.price',
                  'products.description', 'products.cover_image', 'carts.price_sum',
                  'carts.created_at','carts.updated_at', 'carts.quantity').from('carts').
              leftJoin('products', 'carts.product_id', 'products.id');

    const total = await Database.table('carts').getSum('price_sum');

    await response.json({
      message: 'products list fetched',
      data: query,
      total
    })
  }

  /**
   * Render a form to be used for creating a new cart.
   * GET carts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cart.
   * POST carts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

  	const { product_id, quantity, price_sum } = request.post();

    const product = await Product.find(product_id);
    const check = await Database.from('carts').where('product_id', product_id);

    if(check.length > 0) {
      const summed = product.price * quantity;
      const cart = await Cart.query().where('product_id', product_id).update({
        quantity: quantity + quantity,
        price_sum: price_sum + summed
      });  
      response.status(201).json({
        message: 'quantity added'})
    }

    else {
    	const created_cart = await Cart.create({product_id, quantity, price_sum});

      const cart = await Cart.find(created_cart.id);
      const product = await cart.product().fetch();

      const merged = { ...cart.toJSON(), ...product.toJSON() };

    	response.status(201).json({
    		message: 'Succesfully created new cart.',
    		cart: merged
    	});
    }
  }

  /**
   * Display a single cart.
   * GET carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing cart.
   * GET carts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cart details.
   * PUT or PATCH carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a cart with id.
   * DELETE carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const cart = await Cart.find(params.id);

    await cart.delete();

    response.json(cart);
  }

  async test({params, request, response}) {

    const cart = await Cart.find(11);
    const product = await cart.product().fetch();

    const merged = {...product.toJSON(),...cart.toJSON()}
    return merged;
  }
}

module.exports = CartController
