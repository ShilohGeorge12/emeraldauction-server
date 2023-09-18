import { cleanEnv, port, str } from 'envalid';
import { config } from 'dotenv';

config();

export const env = cleanEnv(process.env, {
	PORT: port(),
	DATABASE_URL: str(),
	SECRET: str(),
});
