var express =  require('express');
// Init app
const app = express();


app.get('/',(req,res)=>{res.send("Aditya")});

// Start the server
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
