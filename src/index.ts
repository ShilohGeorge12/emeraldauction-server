import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { env } from './env';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { baseRoute } from './routes/baseRoute';
import { errorHandler } from './middlewares/error';

const server = express();
const port = env.PORT;

server.use(json());
server.use(cookieParser());
server.use(
	cors({
		credentials: true,
		origin: ['http://localhost:33000'],
	})
);
server.use(urlencoded({ extended: true }));
server.use(express.static(join(__dirname, '../dist/public')));

server.use('/', baseRoute);
server.use('*', errorHandler);

server.listen(port, () => console.log(`server live @ http://localhost:${port}/`));
