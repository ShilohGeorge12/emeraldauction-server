import { env } from '../../env';
// import { User } from '../../models/users';
import { AuthType, isError, isJWTPayload } from '../../types';
import Jwt from 'jsonwebtoken';

export const Auth: AuthType = async (req, res, next) => {
	const sercret = env.SECRET;
	const cookies: string = req.cookies['key'];
	try {
		if (cookies) {
			const token = Jwt.verify(cookies, sercret);

			if (!isJWTPayload(token)) {
				res.status(401).json({ error: 'You Are Not Allowed! 1' });
				return;
			}

			console.log(token);
			// const email = token.token;
			// const user = await User.findOne({ email }).select('email authkey');
			// if (!user) {
			// 	return;
			// }

			// const storedToken = Jwt.verify(user.authkey, sercret);
			// if (!isJWTPayload(storedToken)) {
			// 	res.status(401).json({ error: 'You Are Not Allowed! 1.5' });
			// 	return;
			// }

			// const expirationTime = storedToken.exp;
			// const currentTime = Math.floor(Date.now() / 1000);
			// if (expirationTime < currentTime) {
			// 	res.status(401).json({ error: 'You Are Not Allowed! 2' });
			// 	return;
			// }
			next();
		} else {
			res.status(401).json({ error: 'You Are Not Allowed! 3' });
		}
	} catch (error) {
		if (!isError(error)) return;

		if (error.name === 'TokenExpiredError') {
			res.status(401).json({ authStatus: error.message, user: {} });
			return;
		}

		res.status(500).json({ error: `${error.message}` });
	}
};
