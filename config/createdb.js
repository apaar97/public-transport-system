var mysql = require('mysql');
var dbconfig = require('../config/db');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE IF NOT EXSISTS`' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
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

console.log('Success: Database Created!')

connection.end();
