const mongoose = require('mongoose');

// connect to the database
mongoose.connect("mongodb+srv://username:password@cluster0.q4a2ksv.mongodb.net/");

// aquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

// up and running then print the message
db.once('open', function(){
    console.log('Connected to Database');
})