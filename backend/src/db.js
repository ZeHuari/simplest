const sql = require("mssql");
require("dotenv").config();

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: "master",
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
};

const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then((pool) => {
		console.log("Conectado a SQL Server");
		return pool;
	})
	.catch((err) => console.log("DB Connection Failed! ", err));

module.exports = {
	sql,
	poolPromise,
};
