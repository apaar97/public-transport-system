var express =  require('express');
// Init app
const app = express();

app.get('/',(req,res)=>{
   res.send('index');
});


module.exports = app;