const { poolPromise, sql } = require("../db");

async function getProducts(req, res) {
	try {
		const pool = await poolPromise;
		const result = await pool.request().query("SELECT * FROM Products");
		res.json(result.recordset);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

async function getProduct(req, res) {
	const { id } = req.params;
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("id", sql.Int, id)
			.query("SELECT * FROM Products WHERE id = @id");
		if (result.recordset.length === 0)
			return res.status(404).json({ message: "Producto no encontrado" });
		res.json(result.recordset[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

async function createProduct(req, res) {
	const { name, price } = req.body;
	if (!name || price === undefined)
		return res.status(400).json({ message: "Faltan datos" });

	try {
		const pool = await poolPromise;
		await pool
			.request()
			.input("name", sql.VarChar, name)
			.input("price", sql.Decimal(10, 2), price)
			.query("INSERT INTO Products (name, price) VALUES (@name, @price)");
		res.json({ message: "Producto creado" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

async function updateProduct(req, res) {
	const { id } = req.params;
	const { name, price } = req.body;

	try {
		const pool = await poolPromise;
		await pool
			.request()
			.input("id", sql.Int, id)
			.input("name", sql.VarChar, name)
			.input("price", sql.Decimal(10, 2), price)
			.query("UPDATE Products SET name=@name, price=@price WHERE id=@id");
		res.json({ message: "Producto actualizado" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

async function deleteProduct(req, res) {
	const { id } = req.params;
	try {
		const pool = await poolPromise;
		await pool
			.request()
			.input("id", sql.Int, id)
			.query("DELETE FROM Products WHERE id=@id");
		res.json({ message: "Producto eliminado" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
