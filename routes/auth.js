var express = require('express');
var router = express.Router();
// HOME
// app/routes.js


module.exports = function(passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	router.get('/', function(req, res) {
		//res.render('landing.ejs'); // load the index.ejs file
		res.send("aditya");

	});
	// process the login form
	router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
	// process the signup form
	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the logout 
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	return router;
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
