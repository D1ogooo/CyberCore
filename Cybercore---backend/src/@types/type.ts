export interface AuthUserRequest {
	email: string;
	password: string;
}

export interface CreateUserRequestdata {
	name: string;
	email: string;
	password: string;
}

export interface CreateUserRequest {
	body: {
		name: string;
		email: string;
		password: string;
	};
	file: Express.Multer.File | undefined;
}
