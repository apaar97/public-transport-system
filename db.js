var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mysql@123',
	database: 'testdb'
});

connection.connect();
module.exports = connection;