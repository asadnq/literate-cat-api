'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with carts
 */
const Cart = use('App/Models/Cart');
const Database = use('Database');
const Book = use('App/Models/Book');

class CartController {
  /**
   * Show a list of all carts.
   * GET carts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.params
   */
  async index ({ auth, request, response, params }) {
    try {
      const user = await auth.getUser();

      const query = Cart.query()
      query.with('book.genres');
      query.with('book.author');

      const carts = await query.where('user_id', user.id).fetch();

      const total = await Database.from('carts').where('user_id', user.id).getSum('price_sum');

      response.json({
        message: 'cart list fetched',
        data: {
            carts,
            total
          }
      });
    } catch(err) {
      throw err;
    }
  }

  /**
   * Create/save a new cart.
   * POST carts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    try {
      const user = await auth.getUser();

    	const { book_id, quantity, price_sum } = request.post();

      const book = await Book.find(book_id);
      const check = await Database.from('carts')
                    .where('book_id', book_id)
                    .andWhere('user_id', user.id).first();

      // if the same cart have the same product
      if(check) {
        console.log(book.id, check.id)
        const summed = book.price * quantity;
        const cart = await Cart.find(check.id);

        cart.quantity = cart.quantity + quantity;
        cart.price_sum = cart.price_sum + summed;

        await cart.save();

        response.status(201).json({
            message: 'Quantity added.',
            data: cart.toJSON()
          });
      }

      else {
      	const created_cart = await Cart.create({book_id, quantity, price_sum, user_id: user.id});
         const query = Cart.query()
         query.with('book.genres');
         query.with('book.author');

         const cart = await query.where('id', created_cart.id).first();

      	response.status(201).json({
      		message: 'Succesfully created a new cart.',
      		data: cart
      	});
      }
    } catch(err) {
      throw err;
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
  async show ({ params, request, response }) {
    try {
      const cart = await Cart.find(params.id);

      response.status(201).json({
        message: 'Here is your cart.',
        data: cart
      });
    } catch(err) {
      throw err;
    }

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
    try {
      const { book_id, quantity, price_sum } = request.post();

      const cart = await Cart.find(params.id);

      cart.merge({book_id, quantity, price_sum});

      await cart.save();

      response.status(200).json({
        message: 'Successfully updated this cart.',
        data: cart
      })
    } catch(err) {
      throw err;
    }
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
    try {
      const cart = await Cart.find(params.id);

      await cart.delete();

      response.status(200).json({
        response: 'Successfully deleted this cart.',
        data: cart
      });
    } catch(err) {
      throw err
    }
  }

}

module.exports = CartController
