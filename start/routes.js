'use strict'


const Route = use('Route');


Route.group(() =>  {

	Route.resource('books', 'BookController').apiOnly();
	Route.resource('carts', 'CartController').apiOnly();
	Route.resource('authors', 'AuthorController').apiOnly();

	Route.get('books/:id/authors', 'BookController.getAuthor');
	Route.get('authors/:id/books', 'AuthorController.getBooks');
	Route.get('books/name/:name', 'BookController.searchBook');
	Route.get('books/:id/genres', 'BookController.getGenre');

	Route.post('users/register', 'AuthController.register');
	Route.post('users/login', 'AuthController.login');
	
}).prefix('api/v1');
Route.get('test', 'CartController.test');