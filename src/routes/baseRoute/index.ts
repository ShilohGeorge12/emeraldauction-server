import { Router } from 'express';
import { tryCatch } from '../../middlewares/error';
import { formData } from '../../middlewares/multer';
import { join } from 'path';

export const baseRoute = Router();

baseRoute.get(
	'/',
	formData.single('image'),
	tryCatch(async (_, res) => res.redirect('/api/'))
);

baseRoute.get(
	'/api/',
	formData.single('image'),
	tryCatch(async (_, res) => {
		const filePath = join(__dirname, '../../../dist/public/frontend', 'index.html');
		res.sendFile(filePath);
	})
);
