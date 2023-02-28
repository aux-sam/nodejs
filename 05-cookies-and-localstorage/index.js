/*******************
 * Cookies Example
 *******************/
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


// Set cookie and send it to client
app.get("/send", (req, res) => {
    res.cookie("logged_in", "true");
    res.send("Cookie sent!");
});

// DO NOT USE THIS METHOD
app.get("/send_obj", (req, res) => {
    res.cookie("user", "{'username':'samer123','loggedin':true}");
    res.send("Cookie sent!");
});

// Read the cookie
app.get("/read", (req, res) => {

    // Print the cookie
    console.log('Cookies: ', req.cookies)

    let response = "";

    if(req.cookies.logged_in == "true") {
        response = "Yup! You are logged in!";
    }else{
        response = "Not logged in!";
    }

    res.send(response);
});

//-------------------------------------------------

//a get route for adding a cookie
app.get('/secure_cookie', (req, res) => {
    res.cookie('my_secure_cookie','Secret Value in my secure cookie!!',{
        
        maxAge: 5000, // milliseconds
        expires: new Date('01 12 2021'), // expires works the same as the maxAge
        
        secure: true, // ensures that the browser will reject cookies unless the connection happens over HTTPS.
        httpOnly: true, // ensures that a cookie is not accessible using the JavaScript code. This is the most crucial form of protection against cross-scripting attacks.
        sameSite: 'lax' // improves cookie security and avoids privacy leaks.
    });
    res.send('Cookie have been saved successfully');
});

/************************
 * LocalStorage Example
 ***********************/

app.get("/local", (req, res) => {
    // LocalStorage work on the client NOT the server
    res.sendFile(path.join(__dirname,"local_storage.html"));
});


app.listen(3000);