import { getToken } from "@/lib/utils";

const API_URL = "http://localhost:5000/api/products";

const config = () => ({
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${getToken()}`,
	},
});

export const getProducts = async () => {
	const res = await fetch(API_URL, {
		method: "GET",
		headers: config().headers,
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al obtener productos");
	}
	return res.json();
};

export const createProduct = async (product: any) => {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: config().headers,
		body: JSON.stringify(product),
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al crear producto");
	}
	return res.json();
};

export const updateProduct = async (id: any, product: any) => {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: config().headers,
		body: JSON.stringify(product),
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al actualizar producto");
	}
	return res.json();
};

export const deleteProduct = async (id: any) => {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
		headers: config().headers,
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Error al eliminar producto");
	}
	return res.json();
};
