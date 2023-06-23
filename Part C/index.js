//import and init modules
const express = require('express');
const app =express();
const path = require('path');
const BodyParser = require('body-parser');
const cookieparse = require ('cookie-parser');
const mysql = require('./DB/db');
const port = 3030;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
//const CRUD =require('./DB/CRUD');
app.use(cookieparse());
app.set('view engine','pug');

app.use(express.static(path.join(__dirname, "static"))); // find the folder static
app.set ('views', path.join(__dirname,'views'));

//routing
app.get('/',(req,res)=>{
   res.sendfile(path.join (__dirname,"views/Home-page.html"));
});



//set up listen
app.listen(port ,()=> {
    console.log("server is running on port", port) ;
})