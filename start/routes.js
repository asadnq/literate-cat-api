'use strict'


const Route = use('Route');


Route.group(() =>  {
	Route.resource('books', 'BookController').apiOnly();
	Route.resource('carts', 'CartController').apiOnly();
	Route.resource('authors', 'AuthorController').apiOnly();
	Route.get('books/:id/authors/:id', 'BookController.getAuthor');
	Route.get('authors/:id/books', 'AuthorController.getBooks');
}).prefix('api/v1');
Route.get('test', 'CartController.test');