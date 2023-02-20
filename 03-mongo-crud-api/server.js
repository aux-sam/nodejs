 /**
  * MongoDB CRUD example 
  * by: Samer Huwari
  * Feb,2023
  */
//----------------------------------------------------------------
// Rename the file .ev.example to .env before starting the server
//
// Run npm install
// Run the code using the command 'nmp run dev'
// Use Postman to test the api
//-----------------------------------------------------------------

// Load the .env file
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products");

// Middleware

//-- Using json response
app.use(express.json());

//-- use products router
app.use("/api/products", productsRoutes);

// Connect to MongoDB

// -- This line search for '.env' file and tries to read a key config called 'MONGODB_CONN'
// were 'mern' is the database name.

// if the connection to MongoDB is successful, then run the web server.
mongoose
  .connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });
