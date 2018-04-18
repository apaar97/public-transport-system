var express =  require('express');
var path = require('path');
var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session');
var bodyParser=require("body-parser");
var flash=require("connect-flash");
require('./config/passport.js')(passport); // pass passport for configuration

// Init app
const app = express();


//Setting body parser which allows express to read the body of post response
app.use(bodyParser.urlencoded({extended:true}));

//View engine setup
app.set('views',path.join(__dirname,'public/views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname ,'public')));
app.use(flash()); // use connect-flash for flash messages stored in session

//Passport configuration
app.use(session({
  secret: 'Dblab',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

var indexRoutes = require('./routes/index.js')(passport);
var authRoutes  = require('./routes/auth.js')(passport);

//Use Routes;
app.use(authRoutes); 
app.use(indexRoutes);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});