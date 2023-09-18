"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const baseRoute_1 = require("./routes/baseRoute");
const error_1 = require("./middlewares/error");
const server = (0, express_1.default)();
const port = env_1.env.PORT;
server.use((0, express_1.json)());
server.use((0, cookie_parser_1.default)());
server.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:33000'],
}));
server.use((0, express_1.urlencoded)({ extended: true }));
server.use(express_1.default.static((0, path_1.join)(__dirname, '../dist/public')));
server.use('/', baseRoute_1.baseRoute);
server.use('*', error_1.errorHandler);
server.listen(port, () => console.log(`server live @ http://localhost:${port}/`));
