const express  = require('express');
const app =  express();
const bodyParser =  require('body-parser');
const mysql = require('mysql');
const cors  = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database:'crud'
});

db.connect( (error) => {
    if(error){
        console.log("Error in connecting to MySQL server.");
    }else{
        console.log("Connected to MySQL Server!");
    }
});

app.use('/', require('./routes/pages'));

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});