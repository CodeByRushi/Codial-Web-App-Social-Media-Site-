const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;// When we deploy the app on production its port should be 80
const router = require('./routes/index');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');//because express session help us to put session cookie in browser(in encrypted format).
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

// app.use();
app.use(sassMiddleware({
    src: './assets/SCSS',
    dest: './assets/CSS',
    debug: true,
    outputStyle: 'extended',
    prefix: '/CSS'
}));

//for parsing POST request
app.use(express.urlencoded());

//for parsing cookies 
app.use(cookieParser());

app.use(express.static("assets"));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahSomething',
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:MongoStore.create({
        mongoUrl: 'mongodb://localhost/Codial_db',
        autoRemove: 'disabled'
      },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',router);

app.listen(port, function(err){
    if(err){
        console.log(`There is an error in running the server`);
        return;
    }
   
    console.log(`Server is running fine on port ${port}`);

})