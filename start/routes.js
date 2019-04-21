
'use strict'


const Route = use('Route');


Route.group(() =>  {

	Route.resource('books', 'BookController').apiOnly();
	Route.resource('carts', 'CartController').apiOnly().middleware(['auth']);
	Route.resource('authors', 'AuthorController').apiOnly();

	Route.get('books/:id/authors', 'BookController.getAuthor');
	Route.get('authors/:id/books', 'AuthorController.getBooks');
	Route.get('books/name/:name', 'BookController.searchBook');
	Route.get('books/:id/genres', 'BookController.getGenre');

	Route.get('users/:id', 'AuthController.getUser').middleware(['auth']);
	Route.post('users/register', 'AuthController.register');
	Route.post('users/login', 'AuthController.login');

	Route.get('test', 'CartController.test').middleware(['auth']);
}).prefix('api/v1');
