export interface IAuthLogin {
	email: string;
	password: string;
}

export interface IAuthRegister extends IAuthLogin {
	 
	fullName?: string | null;
	phone?: string | null;
}
