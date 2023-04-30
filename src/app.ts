import { UserController } from "./users/users.controller";
import { Server } from "node:http";
import express, { Express } from "express";

import { LoggerService } from "./logger/logger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;

  constructor(logger: LoggerService, userController: UserController) {
    this.app = express();
    this.port = 8080;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://127.0.0.1:${this.port}`);
    console.log();
  }
}
