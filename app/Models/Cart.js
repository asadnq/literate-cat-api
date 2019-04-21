'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {

	book() {
		return this.hasOne('App/Models/Book', 'book_id', 'id');
	}

	user() {
		return this.belongsTo('App/Models/User', 'user_id', 'id');
	}
}

module.exports = Cart
