const API_URL = "http://localhost:5000/api/auth";

export const register = async (email: any, password: any) => {
	const res = await fetch(`${API_URL}/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al registrar");
	}

	return res.json();
};

export const login = async (email: any, password: any) => {
	const res = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al iniciar sesión");
	}

	return res.json(); // { token }
};
