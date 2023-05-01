import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { IMiddleWare } from "./middleware.interface";
import { error } from "console";

export class ValidateMiddleware implements IMiddleWare {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}