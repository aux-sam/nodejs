const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

var session; // variable to save the session (notice the var)

// Configure Express
// -- Using ejs 
app.set('view engine','ejs');
//--- Set the views folder
app.set('views',path.join(__dirname,'/views'))

// -- Set the 'static' files path (assets)
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

// --- Set url encode to process POST request data
app.use(express.urlencoded({extended:false}));
// --- Use cookie parser
app.use(cookieParser());
//----------------------------------------------------------------
// Express session configuration

// creating 15 minutes from milliseconds
const sessionCookieLifeTime = 1000 * 60 * 15;

//session middleware
// Read more about the parameters
//https://www.npmjs.com/package/express-session

app.use(sessions({
    secret: "Muy8fuSOYHDsR6WOCwNS6K6sy2QmhSEp", // use 256-bit key with no more than 60 chars. 32 is fair-enough
    saveUninitialized:true,
    cookie: { maxAge: sessionCookieLifeTime },
    resave: false
}));

// See this random key generator 
//https://randomkeygen.com/
//------------------------------------------------------------------

// Routes
app.get('/', (req,res) => {
    res.redirect('login')
});

// View login page
app.get('/login', (req,res) => {

    if( session && session.user_id ){
        res.redirect('dashboard');
    }else{
        res.render('login')
    }
});

// Handle login form
app.post('/login', (req,res) => {

    if( session && session.user_id ){
        return res.redirect('dashboard');
    }
    // This is for testing purposes only.
    // Data must be retrieved from the database
    const username = 'user';
    const password = '123';

    if ( username === req.body.username && password === req.body.password ){

        // set the session
        session = req.session;
        session.user_id = req.body.username; // .user_id can be any name you prefer

        //console.log(req.session)

        // redirect to dashboard (do NOT render dashboard here use redirect)
        res.redirect('dashboard');
    }else{
        res.render('login',{'error': 'Invalid credentials.'});
    }
});

// View dashboard
app.get('/dashboard',(req,res) => {

    // read the session
    session = req.session;

    // if session has a user_id value (set upon login)
    if(session && session.user_id){
        res.render('dashboard',{'user': session.user_id});
    }else{
        res.redirect('login')
    }

});

// Logout
app.get('/logout',(req,res) => {

    if(session && session.user_id){
        req.session.destroy();
    }
       
    res.redirect('login')
    
});


//----------------------------------------------------------------

// Server
app.listen(3000, ()=>{
    console.log("Server started on port 3000")
});


