import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
	if (event.target instanceof HTMLInputElement) {
		event.target.blur();
	}
};

export function getErrorMessage(err: unknown) {
	const unknownError = "Algo salió mal, por favor, intenta nuevamente.";

	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => {
			return issue.message;
		});
		return errors.join("\n");
	}

	if (err instanceof Error) {
		if (err.message?.includes("auth/invalid-credential")) {
			return "Correo electrónico o contraseña incorrectos";
		}

		return err.message;
	}

	return unknownError;
}

export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
