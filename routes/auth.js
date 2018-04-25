var express = require('express');
var router = express.Router();
// HOME
// app/routes.js


module.exports = function(passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	router.get('/', function(req, res) {
		res.render("index.ejs");

	});
	// process the login form
	router.post('/login', passport.authenticate('local-login', {
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),(req,res)=>{
		console.log(req.session);
		res.redirect('/profile');
	});

	// process the signup form
	router.post('/signup', passport.authenticate('local-signup', {
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),(req,res)=>{
		console.log(req.session.passport.user);
		res.redirect('/profile');
	});

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
