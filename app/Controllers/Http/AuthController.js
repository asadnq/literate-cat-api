'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator');
const Hash = use('Hash');

class AuthController {

	async register({ request, auth,response }) {
		try{
			const rules = {
				username: 'required|string',
				email: 'required|email',
				password: 'required|string'
			}

			const validation = await validate(request.all(), rules);

			if(validation.fails()) {
				return response
					.status(400)
					.json({message: validation.messages() })
			}

			const { username, email, password } = request.post();

			let user = new User();
			user.username = username;
			user.email = email;
			user.password = password;
			await user.save();

			let accessToken = await auth.generate(user);
			
			response.status(200).json({
				message: 'user created',
				user,
				access_token: accessToken
			});
		} catch(err) {
			throw err;
		}

	}

	async login({ auth, request, response }) {
		try {
			const { email, password } = request.all();
			if(await auth.attempt(email, password)) {
				let user = await User.findBy('email', email);
				let accessToken = await auth.generate(user).withRefreshToken();

				response.json({
					user,
					access_token: accessToken
				});
			}
		}
		catch(err) {
			throw err;
		}
	}

	async getUser({params, request, response}) {
		try{
			const user = await User.find(params.id);

			response.json({
				message: "User successfuly fetched.",
				data: user
			});
		} catch(err) {
			throw err;
		}
	}
}

module.exports = AuthController