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
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const query = await Database.select('carts.id',
                  'carts.book_id', 'books.name', 'books.price',
                  'books.description', 'books.cover_image', 'carts.price_sum',
                  'carts.created_at','carts.updated_at', 'carts.quantity').from('carts').
              leftJoin('books', 'carts.book_id', 'books.id');

    const total = await Database.table('carts').getSum('price_sum');

    await response.json({
      message: 'cart list fetched',
      data: query,
      total
    });
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

  	const { book_id, quantity, price_sum } = request.post();

    const book = await Book.find(book_id);
    const check = await Database.from('carts').where('book_id', book_id);

    if(check.length > 0) {
      const summed = book.price * quantity;
      const cart = await Cart.query().where('book_id', book_id).update({
        quantity: quantity + quantity,
        price_sum: price_sum + summed
      });  
      response.status(201).json({
        message: 'quantity added.',
        cart
        });
    }

    else {
    	const created_cart = await Cart.create({book_id, quantity, price_sum});

      const cart = await Cart.find(created_cart.id);
      // const book_id await cart.book_id;
      const book = await cart.book().fetch();

      // const merged = { ...book.toJSON(), ...cart.toJSON() };

      const merged = await Object.assign( book.toJSON(), cart.toJSON());

    	await response.status(201).json({
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
    const cart = await Cart.find(1);

    return await response.send(cart.id);
  }



}

module.exports = CartController