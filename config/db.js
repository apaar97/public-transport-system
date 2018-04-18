var mysql = require('mysql');
 
var connection = mysql.createConnection({
 	host: 'localhost',
 	user: 'root',
 	password: 'mysql@123',
});
 
var db = {
	database : 'labdb',
    tables :  [ 'users']
};

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS ' + db.database);

connection.query('\
CREATE TABLE IF NOT EXISTS `' + db.database + '`.`' + db.tables[0] + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `email` VARCHAR(60) NOT NULL, \
    `username` VARCHAR(20) NOT NULL , \
    `password` CHAR(60) NOT NULL, \
    `gender` VARCHAR(10) NOT NULL,\
    `dob` DATE NOT NULL,\
    `phno` VARCHAR(15) NOT NULL,\
    `address` VARCHAR(150) NOT NULL,\
        PRIMARY KEY (`id`), \
        UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
        UNIQUE INDEX `email_UNIQUE` (`email` ASC) \
)');



console.log('Success: Database Created!');

module.exports = {
	connection: connection,
	db : db
}; 