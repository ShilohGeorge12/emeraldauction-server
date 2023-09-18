"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.tryCatch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (error) {
            next();
        }
    };
};
exports.tryCatch = tryCatch;
const errorHandler = (error, __, res, _) => {
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
    if (error instanceof mongoose_1.default.Error) {
        return res.status(400).json({ error: error.message });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
};
exports.errorHandler = errorHandler;
