var mysql = require('mysql');
 
var connection = mysql.createConnection({
 	host: 'localhost',
 	user: 'root',
 	password: 'mysqlpassword',
});
 
var db = {
	database : 'transportdb',
    tables :  [ 'users','metro','auto','bus','card','rechargedby','trip']
};

connection.connect();
module.exports = {
	connection: connection,
	db : db
}; 