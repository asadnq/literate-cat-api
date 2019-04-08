'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {

	product() {
		return this.hasOne('App/Models/Product', 'product_id', 'id');
	}
}

module.exports = Cart
