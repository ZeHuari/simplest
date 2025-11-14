const { poolPromise, sql } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req, res) {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "Faltan datos" });

	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("email", sql.VarChar, email)
			.query("SELECT * FROM dbo.Users WHERE email = @email");

		if (result.recordset.length > 0)
			return res.status(400).json({ message: "Usuario ya existe" });

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		await pool
			.request()
			.input("email", sql.VarChar, email)
			.input("passwordHash", sql.VarChar, hash)
			.query(
				"INSERT INTO dbo.Users (email, passwordHash) VALUES (@email, @passwordHash)",
			);

		res.json({ message: "Usuario creado correctamente" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "Faltan datos" });

	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("email", sql.VarChar, email)
			.query("SELECT * FROM dbo.Users WHERE email = @email");

		if (result.recordset.length === 0)
			return res.status(400).json({ message: "Usuario no encontrado" });

		const user = result.recordset[0];

		const isValid = bcrypt.compareSync(password, user.passwordHash);
		if (!isValid)
			return res.status(400).json({ message: "Contraseña incorrecta" });

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		// res.json({ token });

		res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error del servidor" });
	}
}

module.exports = { register, login };
