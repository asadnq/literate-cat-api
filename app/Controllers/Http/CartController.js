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

    response.json({
      message: 'cart list fetched',
      data: query,
      total
    });
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

    // if the same cart have the same product
    if(check.length > 0) {
      const summed = book.price * quantity;
      const cart = await Cart.query().where('book_id', book_id).first();

      cart.quantity = cart.quantity + quantity;
      cart.price_sum = cart.price_sum + summed;

      await cart.save();

      response.status(201).json({
          message: 'Quantity added.',
          data: cart.toJSON()
        });
    }

    else {
    	const created_cart = await Cart.create({book_id, quantity, price_sum});

      const cart = await Cart.find(created_cart.id);

      const book = await cart.book().fetch();
      //merge cart and matched product to be put in response 
      const merged = await Object.assign( book.toJSON(), cart.toJSON());

    	response.status(201).json({
    		message: 'Succesfully created a new cart.',
    		data: merged
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
  async show ({ params, request, response }) {
    const cart = await Cart.find(params.id);

    response.status(201).json({
      message: 'Here is your cart.',
      data: cart
    })

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

    const { book_id, quantity, price_sum } = request.post();

    const cart = await Cart.find(params.id);

    cart.merge({book_id, quantity, price_sum});

    await cart.save();

    response.status(200).json({
      message: 'Successfully updated this cart.',
      data: cart
    })
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

    response.status(200).json({
      response: 'Successfully deleted this cart.',
      data: cart
    });
  }

  async test({params, request, response}) {
    const cart = await Cart.find(1);

    response.send(cart.id);
  }

  async getProduct({params, response}) {
    const cart = await Cart.find(params.id);

    const book = await cart.book().fetch();

    response.status(200).json({
      message: `this is product from cart with id${params.id}.`,
      data: book 
    })
  }

}

module.exports = CartController