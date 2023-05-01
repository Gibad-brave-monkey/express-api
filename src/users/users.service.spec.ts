import "reflect-metadata";
import { Container } from "inversify";
import { UserModel } from "@prisma/client";

import { IConfigService } from "./../config/config.service.interface";
import { IUsersRepository } from "./users.repository.interface";
import { IUserService } from "./users.service.interface";
import { UserService } from "./users.service";
import { TYPES } from "../types";
import { User } from "./user.entity";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

describe("User Service", () => {
	it("createUser", async () => {
		configService.get = jest.fn().mockReturnValue("1");
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			email: "test@test.ru",
			name: "Gosling",
			password: "1",
		});

		expect(createdUser?.id).toEqual(1);
	});
});
