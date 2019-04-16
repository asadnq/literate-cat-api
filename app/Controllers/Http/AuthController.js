'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator');
const Hash = use('Hash');

class AuthController {

	async register({ request, auth,response }) {
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

		response.status(200).json({
			message: 'user created',
			data: user
		});

	}

	async login({ auth, request, response }) {
		const { email, password } = request.all();

		try {
			if(await auth.attempt(email, password)) {
				let user = await User.findBy('email', email);
				let accessToken = await auth.withRefreshToken().generate(user);

				return response.json({
					user,
					access_token: accessToken
				});
			}
		}
		catch(err) {
			return response.json({
				message: 'Credentials does not match.'
			});
		}
	}
}

module.exports = AuthController
