var express =  require('express');
// Init app
const app = express();

app.get('/profile',isLoggedIn,(req,res)=>{
   res.send('Aditya');
});

module.exports = function(passport){
	return app;
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}