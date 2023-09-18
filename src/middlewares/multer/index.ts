import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'dist/public/images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

export const formData = multer({
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const fileTypes = /webp/;
		const mimeType = fileTypes.test(file.mimetype);
		const extName = fileTypes.test(file.originalname.toLowerCase());
		if (mimeType && extName) {
			return cb(null, true);
		}
	},
	storage: storage,
});
