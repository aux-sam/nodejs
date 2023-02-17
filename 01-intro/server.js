// Include Package
const express = require('express');
// Init Package
const app = express();
const path = require('path');

// Configure the express

//---- set the assets folder (css,images, fonts, ...)
app.use(express.static(path.join(__dirname,'/public')));

//---- allow express to read the POST form data
app.use(express.urlencoded({extended:false}));

//---- built-in middleware for JSON
app.use(express.json());

// Routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'home_page.html'))
});

app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname,'home_page.html'))
});
app.get('/contact', (req,res) => {
    res.sendFile(path.join(__dirname,'home_page.html'))
});
app.get('/*',(req,res) => {
    res.status(404).send('<h1>404</h1>')
})

// Server
app.listen(3000,()=>{
    console.log('Server started on port 3000')
    console.log('http://localhost:3000')
})
