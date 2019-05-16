
'use strict'


const Route = use('Route');


Route.group(() =>  {

	Route.resource('books', 'BookController').apiOnly();
	Route.resource('carts', 'CartController').apiOnly().middleware(['auth']);
	Route.resource('authors', 'AuthorController').apiOnly();
	Route.resource('genres', 'GenreController').apiOnly();

	Route.get('books/:id/authors', 'BookController.getAuthor');
	Route.get('authors/:id/books', 'AuthorController.getBooks');

	Route.get('users/:id', 'AuthController.getUser').middleware(['auth']);
	Route.post('auth/register', 'AuthController.register');
	Route.post('auth/login', 'AuthController.login');

	Route.get('test/:name', 'BookController.test');
}).prefix('api/v1');
