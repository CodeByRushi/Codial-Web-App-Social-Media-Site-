const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;// When we deploy the app on production its port should be 80
const router = require('./routes/index');
const db = require('./config/mongoose');
//for parsing POST request
app.use(express.urlencoded());

//for parsing cookies 
app.use(cookieParser());

app.use(express.static("assets"));
//use express router
app.use('/',router);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`There is an error in running the server`);
        return;
    }
    console.log(`Server is running fine on port ${port}`);

})