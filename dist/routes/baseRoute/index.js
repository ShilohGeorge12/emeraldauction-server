"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRoute = void 0;
const express_1 = require("express");
const error_1 = require("../../middlewares/error");
const multer_1 = require("../../middlewares/multer");
const path_1 = require("path");
exports.baseRoute = (0, express_1.Router)();
exports.baseRoute.get('/', multer_1.formData.single('image'), (0, error_1.tryCatch)(async (_, res) => res.redirect('/api/')));
exports.baseRoute.get('/api/', multer_1.formData.single('image'), (0, error_1.tryCatch)(async (_, res) => {
    const filePath = (0, path_1.join)(__dirname, '../../../dist/public/frontend', 'index.html');
    res.sendFile(filePath);
}));
