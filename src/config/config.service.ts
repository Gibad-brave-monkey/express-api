import { inject, injectable } from "inversify";
import { DotenvConfigOutput, DotenvParseOutput, config } from "dotenv";

import { IConfigService } from "./config.service.interface";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const res: DotenvConfigOutput = config();
		if (res.error) {
			this.logger.error("[ConfigService]: Не удалось прочитать файл .env или он отсуствует");
		} else {
			this.logger.log("[ConfigService]: Конфигурация .env загружено");
			this.config = res.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
