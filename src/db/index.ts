import mysql from "mysql2/promise";

interface option {}

export default async (sql: string, values?: option) => {
	const connection = await mysql.createConnection({
		host: "120.46.192.159",
		user: "root",
		database: "yunshu",
		port: 33067,
		password: "yebao@2021",
	});

	try {
		const [result] = await connection.execute(sql, values);

		return result;
	} catch (error: any) {
		throw error;
	} finally {
		connection.end();
	}
};
