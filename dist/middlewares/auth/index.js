"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const env_1 = require("../../env");
// import { User } from '../../models/users';
const types_1 = require("../../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = async (req, res, next) => {
    const sercret = env_1.env.SECRET;
    const cookies = req.cookies['key'];
    try {
        if (cookies) {
            const token = jsonwebtoken_1.default.verify(cookies, sercret);
            if (!(0, types_1.isJWTPayload)(token)) {
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
        }
        else {
            res.status(401).json({ error: 'You Are Not Allowed! 3' });
        }
    }
    catch (error) {
        if (!(0, types_1.isError)(error))
            return;
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ authStatus: error.message, user: {} });
            return;
        }
        res.status(500).json({ error: `${error.message}` });
    }
};
exports.Auth = Auth;
