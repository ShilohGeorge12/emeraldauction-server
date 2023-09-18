"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.formData = (0, multer_1.default)({
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
