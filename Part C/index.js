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
app.get('/Coach',(req,res)=>{
   res.sendfile(path.join (__dirname,"views/Coach.html"));
});

app.get('/Sign_in',(req,res)=>{
   res.sendfile(path.join (__dirname,"views/SignIn.html"));
});

app.get('/Sign_up',(req,res)=>{
   res.sendfile(path.join (__dirname,"views/Sign-Up.html"));
});

//set up listen
app.listen(port ,()=> {
    console.log("server is running on port", port) ;
})