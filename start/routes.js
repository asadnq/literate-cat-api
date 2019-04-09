'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');
Route.get('/books', 'BookController.all');
Route.get('/books/:id', 'BookController.details');

Route.get('/carts', 'CartController.index');
Route.post('/carts', 'CartController.store');
Route.delete('/carts/:id', 'CartController.destroy');

Route.get('/wtf', 'CartController.test');