import { Response, Request, NextFunction } from 'express';
import { ValidationResult } from 'joi';

type HandlerType = (req: Request, res: Response) => Promise<void>;
export type tryCatchType = (handler: HandlerType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export type errorHanderType = (error: Error, req: Request, res: Response, next: NextFunction) => void;
export type AuthType = (req: Request, res: Response, next: NextFunction) => void;

export const isError = (arg: unknown): arg is Error => (arg as Error).stack !== undefined;

interface JwtPayload {
	token: string;
	exp: number;
}

export const isJWTPayload = (arg: unknown): arg is JwtPayload => (arg as JwtPayload).exp !== undefined;
