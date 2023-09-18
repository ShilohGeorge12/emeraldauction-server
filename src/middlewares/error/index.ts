import { errorHanderType, tryCatchType } from '../../types';
import ValidationError from 'mongoose';

export const tryCatch: tryCatchType = (handler) => {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (error) {
			next();
		}
	};
};

export const errorHandler: errorHanderType = (error, __, res, _) => {
	const errorResponse = { error: 'You are Not allowed!' };
	console.log('server Error -> ', {
		name: error.name,
		msg: error.message,
		stack: error.stack,
	});

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json(errorResponse);
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json(errorResponse);
	}

	if (error instanceof ValidationError.Error) {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	return res.status(500).json({ error: error.message });
};
