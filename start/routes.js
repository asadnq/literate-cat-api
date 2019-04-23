
'use strict'


const Route = use('Route');


Route.group(() =>  {

	Route.resource('books', 'BookController').apiOnly();
	Route.resource('carts', 'CartController').apiOnly().middleware(['auth']);
	Route.resource('authors', 'AuthorController').apiOnly();
	Route.resource('genres', 'GenreController').apiOnly();

	Route.get('books/:id/authors', 'BookController.getAuthor');
	Route.get('books/name/:name', 'BookController.searchBook');
	Route.get('books/:id/genres', 'BookController.getGenre');
	Route.get('genres/:id/books', 'BookController.getBooksWithGenre');
	Route.get('authors/:id/books', 'AuthorController.getBooks');

	Route.get('users/:id', 'AuthController.getUser').middleware(['auth']);
	Route.post('users/register', 'AuthController.register');
	Route.post('users/login', 'AuthController.login');

	Route.get('test/:name', 'BookController.test');
}).prefix('api/v1');
