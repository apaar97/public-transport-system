// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
//var dbconfig = require('./db');
//var connection = mysql.createConnection(dbconfig.connection);

var result = require('./db');
var connection = result.connection;
var dbconfig   = result.db;

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize  out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.userid);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM user WHERE userid = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That ID is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    console.log(req.body);
                    var newUserMysql = {
                        email: email,
                        password: bcrypt.hashSync(password, null, null),
                        name:req.body.name,
                        gender:req.body.gender,
                        dob:req.body.dob,
                        contact:req.body.phno,
                        address:req.body.address
                        // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO user ( email, password, name, gender, dob, contact, address) values (?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.email, newUserMysql.password,newUserMysql.name,newUserMysql.gender,newUserMysql.dob,newUserMysql.contact,newUserMysql.address],function(err, rows) {
                        if(err)
                        return done(err);
                        else{
                            newUserMysql.userid = rows.insertId;
                        }
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    console.log('No user found.');
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                {
                    console.log('Oops! Wrong password.');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }   


                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
