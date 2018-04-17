var express =  require('express');
// Init app
const app = express();

app.get('/',(req,res)=>{
   res.send('Aditya');
});


module.exports = app;