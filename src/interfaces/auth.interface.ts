export interface IAuthLogin {
	correo?: string;
	contrasena?: string;
	email: string;
	password: string;
}

export interface IAuthRegister extends IAuthLogin {
	nombreCompleto?: string | null;
	telefono?: string | null;
	fullName?: string | null;
	phone?: string | null;
}
