import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IMiddleWare } from "./middleware.interface";

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(
				req.headers.authorization.split(" ")[1],
				this.secret,
				// TODO: Надо дописать типы
				(err: any, payload: any) => {
					if (err) {
						next();
					} else if (payload) {
						req.user = payload.email;
						next();
					}
				},
			);
		} else {
			next();
		}
	}
}
