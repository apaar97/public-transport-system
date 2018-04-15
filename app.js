var express =  require('express');
var db = require('./db.js');
// Init app
var app = express();


app.get('/',(req,res)=>{
  db.query('select * from user',(err,result,fields)=>{
	if(err) 
		console.log(err);
	res.send(result);
   });
});

// Start the server
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
