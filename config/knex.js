var config      = require('../knexfile.js');  
var env         = 'development';  

var knex        = require('knex')(config[env]);

module.exports = knex;
//Updating or creating schema
knex.migrate.latest([config]);
